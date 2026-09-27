import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class UserAccessTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()

    def test_non_admin_user_cannot_list_all_users(self):
        user = self.User.objects.create_user(
            username='manager_only',
            email='manager_only@example.com',
            password='secret123',
            role='manager',
        )

        self.client.force_authenticate(user)
        response = self.client.get(reverse('customuser-list'))

        self.assertEqual(response.status_code, 403)

    def test_admin_can_list_all_users(self):
        admin = self.User.objects.create_user(
            username='admin_user',
            email='admin_user@example.com',
            password='secret123',
            role='admin',
        )

        self.client.force_authenticate(admin)
        response = self.client.get(reverse('customuser-list'))

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)
