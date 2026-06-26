from .base import *
from decouple import config

DEBUG = False

ALLOWED_HOSTS = [
    ".railway.app",
    ".up.railway.app",
]

CORS_ALLOWED_ORIGINS = [
    "https://socialmedia-production-b6d8.up.railway.app",
]

CSRF_TRUSTED_ORIGINS = [
    "https://socialmedia-production-b6d8.up.railway.app",
]

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": config("CLOUD_NAME"),
    "API_KEY": config("API_KEY"),
    "API_SECRET": config("API_SECRET"),
}

# WhiteNoise para produção
STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}