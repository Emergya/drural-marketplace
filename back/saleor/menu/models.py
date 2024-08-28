from django.db import models
from mptt.managers import TreeManager
from mptt.models import MPTTModel

from ..core.models import ModelWithMetadata, SortableModel
from ..core.permissions import MenuPermissions
from ..core.utils.translations import Translation, TranslationProxy
from ..page.models import Page
from ..product.models import Category, Collection


class Menu(ModelWithMetadata):
    """
    Model representing a menu.

    Attributes:
        name (str): The name of the menu.
        slug (str): The slug of the menu.
    """
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)

    class Meta(ModelWithMetadata.Meta):
        ordering = ("pk",)
        permissions = ((MenuPermissions.MANAGE_MENUS.codename, "Manage navigation."),)

    def __str__(self):
        return self.name


class MenuItem(ModelWithMetadata, MPTTModel, SortableModel):
    """
    Represents a menu item in the system.

    Attributes:
        menu (ForeignKey): The menu to which this item belongs.
        name (CharField): The name of the menu item.
        parent (ForeignKey): The parent menu item, if any.
        url (URLField): The URL associated with the menu item.
        category (ForeignKey): The category associated with the menu item.
        collection (ForeignKey): The collection associated with the menu item.
        page (ForeignKey): The page associated with the menu item.
        objects (Manager): The default manager for the model.
        tree (TreeManager): The manager for handling tree operations.
        translated (TranslationProxy): The proxy for handling translations.

    """
    menu = models.ForeignKey(Menu, related_name="items", on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="children", on_delete=models.CASCADE
    )

    # not mandatory fields, usage depends on what type of link is stored
    url = models.URLField(max_length=256, blank=True, null=True)
    category = models.ForeignKey(
        Category, blank=True, null=True, on_delete=models.CASCADE
    )
    collection = models.ForeignKey(
        Collection, blank=True, null=True, on_delete=models.CASCADE
    )
    page = models.ForeignKey(Page, blank=True, null=True, on_delete=models.CASCADE)

    objects = models.Manager()
    tree = TreeManager()
    translated = TranslationProxy()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("sort_order", "pk")
        app_label = "menu"

    def __str__(self):
        return self.name

    def get_ordering_queryset(self):
        return (
            self.menu.items.filter(level=0)
            if not self.parent
            else self.parent.children.all()
        )

    @property
    def linked_object(self):
        return self.category or self.collection or self.page


class MenuItemTranslation(Translation):
    """
    Represents a translation of a menu item.

    Attributes:
        menu_item (ForeignKey): The menu item associated with this translation.
        name (CharField): The translated name of the menu item.
    """
    menu_item = models.ForeignKey(
        MenuItem, related_name="translations", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=128)

    class Meta:
        ordering = ("language_code", "menu_item", "pk")
        unique_together = (("language_code", "menu_item"),)

    def __repr__(self):
        class_ = type(self)
        return "%s(pk=%r, name=%r, menu_item_pk=%r)" % (
            class_.__name__,
            self.pk,
            self.name,
            self.menu_item_id,
        )

    def __str__(self):
        return self.name

    def get_translated_object_id(self):
        return "MenuItem", self.menu_item_id

    def get_translated_keys(self):
        return {
            "name": self.name,
        }
