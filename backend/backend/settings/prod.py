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

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': config('CLOUD_NAME'),
    'API_KEY': config('API_KEY'),
    'API_SECRET': config('API_SECRET'),
}