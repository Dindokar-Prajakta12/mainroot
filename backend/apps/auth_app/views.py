from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from apps.users.models import CustomUser
from apps.users.serializers import UserSerializer

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
