from django.urls import path
from . import views

urlpatterns = [
    path('user-tasks/', views.user_tasks, name='user_tasks'),
    path('manager-team/', views.manager_team, name='manager_team'),
    path('events/', views.events_list, name='events_list'),
    path('notifications/', views.notifications_list, name='notifications_list'),
    path('notifications/unread-count/', views.notifications_unread_count, name='notifications_unread_count'),
    path('notifications/<int:pk>/read/', views.mark_notification_read, name='mark_notification_read'),
    path('notifications/read-all/', views.mark_all_notifications_read, name='mark_all_notifications_read'),
    path('dashboard-summary/', views.dashboard_summary, name='dashboard_summary'),
]
