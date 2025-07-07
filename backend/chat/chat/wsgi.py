"""
WSGI config for chat project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""
import sys
import os

# Add your project directory to the sys.path
project_path = '/home/abhijindal905/Real-Time-Chat-App/backend/chat'
if project_path not in sys.path:
    sys.path.insert(0, project_path)

# Set the environment variable for Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'chat.settings'

# Get the WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
