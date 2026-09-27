from rest_framework import serializers
from .models import Task, TeamMember, EventNotice, Notification

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'project', 'status', 'due_date', 'created_at']

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'status', 'joined_at']


class EventNoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventNotice
        fields = ['id', 'title', 'event_type', 'event_date', 'event_time', 'description', 'created_at']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'notification_type', 'is_read', 'created_at']
