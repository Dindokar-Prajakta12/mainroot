import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from .models import Notification


class NotificationApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()

    def test_user_can_list_their_notifications(self):
        user = self.User.objects.create_user(
            username='notify_user',
            email='notify@example.com',
            password='secret123',
            role='user',
        )
        Notification.objects.create(user=user, title='New notice', message='Please review the latest update.', notification_type='notice')

        self.client.force_authenticate(user)
        response = self.client.get(reverse('notifications_list'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertFalse(response.json()[0]['is_read'])

    def test_unread_count_endpoint_returns_count(self):
        user = self.User.objects.create_user(
            username='notify_count',
            email='notify_count@example.com',
            password='secret123',
            role='manager',
        )
        Notification.objects.create(user=user, title='Approval', message='Approval request pending.', notification_type='task', is_read=False)
        Notification.objects.create(user=user, title='Old alert', message='Already read.', notification_type='system', is_read=True)

        self.client.force_authenticate(user)
        response = self.client.get(reverse('notifications_unread_count'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['unread_count'], 1)

    def test_user_can_mark_all_notifications_as_read(self):
        user = self.User.objects.create_user(
            username='notify_clear',
            email='notify_clear@example.com',
            password='secret123',
            role='user',
        )
        Notification.objects.create(user=user, title='One', message='First alert.', notification_type='notice', is_read=False)
        Notification.objects.create(user=user, title='Two', message='Second alert.', notification_type='task', is_read=False)

        self.client.force_authenticate(user)
        response = self.client.patch(reverse('mark_all_notifications_read'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Notification.objects.filter(user=user, is_read=False).count(), 0)


class EventsAuthorizationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()

    def test_unauthenticated_user_cannot_create_event(self):
        response = self.client.post(
            reverse('events_list'),
            data=json.dumps({
                'title': 'Forbidden Event',
                'event_type': 'event',
                'event_date': '2026-06-30',
                'event_time': '2:00 PM',
                'description': 'Should fail',
            }),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 401)

    def test_non_admin_user_cannot_create_event(self):
        user = self.User.objects.create_user(
            username='manager_only',
            email='manager_only@example.com',
            password='secret123',
            role='manager',
        )

        self.client.force_authenticate(user)
        response = self.client.post(
            reverse('events_list'),
            data=json.dumps({
                'title': 'Forbidden Event',
                'event_type': 'event',
                'event_date': '2026-06-30',
                'event_time': '2:00 PM',
                'description': 'Should fail',
            }),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 403)


class EventsApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_events_endpoint_returns_list(self):
        url = reverse('events_list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_admin_can_create_event_notice(self):
        User = get_user_model()
        user = User.objects.create_user(
            username='admin1',
            email='admin1@example.com',
            password='secret123',
            role='admin',
        )

        self.client.force_authenticate(user)
        url = reverse('events_list')
        response = self.client.post(
            url,
            data=json.dumps({
                'title': 'New Launch Event',
                'event_type': 'event',
                'event_date': '2026-06-30',
                'event_time': '2:00 PM',
                'description': 'Launch announcement',
            }),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['title'], 'New Launch Event')

    def test_non_admin_cannot_create_event_notice(self):
        User = get_user_model()
        user = User.objects.create_user(
            username='manager1',
            email='manager1@example.com',
            password='secret123',
            role='manager',
        )

        self.client.force_authenticate(user)
        url = reverse('events_list')
        response = self.client.post(
            url,
            data=json.dumps({
                'title': 'Forbidden Event',
                'event_type': 'event',
                'event_date': '2026-06-30',
                'event_time': '2:00 PM',
                'description': 'Should fail',
            }),
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 403)
