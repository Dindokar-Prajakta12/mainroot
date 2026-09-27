from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from apps.users.models import CustomUser
from .models import Task, TeamMember, EventNotice, Notification
from .serializers import TaskSerializer, TeamMemberSerializer, EventNoticeSerializer, NotificationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_tasks(request):
    tasks = Task.objects.filter(assigned_to=request.user)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def manager_team(request):
    if request.user.role != 'manager':
        return Response({'detail': 'Only managers can view team.'}, status=status.HTTP_403_FORBIDDEN)
    
    team = TeamMember.objects.filter(manager=request.user)
    serializer = TeamMemberSerializer(team, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def events_list(request):
    if request.method == 'POST':
        if not getattr(request.user, 'is_authenticated', False):
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        if getattr(request.user, 'role', None) != 'admin':
            return Response({'detail': 'Only admins can create events.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = EventNoticeSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()

            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                'notifications',
                {
                    'type': 'send.notification',
                    'title': 'New event or notice available',
                    'message': f"{event.get_event_type_display()} created: {event.title}",
                    'notification_type': event.event_type,
                },
            )

            for user in CustomUser.objects.exclude(is_active=False):
                Notification.objects.create(
                    user=user,
                    title='New event or notice available',
                    message=f"{event.get_event_type_display()} created: {event.title}",
                    notification_type=event.event_type,
                )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    notices = EventNotice.objects.filter(is_active=True)[:10]

    if not notices.exists():
        sample_events = [
            {
                'title': 'Quarterly Town Hall',
                'event_type': 'event',
                'event_date': '2026-06-18',
                'event_time': '10:30 AM',
                'description': 'All teams are invited to the quarterly review meeting and project roadmap update.',
            },
            {
                'title': 'Server Maintenance Window',
                'event_type': 'notice',
                'event_date': '2026-06-20',
                'event_time': '11:00 PM - 1:00 AM',
                'description': 'The system will be under scheduled maintenance. Please save your work before the window begins.',
            },
        ]
        return Response(sample_events)

    serializer = EventNoticeSerializer(notices, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notifications_list(request):
    notifications = Notification.objects.filter(user=request.user).order_by('-created_at')[:20]
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notifications_unread_count(request):
    count = Notification.objects.filter(user=request.user, is_read=False).count()
    return Response({'unread_count': count})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def mark_notification_read(request, pk):
    try:
        notification = Notification.objects.get(pk=pk, user=request.user)
    except Notification.DoesNotExist:
        return Response({'detail': 'Notification not found.'}, status=status.HTTP_404_NOT_FOUND)

    notification.is_read = True
    notification.save(update_fields=['is_read', 'updated_at'])
    return Response(NotificationSerializer(notification).data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def mark_all_notifications_read(request):
    Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
    return Response({'detail': 'All notifications marked as read.'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_summary(request):
    if request.user.role == 'admin':
        from apps.users.models import CustomUser
        summary = {
            'total_users': CustomUser.objects.count(),
            'active_projects': 8,
            'monthly_revenue': 128400,
            'system_health': 'green'
        }
    elif request.user.role == 'manager':
        team_count = TeamMember.objects.filter(manager=request.user).count()
        summary = {
            'team_size': team_count,
            'pending_approvals': 7,
            'projects': 4
        }
    else:
        completed = Task.objects.filter(assigned_to=request.user, status='completed').count()
        total = Task.objects.filter(assigned_to=request.user).count()
        summary = {
            'tasks': total,
            'completed': completed
        }
    
    return Response(summary)
