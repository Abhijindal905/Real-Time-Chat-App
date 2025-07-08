from django.urls import path
from core.consumers import ChatConsumer

websocket_urlpatterns = [
    path("wss/chat/<str:room_name>/", ChatConsumer.as_asgi()),
]
