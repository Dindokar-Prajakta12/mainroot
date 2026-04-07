from django.urls import path
from . import views

urlpatterns = [
    path('user-tasks/', views.user_tasks, name='user_tasks'),
    path('manager-team/', views.manager_team, name='manager_team'),
    path('dashboard-summary/', views.dashboard_summary, name='dashboard_summary'),
]
