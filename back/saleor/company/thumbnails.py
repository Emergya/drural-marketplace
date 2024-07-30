from ..celeryconf import app
from ..core.utils import create_thumbnails
from .models import Company


@app.task
def create_company_banner_thumbnails(collection_id: str):
    """Take a Collection model and create the background image thumbnails for it."""
    create_thumbnails(
        pk=collection_id,
        model=Company,
        size_set="background_images",
        image_attr="background_image",
    )
