import json

from channels.generic.websocket import AsyncWebsocketConsumer


class NotificationsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('notifications', self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('notifications', self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        if text_data:
            payload = json.loads(text_data)
            await self.send(text_data=json.dumps({
                'type': 'echo',
                'message': payload.get('message', 'Notification received.'),
            }))

    async def send_notification(self, event):
        await self.send(text_data=json.dumps({
            'title': event.get('title', 'New notification'),
            'message': event.get('message', 'A new update is available.'),
            'notification_type': event.get('notification_type', 'system'),
        }))
