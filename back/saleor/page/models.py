from django.contrib.postgres.indexes import GinIndex
from django.db import models

from ..core.db.fields import SanitizedJSONField
from ..core.models import ModelWithMetadata, PublishableModel, PublishedQuerySet
from ..core.permissions import PagePermissions, PageTypePermissions
from ..core.utils.editorjs import clean_editor_js
from ..core.utils.translations import TranslationProxy
from ..seo.models import SeoModel, SeoModelTranslation


class PageQueryset(PublishedQuerySet):
    """
    Returns a queryset of pages visible to the given requestor.

    Args:
        requestor: The user making the request.

    Returns:
        QuerySet: A queryset of pages visible to the requestor.
    """
    def visible_to_user(self, requestor):
        if requestor.has_perm(PagePermissions.MANAGE_PAGES):
            return self.all()
        return self.published()


class Page(ModelWithMetadata, SeoModel, PublishableModel):
    """
    Represents a page in the marketplace.

    The page can be of different types, which can be used to render the page
    in different ways. 

    Attributes:
        slug (str): The unique slug of the page.
        title (str): The title of the page.
        page_type (PageType): The page type associated with the page.
        content (str): The content of the page.
        created (datetime): The date and time when the page was created.
    """
    slug = models.SlugField(unique=True, max_length=255)
    title = models.CharField(max_length=250)
    page_type = models.ForeignKey(
        "PageType", related_name="pages", on_delete=models.CASCADE
    )
    content = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)
    created = models.DateTimeField(auto_now_add=True)

    translated = TranslationProxy()

    objects = models.Manager.from_queryset(PageQueryset)()

    class Meta(ModelWithMetadata.Meta):
        ordering = ("slug",)
        permissions = ((PagePermissions.MANAGE_PAGES.codename, "Manage pages."),)
        indexes = [*ModelWithMetadata.Meta.indexes, GinIndex(fields=["title", "slug"])]

    def __str__(self):
        return self.title


class PageTranslation(SeoModelTranslation):
    """
    Represents a translation of a Page object.

    Attributes:
        page (Page): The Page object that this translation belongs to.
        title (str): The translated title of the page.
        content (str): The translated content of the page.
    """

    page = models.ForeignKey(
        Page, related_name="translations", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255, blank=True, null=True)
    content = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)

    class Meta:
        ordering = ("language_code", "page", "pk")
        unique_together = (("language_code", "page"),)

    def __repr__(self):
        class_ = type(self)
        return "%s(pk=%r, title=%r, page_pk=%r)" % (
            class_.__name__,
            self.pk,
            self.title,
            self.page_id,
        )

    def __str__(self):
        return self.title if self.title else str(self.pk)

    def get_translated_object_id(self):
        return "Page", self.page_id

    def get_translated_keys(self):
        translated_keys = super().get_translated_keys()
        translated_keys.update(
            {
                "title": self.title,
                "content": self.content,
            }
        )
        return translated_keys


class PageType(ModelWithMetadata):
    """
    Represents a type of page in the marketplace.

    Attributes:
        name (str): The name of the page type.
        slug (str): The slug of the page type.
    """
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)

    class Meta(ModelWithMetadata.Meta):
        ordering = ("slug",)
        permissions = (
            (
                PageTypePermissions.MANAGE_PAGE_TYPES_AND_ATTRIBUTES.codename,
                "Manage page types and attributes.",
            ),
        )
        indexes = [*ModelWithMetadata.Meta.indexes, GinIndex(fields=["name", "slug"])]
