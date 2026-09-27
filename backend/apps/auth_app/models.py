import random
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.hashers import check_password, make_password
from django.db import models
from django.utils import timezone


class EmailOTP(models.Model):
    PURPOSE_CHOICES = (
        ('reset_password', 'Reset Password'),
        ('verify_email', 'Verify Email'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='email_otps')
    purpose = models.CharField(max_length=20, choices=PURPOSE_CHOICES, default='reset_password')
    otp_hash = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    verified = models.BooleanField(default=False)
    used = models.BooleanField(default=False)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f"OTP for {self.user.email} ({self.purpose})"

    @classmethod
    def generate(cls, user, purpose='reset_password'):
        cls.objects.filter(user=user, purpose=purpose, used=False).update(used=True)

        otp_code = str(random.randint(100000, 999999))
        otp = cls.objects.create(
            user=user,
            purpose=purpose,
            otp_hash=make_password(otp_code),
            expires_at=timezone.now() + timedelta(minutes=10),
        )
        return otp, otp_code

    def verify_code(self, otp_code):
        if self.used or timezone.now() > self.expires_at:
            return False

        if not check_password(otp_code, self.otp_hash):
            return False

        self.verified = True
        self.save(update_fields=['verified'])
        return True

    def consume(self):
        if self.used or timezone.now() > self.expires_at:
            return False

        self.used = True
        self.save(update_fields=['used'])
        return True
