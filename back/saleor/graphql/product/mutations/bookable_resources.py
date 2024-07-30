import graphene
import pytz
from django.core.exceptions import ValidationError
from django.utils import timezone

from ....checkout.complete_checkout import complete_booking_no_billable
from ....company.models import Company
from ....core import analytics
from ....core.exceptions import PermissionDenied
from ....core.permissions import ProductPermissions
from ....core.tracing import traced_atomic_transaction
from ....product import models
from ....settings import TZ_REGION
from ...core.enums import BookableResourceErrorCode
from ...core.mutations import (
    BaseMutation,
    ModelBulkDeleteMutation,
    ModelDeleteMutation,
    ModelMutation,
)
from ...core.types.common import BookableResourceError, BookingError, DateTimeRangeInput
from ...product.enums import BookableResourceDayEnum
from ...product.types.bookable_resources import Booking
from ...product.utils import (
    period_available,
    retrieve_bookings,
    validate_calendar,
    validate_resource_in_product,
)


def clean_period(resource, period, duration, field="period"):
    """Check if period is valid and available."""
    if period.lte.date() < timezone.now().date():
        raise ValidationError(
            {
                field: ValidationError(
                    f"Start date ({period.lte}) of reservation must be "
                    "greater than or equal to today.",
                    code="period_not_valid",
                )
            }
        )
    periods = resource.periods_by_calendar_days(duration)
    qs = retrieve_bookings(resource)
    tz = pytz.timezone(TZ_REGION)
    start_booking = period.gte.astimezone(tz)
    end_booking = period.lte.astimezone(tz)
    if not period_available(resource, start_booking, end_booking, periods, qs):
        raise ValidationError(
            {
                field: ValidationError(
                    f"This period {period.gte} - {period.lte} is not available.",
                    code="period_not_available",
                )
            }
        )


def validate_bookable_resource(resource):
    if resource and not resource.is_active:
        raise ValidationError(
            {
                "bookable_resource": ValidationError(
                    "This bookable resource is not active.",
                    code="resource_not_active",
                )
            }
        )


def validate_product_availability(product: models.Product):
    if product and not product.is_available():
        raise ValidationError(
            {
                "variant": ValidationError(
                    "This this product variant is not available.",
                    code="period_not_available",
                )
            }
        )


def validate_product_available_for_purchase(product: models.Product):
    channel_listing = product.channel_listings.first()  # type: ignore
    if channel_listing and not channel_listing.is_available_for_purchase():
        raise ValidationError(
            {
                "variant": ValidationError(
                    "This this product variant is not available for purchase.",
                    code="period_not_available_for_purchase",
                )
            }
        )


class SlotInput(graphene.InputObjectType):
    start_time = graphene.Time(required=True, description="Start time of slot")
    end_time = graphene.Time(required=True, description="End time of slot")


class BookableResourceDailyCalendarInput(graphene.InputObjectType):
    day = BookableResourceDayEnum(
        required=True,
        description="Name of the bookable resource.",
    )
    time_periods = graphene.List(
        graphene.NonNull(SlotInput),
        required=True,
        description="List of slot of times of the day.",
    )


class BookableResourceInput(graphene.InputObjectType):
    name = graphene.String(required=False, description="Name of the resource")
    is_active = graphene.Boolean(
        description="Determine if resource is active. Default: False"
    )
    quantity = graphene.Int(description="Determine the quantity of resource.")
    quantity_infinite = graphene.Boolean(
        description="Determine if resource is infinite."
    )
    calendar = graphene.List(
        BookableResourceDailyCalendarInput, description="List of daily slots"
    )


class BookableResourceCreateInput(BookableResourceInput):
    company = graphene.ID(required=True, description="ID of company.")


class BookableResourceCreate(ModelMutation):
    class Arguments:
        input = BookableResourceCreateInput(
            required=True, description="Fields required to create a bookable resource."
        )

    class Meta:
        description = "Create a bookable resource."
        model = models.BookableResource
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = BookableResourceError
        error_type_field = "bookable_resource_errors"

    @classmethod
    def validate_unique_name(cls, name: str, instance: models.BookableResource):
        if name is None:
            return

        validate_name = instance.name != name if instance.pk else True

        if validate_name and models.BookableResource.objects.filter(name=name).exists():
            raise ValidationError(
                {
                    "name": ValidationError(
                        "This name already exists.",
                        code=BookableResourceErrorCode.UNIQUE.value,
                    )
                }
            )

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        # Check if resource is infinite
        cls.validate_unique_name(cleaned_input.get("name"), instance)

        if instance.pk:
            quantity = cleaned_input.get("quantity", instance.quantity)
            is_infinite = cleaned_input.get(
                "quantity_infinite", instance.quantity_infinite
            )
        else:
            quantity = cleaned_input.get("quantity", 0)
            is_infinite = cleaned_input.get("quantity_infinite")

        if not is_infinite and quantity <= 0:
            raise ValidationError(
                {
                    "quantity": ValidationError(
                        "quantity must be greater than 0 when "
                        "quantity_infinite is False.",
                        code=BookableResourceErrorCode.INVALID.value,
                    )
                }
            )

        cleaned_input["quantity"] = 0 if is_infinite else quantity

        if cleaned_input.get("calendar", None):
            validate_calendar(calendar=cleaned_input["calendar"])
        return cleaned_input

    @classmethod
    @traced_atomic_transaction()
    def save(cls, info, instance, cleaned_input):
        instance.save()
        cls.build_calendar(
            instance=instance, calendar_data=cleaned_input.get("calendar")
        )

    @classmethod
    def build_calendar(cls, instance, calendar_data):
        """Create a weekly calendar of a bookable resource."""
        # Overwrite the previous calendar
        if not calendar_data:
            return

        instance.calendar.all().delete()
        for daily in calendar_data:
            daily_calendar = models.BookableResourceDailyCalendar.objects.create(
                bookable_resource=instance, day=daily.get("day")
            )
            time_periods = daily.get("time_periods")
            slots_data = []
            for period in time_periods:
                slots_data.append(
                    models.Slot(
                        bookable_resource_calendar=daily_calendar,
                        start_time=period.get("start_time"),
                        end_time=period.get("end_time"),
                    )
                )
            if slots_data:
                models.Slot.objects.bulk_create(slots_data)

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, **data):
        instance = cls.get_instance(info, **data)
        requestor = info.context.user
        if not instance.pk:
            input = data.get("input")
            company = cls.get_node_or_error(info, input.get("company"), Company)
        else:
            company = instance.company
        if not (requestor.is_company_manager(company.pk) or requestor.is_staff):
            raise PermissionDenied()
        return super().perform_mutation(_root, info, **data)


class BookableResourceUpdate(BookableResourceCreate):
    class Arguments:
        id = graphene.ID(
            required=True, description="ID of bookable resource to update."
        )
        input = BookableResourceInput(
            required=True, description="Fields required to update a bookable resource."
        )

    class Meta:
        description = "Create a bookable resource."
        model = models.BookableResource
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = BookableResourceError
        error_type_field = "bookable_resource_errors"


class BookableResourceDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(
            required=True, description="ID of a bookable resource to delete."
        )

    class Meta:
        description = "Deletes a bookable resource."
        model = models.BookableResource
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = BookableResourceError
        error_type_field = "bookable_resource_errors"

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, **data):
        instance = cls.get_instance(info, **data)
        requestor = info.context.user
        if not (
            requestor.is_company_manager(instance.company.pk) or requestor.is_staff
        ):
            raise PermissionDenied()
        return super().perform_mutation(_root, info, **data)


class BookableResourceBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True, description="List of product IDs to delete."
        )

    class Meta:
        description = "Deletes products."
        model = models.BookableResource
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = BookableResourceError
        error_type_field = "bookable_resource_errors"

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, ids, **data):
        cls.check_permissions_in_all_resources(info, ids)
        return super().perform_mutation(_root, info, ids, **data)

    @classmethod
    def check_permissions_in_all_resources(cls, info, ids):
        requestor = info.context.user
        for id in ids:
            try:
                resource = cls.get_node_or_error(info, id, only_type="BookableResource")
                if not (
                    requestor.is_company_manager(resource.company.pk)
                    or requestor.is_staff
                ):
                    raise PermissionDenied()
            except ValidationError as error:
                return 0, error


class BookResourceBulkInput(graphene.InputObjectType):
    periods = graphene.List(
        DateTimeRangeInput,
        description="List of periods when the service will be booked.",
    )
    bookable_resource = graphene.ID(required=True, description="ID of the resource")
    variant = graphene.ID(required=True, description="Id of the product variant")


class BookResourceBulk(BaseMutation):
    count = graphene.Int(
        required=True,
        default_value=0,
        description="Returns how many objects were created.",
    )
    bookings = graphene.List(
        graphene.NonNull(Booking),
        required=True,
        default_value=[],
        description="List of the created bookings.",
    )

    class Arguments:
        input = BookResourceBulkInput(
            required=True, description="Fields required to create a booking."
        )

    class Meta:
        description = "Book a resource of a company to consume a product."
        error_type_class = BookingError
        error_type_field = "booking_errors"

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def clean_periods(cls, resource, periods, duration):
        for period in periods:
            clean_period(resource, period, duration, field="periods")

    @classmethod
    def clean_input(cls, info, data, input_cls=None):
        resource = data.get("bookable_resource")
        variant = data.get("variant")

        validate_product_availability(variant.product)
        validate_product_available_for_purchase(variant.product)
        validate_bookable_resource(resource)
        validate_resource_in_product(product=variant.product, resource=resource)

    @classmethod
    def create_instances(cls, info, cleaned_data):
        instances = []
        for period in cleaned_data.get("periods"):
            resource = cleaned_data.get("bookable_resource")
            variant = cleaned_data.get("variant")
            # convert timezones of dates
            tz = timezone.get_current_timezone()
            start_date = period.lte.replace(tzinfo=tz)
            end_date = period.gte.replace(tzinfo=tz)

            instances.append(
                models.Booking(
                    user=info.context.user,
                    user_email=info.context.user.email,
                    variant=variant,
                    variant_name=variant.name,
                    variant_sku=variant.sku,
                    company=resource.company,
                    company_name=resource.company.name,
                    bookable_resource=resource,
                    resource_name=resource.name,
                    start_date=start_date,
                    end_date=end_date,
                )
            )
        return instances

    @classmethod
    def save_instances(cls, instances):
        if not instances:
            return None
        models.Booking.objects.bulk_create(instances)

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, root, info, **data):
        data = data.get("input")
        resource_id = data.get("bookable_resource")
        resource = cls.get_node_or_error(
            info, node_id=resource_id, only_type="BookableResource"
        )
        variant_id = data.get("variant")
        variant = cls.get_node_or_error(
            info, node_id=variant_id, only_type="ProductVariant"
        )

        data["bookable_resource"] = resource
        data["variant"] = variant
        duration = variant.product.duration
        periods = data.get("periods")
        cls.clean_input(info=info, data=data)
        cls.clean_periods(resource, periods, duration)

        instances = cls.create_instances(info, data)
        cls.save_instances(instances)

        return BookResourceBulk(count=len(instances), bookings=instances)


class BookResourceInput(graphene.InputObjectType):
    period = graphene.Field(
        graphene.NonNull(DateTimeRangeInput),
        description="List of periods when the service will be booked.",
    )
    bookable_resource = graphene.ID(required=True, description="ID of the resource")
    variant = graphene.ID(required=True, description="Id of the product variant")


class BookResource(ModelMutation):
    class Arguments:
        input = BookResourceInput(
            required=True, description="Fields required to create a booking."
        )

    class Meta:
        description = "Book a source of a company to consume a product."
        model = models.Booking
        error_type_class = BookingError
        error_type_field = "booking_errors"

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def clean_input(cls, info, instance, data, input_cls=None):
        cleaned_input = super().clean_input(info, instance, data)
        resource = cleaned_input.get("bookable_resource")
        variant = cleaned_input.get("variant")
        period = cleaned_input.get("period")
        duration = variant.product.duration

        validate_product_availability(variant.product)
        validate_product_available_for_purchase(variant.product)
        validate_bookable_resource(resource)
        validate_resource_in_product(product=variant.product, resource=resource)
        clean_period(resource, period, duration)
        return cleaned_input

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, **data):
        return super().perform_mutation(_root, info, **data)

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        """Perform an action after saving an object and its m2m.

        Check if product related to the booking is only bookable
        and no billable to create order.
        """
        product = instance.variant.product
        if product.is_billable:
            return None

        tracking_code = analytics.get_client_id(info.context)
        manager = info.context.plugins
        complete_booking_no_billable(
            manager=manager,
            booking=instance,
            user=info.context.user,
            app=info.context.app,
            tracking_code=tracking_code,
        )

    @classmethod
    def save(cls, info, instance, cleaned_input):
        variant = instance.variant
        bookable_resource = instance.bookable_resource
        company = bookable_resource.company
        period = cleaned_input.get("period")
        # Frontend set the timezone
        start_date = period.gte
        end_date = period.lte

        instance.start_date = start_date
        instance.end_date = end_date
        instance.user = info.context.user
        instance.user_email = info.context.user.email
        instance.variant_name = variant.name
        instance.variant_sku = variant.sku
        instance.company = company
        instance.company_name = company.name
        instance.resource_name = bookable_resource.name
        instance.save()
