import graphene
from django.conf import settings
from promise import Promise

from ....account.utils import requestor_is_staff_member_or_app
from ....channel.models import Channel
from ....core.permissions import ProductPermissions
from ....core.tracing import traced_resolver
from ....graphql.utils import get_user_or_app_from_context
from ....product import models
from ...channel import ChannelContext
from ...core.connection import CountableDjangoObjectType
from ...core.scalars import UUID
from ...core.utils import str_to_enum
from ...decorators import permission_required
from ...product.dataloaders import (
    ProductChannelListingByProductIdAndChannelSlugLoader,
    ProductVariantByIdLoader,
)
from ...product.enums import BookableResourceDayEnum


class Slot(CountableDjangoObjectType):
    class Meta:
        description = "Defines Slot of time available of the resource in a day."
        interfaces = [graphene.relay.Node]
        model = models.Slot
        fields = (
            "start_time",
            "end_time",
        )


class BookableResourceDailyCalendar(CountableDjangoObjectType):
    time_periods = graphene.List(
        Slot,
        description="Diferents periods of time of availability.",
    )
    day = graphene.Field(
        BookableResourceDayEnum,
        description="Day of the week.",
    )

    class Meta:
        description = "Defines BookableResouceCalendar data."
        interfaces = [graphene.relay.Node]
        model = models.BookableResourceDailyCalendar
        only_fields = ("time_periods", "day")

    def resolve_time_periods(root: models.BookableResourceDailyCalendar, info):
        return root.time_periods.all()

    @staticmethod
    def resolve_day(root, _info, **_kwargs):
        return BookableResourceDayEnum[str_to_enum(root.day)]


class BookableResource(CountableDjangoObjectType):
    calendar = graphene.List(
        BookableResourceDailyCalendar,
        description="The weekly calendar of the resource.",
    )

    class Meta:
        description = "Defines BookableResource data."
        interfaces = [graphene.relay.Node]
        model = models.BookableResource
        only_fields = (
            "name",
            "is_active",
            "quantity",
            "quantity_infinite",
            "company",
            "full_day",
        )

    def resolve_calendar(root: models.BookableResource, info):
        return root.calendar.all()


class Booking(CountableDjangoObjectType):
    booking_reference = graphene.Field(
        UUID,
        description="UUID of the booking.",
    )
    variant = graphene.Field(
        "saleor.graphql.product.types.products.ProductVariant",
        required=False,
        description=(
            "A purchased product variant. Note: this field may be null if the variant "
            "has been removed from stock at all."
        ),
    )

    class Meta:
        description = "Defines a booking of a service by a user."
        interfaces = [graphene.relay.Node]
        model = models.Booking
        only_fields = [
            "start_date",
            "end_date",
            "user_email",
            "variant_name",
            "resource_name",
            "variant_sku",
            "company_name",
            "bookable_resource",
            "status",
            "order",
        ]

    @staticmethod
    @traced_resolver
    def resolve_booking_reference(root: models.Booking, info):
        return root.booking_reference

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_variant(root: models.Booking, info):
        context = info.context
        if not root.variant_id:
            return None

        def requestor_has_access_to_variant(data):
            variant, channel = data

            requester = get_user_or_app_from_context(context)
            is_staff = requestor_is_staff_member_or_app(requester)
            if is_staff:
                return ChannelContext(node=variant, channel_slug=channel.slug)

            def product_is_available(product_channel_listing):
                if product_channel_listing and product_channel_listing.is_visible:
                    return ChannelContext(node=variant, channel_slug=channel.slug)
                return None

            return (
                ProductChannelListingByProductIdAndChannelSlugLoader(context)
                .load((variant.product_id, channel.slug))
                .then(product_is_available)
            )

        variant = ProductVariantByIdLoader(context).load(root.variant_id)
        channel = Channel.objects.get(slug=settings.DEFAULT_CHANNEL_SLUG)

        return Promise.all([variant, channel]).then(requestor_has_access_to_variant)


class BookableResourceAvalabilityByDay(graphene.ObjectType):
    date = graphene.DateTime(description="Returns the day of the month requested")
    available = graphene.Boolean(
        description="Returns if the day is available to book the service"
    )


class BookableResourceAvalabilityByPeriods(graphene.ObjectType):
    start_time = graphene.Time(description="Start time of period in slot")
    end_time = graphene.Time(description="End time of period in slot")
