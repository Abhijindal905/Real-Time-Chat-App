import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from core import routing

settings_module = 'chat.deployment_settings' if 'RENDER_EXTERNAL_HOSTNAME' in os.environ else 'chat.settings'

os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module)
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(routing.websocket_urlpatterns)
    ),
})
