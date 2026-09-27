from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from apps.users.models import CustomUser
from apps.users.serializers import UserSerializer
from .models import EmailOTP

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response(
            {'detail': 'Email and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = CustomUser.objects.filter(email=email).first()
    if user and user.check_password(password):
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })
    
    return Response(
        {'detail': 'Invalid email or password.'},
        status=status.HTTP_401_UNAUTHORIZED
    )

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('name', '').split()[0] if request.data.get('name') else ''
    
    if not email or not password:
        return Response(
            {'detail': 'Email and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if CustomUser.objects.filter(email=email).exists():
        return Response(
            {'detail': 'This email is already registered.'},
            status=status.HTTP_409_CONFLICT
        )
    
    user = CustomUser.objects.create_user(
        username=email.split('@')[0],
        email=email,
        password=password,
        first_name=first_name,
        role='user'
    )
    token, _ = Token.objects.get_or_create(user=user)
    
    return Response({
        'detail': 'Registration successful.',
        'token': token.key,
        'user': UserSerializer(user).data
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def send_otp(request):
    email = (request.data.get('email') or '').strip().lower()

    if not email:
        return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(email__iexact=email).first()
    if not user:
        return Response({'detail': 'If an account exists for this email, an OTP has been sent.'}, status=status.HTTP_200_OK)

    otp, otp_code = EmailOTP.generate(user, purpose='reset_password')

    send_mail(
        subject='RBAP OTP Verification',
        message=(
            f'Hello {user.first_name or user.username},\n\n'
            'Use the following OTP code to verify your email and reset your password:\n'
            f'OTP code: {otp_code}\n\n'
            'This code is valid for 10 minutes.'
        ),
        from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@rbap.local'),
        recipient_list=[user.email],
        fail_silently=False,
    )

    return Response({'detail': 'OTP sent successfully to your email.'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    email = (request.data.get('email') or '').strip().lower()
    otp_code = (request.data.get('otp') or '').strip()

    if not email or not otp_code:
        return Response({'detail': 'Email and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(email__iexact=email).first()
    if not user:
        return Response({'detail': 'Invalid email or OTP.'}, status=status.HTTP_404_NOT_FOUND)

    otp = EmailOTP.objects.filter(user=user, purpose='reset_password', used=False).order_by('-created_at').first()
    if not otp or not otp.verify_code(otp_code):
        return Response({'detail': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'verified': True, 'detail': 'OTP verified successfully.'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    email = (request.data.get('email') or '').strip().lower()
    otp_code = (request.data.get('otp') or '').strip()
    new_password = request.data.get('new_password') or ''

    if not email or not otp_code or not new_password:
        return Response({'detail': 'Email, OTP, and new password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(email__iexact=email).first()
    if not user:
        return Response({'detail': 'Invalid request.'}, status=status.HTTP_404_NOT_FOUND)

    otp = EmailOTP.objects.filter(user=user, purpose='reset_password', verified=True, used=False).order_by('-created_at').first()
    if not otp or not otp.verify_code(otp_code):
        return Response({'detail': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        validate_password(new_password, user=user)
    except Exception as exc:
        return Response({'detail': exc.messages[0] if hasattr(exc, 'messages') else str(exc)}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save(update_fields=['password'])
    otp.consume()

    return Response({'detail': 'Password updated successfully.'}, status=status.HTTP_200_OK)
