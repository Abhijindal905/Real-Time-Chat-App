from django.urls import path
from core.consumers import TestConsumer

websocket_urlpatterns = [
    path("ws/test/", TestConsumer.as_asgi()),
]
