from .base import *

MEDIA_URL = config('MEDIA_URL')
MEDIA_ROOT = config(BASE_DIR / 'media')

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