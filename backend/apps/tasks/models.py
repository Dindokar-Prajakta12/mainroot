from django.db import models
from apps.users.models import CustomUser

class Task(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    )
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks')
    project = models.CharField(max_length=255, default='Project')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default='active')
    manager = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='team_members')
    joined_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
