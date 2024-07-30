from datetime import timedelta

from django.db.models import Exists, OuterRef, Sum
from django.db.models.aggregates import Count
from django.db.models.expressions import Case, F, Value, When
from django.db.models.functions.datetime import TruncDate
from django.db.models.query import QuerySet

from ...account.models import User
from ...channel.models import Channel
from ...core.permissions import has_one_of_permissions_as_staff
from ...core.tracing import traced_resolver
from ...order import OrderStatus
from ...order.models import Order
from ...product import models
from ...product.models import ALL_PRODUCTS_PERMISSIONS, Booking
from ..channel import ChannelQsContext
from ..channel.utils import get_default_channel_slug_or_graphql_error
from ..core.utils import from_global_id_or_error
from ..utils import get_user_or_app_from_context
from ..utils.filters import filter_by_period
from .utils import (
    periods_availables_by_day,
    retrieve_bookings,
    validate_resource_in_product,
)


def resolve_category_by_id(id):
    return models.Category.objects.filter(pk=id).first()


def resolve_reviews_from_product(product: models.Product, info, **_kwargs):
    # Return reviews associated with a product
    user = info.context.user if info.context.user.is_authenticated else None
    return (
        models.ProductRating.objects.filter(product=product)
        .annotate(
            mine=Case(When(user=user, then=Value(1)), default=Value(0)),
        )
        .order_by("-mine")
    )


def resolve_review_percentages(product: models.Product, info, **_kwargs):
    # Return percentages of the possible number of stars for a product
    n_reviews = models.ProductRating.objects.filter(product=product).count()

    data = (
        models.ProductRating.objects.filter(product=product)
        .values("rating")
        .order_by("-rating")
        .annotate(total=Count("rating"))
        .annotate(stars=F("rating"))
        .values("stars", "total")
    )
    index = 0
    response = []
    for i in range(1, 6):
        if len(data) != 0 and index < len(data) and data[index].get("stars") == 6 - i:
            object = {
                "stars": data[index].get("stars"),
                "total": 100 * data[index].get("total") / n_reviews,
            }
            index = index + 1
        else:
            object = {"stars": 6 - i, "total": 0}
        response.append(object)
    return response


def resolve_my_review(product, info, **_kwargs):
    # Return the review of the user for a product if it exists
    if info.context.user.is_anonymous:
        return None
    else:
        return models.ProductRating.objects.filter(
            product=product, user=info.context.user
        ).first()


def resolve_category_by_slug(slug):
    return models.Category.objects.filter(slug=slug).first()


def resolve_categories(_info, level=None, **_kwargs):
    qs = models.Category.objects.prefetch_related("children")
    if level is not None:
        qs = qs.filter(level=level)
    return qs.distinct()


def resolve_collection_by_id(info, id, channel_slug, requestor):
    return (
        models.Collection.objects.visible_to_user(requestor, channel_slug=channel_slug)
        .filter(id=id)
        .first()
    )


def resolve_collection_by_slug(info, slug, channel_slug, requestor):
    return (
        models.Collection.objects.visible_to_user(requestor, channel_slug)
        .filter(slug=slug)
        .first()
    )


def resolve_collections(info, channel_slug):
    requestor = get_user_or_app_from_context(info.context)
    qs = models.Collection.objects.visible_to_user(requestor, channel_slug)

    return ChannelQsContext(qs=qs, channel_slug=channel_slug)


def resolve_digital_content_by_id(id):
    return models.DigitalContent.objects.filter(pk=id).first()


def resolve_digital_contents(_info):
    return models.DigitalContent.objects.all()


def resolve_product_by_id(info, id, channel_slug, requestor, seller_request=False):
    return (
        models.Product.objects.visible_to_user(
            requestor, channel_slug=channel_slug, seller_request=seller_request
        )
        .filter(id=id)
        .first()
    )


def resolve_product_by_slug(
    info, product_slug, channel_slug, requestor, seller_request=False
):
    return (
        models.Product.objects.visible_to_user(
            requestor, channel_slug=channel_slug, seller_request=seller_request
        )
        .filter(slug=product_slug)
        .first()
    )


@traced_resolver
def resolve_products(
    info, requestor, channel_slug=None, company_id=None, **_kwargs
) -> ChannelQsContext:
    if company_id:
        channel_slug = channel_slug or get_default_channel_slug_or_graphql_error()
        qs = models.Product.objects.visible_by_company(company_id, channel_slug)
        return ChannelQsContext(qs=qs, channel_slug=channel_slug)

    qs = models.Product.objects.visible_to_user(requestor, channel_slug)
    if not has_one_of_permissions_as_staff(requestor, ALL_PRODUCTS_PERMISSIONS):
        channels = Channel.objects.filter(slug=str(channel_slug))
        product_channel_listings = models.ProductChannelListing.objects.filter(
            Exists(channels.filter(pk=OuterRef("channel_id"))),
            visible_in_listings=True,
        )
        qs = qs.filter(
            Exists(product_channel_listings.filter(product_id=OuterRef("pk"))),
        )
    return ChannelQsContext(qs=qs, channel_slug=channel_slug)


@traced_resolver
def resolve_variant_by_id(
    info, id, channel_slug, requestor, requestor_has_access_to_all, seller_request=False
):
    visible_products = models.Product.objects.visible_to_user(
        requestor, channel_slug, seller_request=seller_request
    ).values_list("pk", flat=True)
    qs = models.ProductVariant.objects.filter(product__id__in=visible_products)
    if not requestor_has_access_to_all and not seller_request:
        qs = qs.available_in_channel(channel_slug)
    return qs.filter(pk=id).first()


def resolve_product_type_by_id(id):
    return models.ProductType.objects.filter(pk=id).first()


def resolve_product_types(_info, **_kwargs):
    return models.ProductType.objects.all()


@traced_resolver
def resolve_product_variant_by_sku(
    info,
    sku,
    channel_slug,
    requestor,
    requestor_has_access_to_all,
    seller_request=False,
):
    visible_products = models.Product.objects.visible_to_user(
        requestor, channel_slug, seller_request=seller_request
    )
    qs = models.ProductVariant.objects.filter(product__id__in=visible_products)
    if not requestor_has_access_to_all and not seller_request:
        visible_products = visible_products.annotate_visible_in_listings(
            channel_slug
        ).exclude(visible_in_listings=False)
        qs = qs.filter(product__in=visible_products).available_in_channel(channel_slug)
    return qs.filter(sku=sku).first()


@traced_resolver
def resolve_product_variants(
    info, requestor_has_access_to_all, requestor, ids=None, channel_slug=None
) -> ChannelQsContext:
    visible_products = models.Product.objects.visible_to_user(requestor, channel_slug)
    qs = models.ProductVariant.objects.filter(product__id__in=visible_products)

    if not requestor_has_access_to_all:
        visible_products = visible_products.annotate_visible_in_listings(
            channel_slug
        ).exclude(visible_in_listings=False)
        qs = qs.filter(product__in=visible_products).available_in_channel(channel_slug)
    if ids:
        db_ids = [
            from_global_id_or_error(node_id, "ProductVariant")[1] for node_id in ids
        ]
        qs = qs.filter(pk__in=db_ids)
    return ChannelQsContext(qs=qs, channel_slug=channel_slug)


def resolve_report_product_sales(
    period, channel_slug, company_id=None
) -> ChannelQsContext:
    qs = models.ProductVariant.objects.all()

    # filter by company id
    if company_id:
        qs = qs.filter(product__company_id=company_id)

    # filter by period
    qs = filter_by_period(qs, period, "order_lines__order__created")

    # annotate quantity
    qs = qs.annotate(quantity_ordered=Sum("order_lines__quantity"))

    # filter by channel and order status
    channels = Channel.objects.filter(slug=channel_slug).values("pk")
    exclude_status = [OrderStatus.DRAFT, OrderStatus.CANCELED]
    orders = Order.objects.exclude(status__in=exclude_status).filter(
        Exists(channels.filter(pk=OuterRef("channel_id")).values("pk"))
    )
    qs = qs.filter(
        Exists(orders.filter(pk=OuterRef("order_lines__order_id"))),
        quantity_ordered__isnull=False,
    )

    # order by quantity ordered
    qs = qs.order_by("-quantity_ordered")

    return ChannelQsContext(qs=qs, channel_slug=channel_slug)


def resolve_fraudulent_product_report():
    return models.FraudulentProductReport.objects.all()


def resolve_bookable_resources(company_id=None):
    if company_id:
        return models.BookableResource.objects.filter(company_id=company_id)
    return models.BookableResource.objects.all()


def resolve_bookable_resource(bookable_resouce_id=None):
    return models.BookableResource.objects.filter(pk=bookable_resouce_id).first()


def resolve_booking_by_id(booking_id=None):
    return models.Booking.objects.filter(pk=booking_id).first()


def resolve_booking_by_booking_reference(booking_reference=None):
    return models.Booking.objects.filter(booking_reference=booking_reference).first()


def resolve_resource_calendar_availability(resource_id, variant_id, period):
    """Return availables days in a period."""
    start_date = period.gte
    end_date = period.lte

    # Get product duration
    variant = models.ProductVariant.objects.select_related("product").get(id=variant_id)
    product = variant.product
    duration = product.duration

    # Get resource slots of time
    resource = models.BookableResource.objects.prefetch_related(
        "calendar__time_periods"
    ).get(id=resource_id)

    validate_resource_in_product(product=product, resource=resource)

    days_availables = []
    periods = resource.periods_by_calendar_days(duration)
    qs = retrieve_bookings(resource)

    while start_date <= end_date:
        periods_availables = periods_availables_by_day(
            resource, start_date, periods, qs
        )
        days_availables.append(
            {"date": start_date, "available": len(periods_availables) > 0}
        )
        start_date += timedelta(days=1)

    return days_availables


def resolve_resource_availability_by_date(resource_id, variant_id, date):
    """Return available periods in a given date."""

    # Get product duration
    variant = models.ProductVariant.objects.select_related("product").get(id=variant_id)
    product = variant.product
    duration = product.duration

    # Get resource's slots of time
    resource = models.BookableResource.objects.prefetch_related(
        "calendar__time_periods"
    ).get(id=resource_id)

    validate_resource_in_product(product=product, resource=resource)

    periods = resource.periods_by_calendar_days(duration)
    qs = retrieve_bookings(resource)

    return periods_availables_by_day(resource, date, periods, qs)


def resolve_product_addition_stat(start_date, end_date):
    data = (
        models.Product.objects.filter(
            created_at__gte=(start_date), created_at__lte=(end_date)
        )
        .annotate(date=TruncDate("created_at"))
        .order_by("date")
        .values("date")
        .annotate(**{"total": Count("date")})
        .values("total", "date")
    )

    response = []
    d = start_date.date()
    index = 0
    while d <= end_date.date():
        if len(data) != 0 and d == data[index].get("date"):
            response.append(data[index])
            if index < len(data) - 1:
                index = index + 1
        else:
            empty_object = {
                "date": d,
                "total": 0,
            }
            response.append(empty_object)
        d = d + timedelta(days=1)

    return response


def resolve_product_consumption_stat(start_date, end_date):

    data = (
        models.Product.objects.filter(
            variants__order_lines__order__created__range=(start_date, end_date)
        )
        .annotate(date=TruncDate("created_at"))
        .order_by("date")
        .values("date")
        .annotate(**{"total": Sum("variants__order_lines__quantity")})
        .values("total", "date")
    )

    start_date = start_date.date()
    end_date = end_date.date()

    response = []
    d = start_date
    index = 0
    while d <= end_date:
        if len(data) != 0 and d == data[index].get("date"):
            response.append(data[index])
            if index < len(data) - 1:
                index = index + 1
        else:
            empty_object = {
                "date": d,
                "total": 0,
            }
            response.append(empty_object)
        d = d + timedelta(days=1)

    return response


def resolve_bookings_by_user(user: User) -> QuerySet[Booking]:
    """Return bookings of the logged user."""
    return Booking.objects.filter(user=user)
