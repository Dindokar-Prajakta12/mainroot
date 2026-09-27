from django.contrib.auth import get_user_model
from django.core import mail
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class OtpAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()
        self.user = self.User.objects.create_user(
            username='otpuser',
            email='otp@example.com',
            password='StrongPass123!',
            role='user',
        )

    def test_send_otp_sends_email(self):
        with self.settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend'):
            response = self.client.post(reverse('send_otp'), {
                'email': 'otp@example.com',
            }, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn('OTP', mail.outbox[0].subject)

    def test_verify_otp_and_reset_password(self):
        with self.settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend'):
            self.client.post(reverse('send_otp'), {'email': 'otp@example.com'}, format='json')
            otp_code = mail.outbox[0].body.split('OTP code: ')[1].split('\n')[0]

        verify_response = self.client.post(reverse('verify_otp'), {
            'email': 'otp@example.com',
            'otp': otp_code,
        }, format='json')

        self.assertEqual(verify_response.status_code, 200)
        self.assertTrue(verify_response.json()['verified'])

        reset_response = self.client.post(reverse('reset_password'), {
            'email': 'otp@example.com',
            'otp': otp_code,
            'new_password': 'NewSecurePass123!',
        }, format='json')

        self.assertEqual(reset_response.status_code, 200)

        updated_user = self.User.objects.get(email='otp@example.com')
        self.assertTrue(updated_user.check_password('NewSecurePass123!'))
