from channels.routing import URLRouter
from django.urls import path

from apps.tasks.consumers import NotificationsConsumer

websocket_urlpatterns = [
    path('ws/notifications/', NotificationsConsumer.as_asgi()),
]

application = URLRouter(websocket_urlpatterns)
