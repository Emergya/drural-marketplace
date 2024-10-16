from django.conf import settings
from storages.backends.gcloud import GoogleCloudStorage
from storages.backends.s3boto3 import S3Boto3Storage


class S3MediaStorage(S3Boto3Storage):
    def __init__(self, *args, **kwargs):
        self.bucket_name = settings.MINIO_MK_MEDIA_BUCKET_NAME
        self.custom_domain = settings.MINIO_MK_MEDIA_CUSTOM_DOMAIN
        super().__init__(*args, **kwargs)


class GCSMediaStorage(GoogleCloudStorage):
    def __init__(self, *args, **kwargs):
        self.bucket_name = settings.GS_MEDIA_BUCKET_NAME
        self.custom_endpoint = settings.GS_MEDIA_CUSTOM_ENDPOINT
        super().__init__(*args, **kwargs)
