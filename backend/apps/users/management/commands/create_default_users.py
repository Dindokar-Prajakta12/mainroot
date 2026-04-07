from django.core.management.base import BaseCommand
from apps.users.models import CustomUser

class Command(BaseCommand):
    help = 'Create default admin, manager, and user accounts'

    def handle(self, *args, **options):
        users = [
            {'username': 'admin', 'email': 'admin@rbap.in', 'password': 'adminPassword@rbap123!', 'role': 'admin', 'first_name': 'Admin'},
            {'username': 'manager', 'email': 'manager@rbap.in', 'password': 'managerPassword@rbap123!', 'role': 'manager', 'first_name': 'Manager'},
            {'username': 'user', 'email': 'user@rbap.in', 'password': 'userPassword@rbap123!', 'role': 'user', 'first_name': 'User'},
        ]
        
        for user_data in users:
            if not CustomUser.objects.filter(email=user_data['email']).exists():
                CustomUser.objects.create_user(**user_data)
                self.stdout.write(self.style.SUCCESS(f"Created user: {user_data['email']}"))
            else:
                self.stdout.write(self.style.WARNING(f"User already exists: {user_data['email']}"))
