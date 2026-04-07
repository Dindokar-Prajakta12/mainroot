"""
URL Configuration for RBAP backend.
"""
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include


def home(request):
    return HttpResponse(
        'RBAP backend is running. Use /api/auth/login/ or /admin/.',
        content_type='text/plain'
    )

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include([
        path('auth/', include('apps.auth_app.urls')),
        path('users/', include('apps.users.urls')),
        path('tasks/', include('apps.tasks.urls')),
    ])),
]
