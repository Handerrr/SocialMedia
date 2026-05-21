from .base import *
from decouple import config

DEBUG = True

ALLOWED_HOSTS = [
    '.onrender.com',
]

CORS_ALLOWED_ORIGINS = [
    'https://socialmedia-1-brq2.onrender.com',
]

CSRF_TRUSTED_ORIGINS = [
    'https://socialmedia-1-brq2.onrender.com',
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("DB_NAME"),
        "USER": config("DB_USER"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": config("DB_HOST"),
        "PORT": config("DB_PORT"),
    }
}

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': config('CLOUD_NAME'),
    'API_KEY': config('API_KEY'),
    'API_SECRET': config('API_SECRET'),
}

STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

MIDDLEWARE.insert(
    1,
    'whitenoise.middleware.WhiteNoiseMiddleware'
)