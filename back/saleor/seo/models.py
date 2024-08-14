from django.core.validators import MaxLengthValidator
from django.db import models

from ..core.utils.translations import Translation

class Keyword(models.Model):
    """
    Represents a keyword used for SEO purposes.

    Attributes:
        name_keyword (str): The name of the keyword, with a maximum length of 70 characters.
    """
    name_keyword = models.CharField(
        max_length=70,
        blank=True,
        null=True,
        unique=True,
        validators=[MaxLengthValidator(70)]
    )

    class Meta:
        ordering = ['pk']


class SeoModel(models.Model):
    """
    An abstract model that includes common SEO fields.

    Attributes:
        seo_title (str): The SEO title with a maximum length of 70 characters.
        seo_description (str): The SEO description with a maximum length of 300 characters.
        keywords (ManyToManyField): A many-to-many relationship to keywords.
    """
    seo_title = models.CharField(
        max_length=70,
        blank=True,
        null=True,
        validators=[MaxLengthValidator(70)]
    )
    seo_description = models.CharField(
        max_length=300,
        blank=True,
        null=True,
        validators=[MaxLengthValidator(300)]
    )
    keywords = models.ManyToManyField(Keyword)

    class Meta:
        abstract = True


class SeoModelTranslation(Translation):
    """
    An abstract model for translations of SEO fields.

    Attributes:
        seo_title (str): The translated SEO title with a maximum length of 70 characters.
        seo_description (str): The translated SEO description with a maximum length of 300 characters.
    """
    seo_title = models.CharField(
        max_length=70,
        blank=True,
        null=True,
        validators=[MaxLengthValidator(70)]
    )
    seo_description = models.CharField(
        max_length=300,
        blank=True,
        null=True,
        validators=[MaxLengthValidator(300)]
    )

    class Meta:
        abstract = True

    def get_translated_keys(self):
        return {
            "seo_title": self.seo_title,
            "seo_description": self.seo_description,
        }

