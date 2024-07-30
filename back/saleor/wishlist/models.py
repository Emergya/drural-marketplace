import uuid

from django.db import models

from ..account.models import User
from ..core.models import ModelWithMetadata
from ..core.permissions import WishlistPermissions
from ..core.tracing import traced_atomic_transaction
from ..product.models import ProductVariant


class Wishlist(ModelWithMetadata):
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=256, blank=True, default="Default wishlist")
    image = models.ImageField(
        upload_to="wishlists", default="wishlists/default-wishlist.png"
    )
    user = models.ForeignKey(
        User, related_name="wishlists", on_delete=models.CASCADE, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    default = models.BooleanField(default=False)

    @property
    def image_url(self):
        return self.image.url

    def set_name(self, name):
        self.name = name
        self.save()

    def set_user(self, user):
        self.user = user
        self.save()

    def set_image(self, image):
        self.image = image
        self.save()

    def get_all_variants(self):
        return ProductVariant.objects.filter(
            wishlist_items__wishlist_id=self.pk
        ).distinct()

    def get_first_variant(self):
        return self.items.first().variant

    def get_first_variant_image(self):
        return self.items.first().variant.media.first().image

    def get_default_image(self):
        return "wishlists/default-wishlist.png"

    def add_variant(self, variant: ProductVariant):
        item, _is_created = self.items.get_or_create(variant_id=variant.pk)
        return item

    def remove_variant(self, variant: ProductVariant):
        self.items.filter(variant_id=variant.pk).delete()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("name",)
        permissions = (
            (
                WishlistPermissions.MANAGE_WISHLISTS.codename,
                "Manage your own wishlists.",
            ),
        )


class WishlistItemQuerySet(models.QuerySet):
    @traced_atomic_transaction()
    def move_items_between_wishlists(self, src_wishlist, dst_wishlist):
        dst_wishlist_map = {}
        for dst_item in dst_wishlist.items.all():
            dst_wishlist_map[dst_item.variant_id] = dst_item
        # Copying the items from the source to the destination wishlist.
        for src_item in src_wishlist.items.all():
            if src_item.variant_id in dst_wishlist_map:
                # This wishlist item's variant already exist.
                # Adding and the variants, "add" already handles duplicates.
                dst_item = dst_wishlist_map[src_item.variant_id]
                dst_wishlist.add_variant(dst_item.variant)
                src_item.delete()
            else:
                # This wishlist item contains a new product.
                # It can be reassigned to the destination wishlist.
                src_item.wishlist = dst_wishlist
                src_item.save()
        self.filter(wishlist=src_wishlist).update(wishlist=dst_wishlist)


class WishlistItem(models.Model):
    wishlist = models.ForeignKey(
        Wishlist, related_name="items", on_delete=models.CASCADE
    )
    variant = models.ForeignKey(
        ProductVariant,
        related_name="wishlist_items",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager.from_queryset(WishlistItemQuerySet)()

    class Meta:
        unique_together = ("wishlist", "variant")

    def __str__(self):
        return "WishlistItem (%s, %s)" % (self.wishlist.user, self.variant)
