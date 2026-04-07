from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Task, TeamMember
from .serializers import TaskSerializer, TeamMemberSerializer

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
