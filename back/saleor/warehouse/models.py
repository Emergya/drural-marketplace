import itertools
import uuid
from typing import Set

from django.db import models
from django.db.models import Exists, F, OuterRef, Q, Sum
from django.db.models.functions import Coalesce

from ..account.models import Address
from ..channel.models import Channel
from ..core.models import ModelWithMetadata
from ..order.models import OrderLine
from ..product.models import Product, ProductVariant
from ..shipping.models import ShippingZone


class WarehouseQueryset(models.QuerySet):
    """
    Custom queryset for the Warehouse model.

    Methods:
        prefetch_data: Prefetches related address and shipping zones for warehouses.
        for_country: Filters warehouses by the given country code.
    """
    def prefetch_data(self):
        return self.select_related("address").prefetch_related("shipping_zones")

    def for_country(self, country: str):
        return (
            self.prefetch_data()
            .filter(shipping_zones__countries__contains=country)
            .order_by("pk")
        )


class Warehouse(ModelWithMetadata):
    """
    Represents a warehouse.

    Attributes:
        id (UUIDField): The unique identifier for the warehouse.
        name (str): The name of the warehouse.
        slug (str): The slug for the warehouse.
        shipping_zones (ManyToManyField): The shipping zones associated with the warehouse.
        address (ForeignKey): The address of the warehouse.
        email (str): The email address of the warehouse.
    """
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    shipping_zones = models.ManyToManyField(
        ShippingZone, blank=True, related_name="warehouses"
    )
    address = models.ForeignKey(Address, on_delete=models.PROTECT)
    email = models.EmailField(blank=True, default="")

    objects = models.Manager.from_queryset(WarehouseQueryset)()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("-slug",)

    def __str__(self):
        return self.name

    @property
    def countries(self) -> Set[str]:
        """
        Returns the set of countries associated with the warehouse's shipping zones.
        """
        shipping_zones = self.shipping_zones.all()
        return set(itertools.chain(*[zone.countries for zone in shipping_zones]))

    def delete(self, *args, **kwargs):
        """
        Deletes the warehouse and its associated address.
        """
        address = self.address
        super().delete(*args, **kwargs)
        address.delete()


class StockQuerySet(models.QuerySet):
    """
    Custom queryset for the Stock model.

    Methods:
        annotate_available_quantity: Annotates the available quantity of stock.
        for_channel: Filters stocks by the given channel slug.
        for_country_and_channel: Filters stocks by the given country code and channel slug.
        get_variant_stocks_for_country: Returns stock information for a product variant for a given country and channel.
        get_product_stocks_for_country_and_channel: Returns stock information for a product for a given country and channel.
    """
    def annotate_available_quantity(self):
        return self.annotate(
            available_quantity=F("quantity")
            - Coalesce(
                Sum(
                    "allocations__quantity_allocated",
                    filter=Q(allocations__quantity_allocated__gt=0),
                ),
                0,
            )
        )

    def for_channel(self, channel_slug: str):
        ShippingZoneChannel = Channel.shipping_zones.through  # type: ignore
        WarehouseShippingZone = ShippingZone.warehouses.through  # type: ignore
        channels = Channel.objects.filter(slug=channel_slug).values("pk")
        shipping_zone_channels = ShippingZoneChannel.objects.filter(
            Exists(channels.filter(pk=OuterRef("channel_id")))
        ).values("shippingzone_id")
        warehouse_shipping_zones = WarehouseShippingZone.objects.filter(
            Exists(
                shipping_zone_channels.filter(
                    shippingzone_id=OuterRef("shippingzone_id")
                )
            )
        ).values("warehouse_id")
        return self.select_related("product_variant").filter(
            Exists(
                warehouse_shipping_zones.filter(warehouse_id=OuterRef("warehouse_id"))
            )
        )

    def for_country_and_channel(self, country_code: str, channel_slug):
        filter_lookup = {"shipping_zones__countries__contains": country_code}
        if channel_slug is not None:
            filter_lookup["shipping_zones__channels__slug"] = channel_slug
        query_warehouse = models.Subquery(
            Warehouse.objects.filter(**filter_lookup).values("pk")
        )
        return self.select_related("product_variant", "warehouse").filter(
            warehouse__in=query_warehouse
        )

    def get_variant_stocks_for_country(
        self, country_code: str, channel_slug: str, product_variant: ProductVariant
    ):
        """
        Returns stock information about a variant for a given country and channel.

        Args:
            country_code (str): The country code to filter by.
            channel_slug (str): The channel slug to filter by.
            product_variant (ProductVariant): The product variant to filter by.

        Returns:
            QuerySet: The queryset of stock information.
        """
        return self.for_country_and_channel(country_code, channel_slug).filter(
            product_variant=product_variant
        )

    def get_product_stocks_for_country_and_channel(
        self, country_code: str, channel_slug: str, product: Product
    ):
        """
        Returns stock information about a product for a given country and channel.

        Args:
            country_code (str): The country code to filter by.
            channel_slug (str): The channel slug to filter by.
            product (Product): The product to filter by.

        Returns:
            QuerySet: The queryset of stock information.
        """
        return self.for_country_and_channel(country_code, channel_slug).filter(
            product_variant__product_id=product.pk
        )


class Stock(models.Model):
    """
    Represents the stock of a product variant in a warehouse.

    Attributes:
        warehouse (ForeignKey): The warehouse where the stock is located.
        product_variant (ForeignKey): The product variant of the stock.
        quantity (int): The quantity of the stock.
    """
    warehouse = models.ForeignKey(Warehouse, null=False, on_delete=models.CASCADE)
    product_variant = models.ForeignKey(
        ProductVariant, null=False, on_delete=models.CASCADE, related_name="stocks"
    )
    quantity = models.IntegerField(default=0)

    objects = models.Manager.from_queryset(StockQuerySet)()

    class Meta:
        unique_together = [["warehouse", "product_variant"]]
        ordering = ("pk",)

    def increase_stock(self, quantity: int, commit: bool = True):
        """
        Increases the stock quantity by the given amount.

        Args:
            quantity (int): The amount to increase the stock by.
            commit (bool): Whether to save the change to the database immediately.

        Returns:
            None
        """
        self.quantity = F("quantity") + quantity
        if commit:
            self.save(update_fields=["quantity"])

    def decrease_stock(self, quantity: int, commit: bool = True):
        """
        Decreases the stock quantity by the given amount.

        Args:
            quantity (int): The amount to decrease the stock by.
            commit (bool): Whether to save the change to the database immediately.

        Returns:
            None
        """
        self.quantity = F("quantity") - quantity
        if commit:
            self.save(update_fields=["quantity"])


class Allocation(models.Model):
    """
    Represents the allocation of stock to an order line.

    Attributes:
        order_line (ForeignKey): The order line the stock is allocated to.
        stock (ForeignKey): The stock being allocated.
        quantity_allocated (int): The quantity of stock allocated.
    """
    order_line = models.ForeignKey(
        OrderLine,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="allocations",
    )
    stock = models.ForeignKey(
        Stock,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="allocations",
    )
    quantity_allocated = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = [["order_line", "stock"]]
        ordering = ("pk",)
