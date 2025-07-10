import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR
from corsheaders.defaults import default_headers  # ✅ Add this

# Deployment settings
ALLOWED_HOSTS = ['real-time-chat-app-cq0q.onrender.com']

CSRF_TRUSTED_ORIGINS = [
    f"https://{os.environ.get('RENDER_EXTERNAL_HOSTNAME')}"
]

DEBUG = False

SECRET_KEY = os.environ.get('SECRET_KEY')

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ✅ Must be first
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

STORAGES = {
    "default": {
        "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600
    )
}

# ✅ CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://real-time-chat-app-frontend-eu0j.onrender.com",
]

CORS_ALLOW_CREDENTIALS = True  # ✅ Required if using cookies or auth headers

CORS_ALLOW_HEADERS = list(default_headers) + [  # ✅ Support preflight headers
    'access-control-allow-origin',
    'access-control-allow-credentials',
    'authorization',
    'content-type',
]
