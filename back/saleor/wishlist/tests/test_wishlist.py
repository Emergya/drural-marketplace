import pytest

from ..models import Wishlist, WishlistItem


def test_remove_only_variant_also_removes_wishlist_item(customer_wishlist_item):
    variant = customer_wishlist_item.variant
    wishlist = customer_wishlist_item.wishlist
    assert wishlist.get_all_variants().count() == 1
    wishlist.remove_variant(variant)
    assert wishlist.get_all_variants().count() == 0
    with pytest.raises(WishlistItem.DoesNotExist):
        customer_wishlist_item.refresh_from_db()


@pytest.mark.skip(reason="dRural wishlist items are only products")
def test_remove_single_variant_from_wishlist_item(
    customer_wishlist_with_two_items,
):
    assert customer_wishlist_with_two_items.get_all_variants().count() == 2
    [variant_1, variant_2] = customer_wishlist_with_two_items.get_all_variants()
    customer_wishlist_with_two_items.remove_variant(variant_1)
    customer_wishlist_with_two_items.refresh_from_db()
    assert customer_wishlist_with_two_items.get_all_variants().count() == 1
    assert customer_wishlist_with_two_items.get_all_variants().first() == variant_2


def test_move_items_between_wishlists_with_duplicates(variant, customer_wishlist_item):
    dst_wishlist_item = customer_wishlist_item
    dst_wishlist = dst_wishlist_item.wishlist
    assert dst_wishlist.items.count() == 1
    dst_variant = dst_wishlist_item.variant
    assert variant.pk != dst_variant.pk
    # Create the source wishlist
    src_wishlist = Wishlist.objects.create()
    # Add the new variant
    src_item_1 = src_wishlist.add_variant(variant)
    # Add the destination variants to the source wishlist (the duplicate case)
    src_item_2 = src_wishlist.add_variant(dst_variant)
    # Move items from the source to the destination wishlist
    WishlistItem.objects.move_items_between_wishlists(src_wishlist, dst_wishlist)
    # Check the source wishlist doesn't have any items
    assert src_wishlist.items.count() == 0
    # Check the destination wishlist has two items
    assert dst_wishlist.items.count() == 2
    # Check that the source wishlist item with the new variant was moved to the
    # destination wishlist
    src_item_1.refresh_from_db()
    assert src_item_1.wishlist == dst_wishlist
    # Check that the source wishlist item with the duplicate variant was removed
    with pytest.raises(WishlistItem.DoesNotExist):
        src_item_2.refresh_from_db()
