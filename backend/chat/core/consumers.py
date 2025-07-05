from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync
class TestConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(text_data=json.dumps({"status": "connected to project"}))
    def receive(self, text_data):
        print(text_data)
        self.send(json.dumps(text_data))

    def disconnect(self, close_code):
        print("disconnect")

