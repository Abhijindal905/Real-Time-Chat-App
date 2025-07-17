from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from core.models import UserProfile
# Create your views here.
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    profile_image = request.FILES.get('profile_image')


    print("getting data", username)

    if not username or not password or not email:
        return Response({'error' : 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username = username).exists():
        return Response({'error': 'Already exists username'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Already exists email'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    profile, created = UserProfile.objects.get_or_create(user=user)
    if profile_image:
        profile.profile_image = profile_image
        profile.save()
    
    return Response({'message' : 'Registered Successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'All Fields are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username = username, password = password)

    if (user is None):
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    refresh = RefreshToken.for_user(user)
    
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'message': 'Login Successfully',
        'username': user.username
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_users(request):
    users = UserProfile.objects.select_related('user')
    data = []
    for user in users:
        data.append(
            {
                'id': user.id,
                "username": user.user.username,
                "profile_image": request.build_absolute_uri(user.profile_image) if user.profile_image else None
            }
        )

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    profile = user.userprofile

    return Response({
        "username": user.username,
        "profile_image": request.build_absolute_uri(profile.profile_image.url) if profile.profile_image else None
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upload_profile_image(request):
    user = request.user
    profile = user.userprofile

    image = request.FILES.get('profile_image')
    if image:
        profile.profile_image = image
        profile.save()
        return Response({"message": "Profile Image Update"})
    
    return Response({"error": "No Image Provided"}, status=400)

