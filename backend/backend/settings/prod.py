from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    '.onrender.com',
]

CORS_ALLOWED_ORIGINS = [
    'https://socialmedia-1-brq2.onrender.com/',
]

CSRF_TRUSTED_ORIGINS = [
    'https://socialmedia-1-brq2.onrender.com/',
]

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

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

MIDDLEWARE.insert(
    1,
    'whitenoise.middleware.WhiteNoiseMiddleware'
)

STATICFILES_STORAGE = (
    'whitenoise.storage.CompressedManifestStaticFilesStorage'
)