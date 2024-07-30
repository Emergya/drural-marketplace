import graphene

from ..core.types import SortInputObjectType


class WishlistSortField(graphene.Enum):
    CREATION_DATE = ["created_at", "pk"]

    @property
    def description(self):
        if self.name in WishlistSortField.__enum__._member_names_:
            sort_name = self.name.lower().replace("_", " ")
            return f"Sort wishlists by {sort_name}."
        raise ValueError("Unsupported enum value: %s" % self.value)


class WishlistSortingInput(SortInputObjectType):
    class Meta:
        sort_enum = WishlistSortField
        type_name = "wishlists"
