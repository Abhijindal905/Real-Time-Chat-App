from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
# Create your views here.
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')


    print("getting data", username)

    if not username or not password or not email:
        return Response({'error' : 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username = username).exists():
        return Response({'error': 'Already exists username'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password)
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_room(request):
    room_name = request.data.get("room_name")

    if not room_name:
        return Response({"message" : "Room name is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if ChatRoom.objects.filter(name=room_name).exists():
        return Response({"message": "Already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    room = ChatRoom.objects.create(name=room_name)
    return Response({'message': 'Created Successfully','id': room.id, 'name': room.name}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def list_room(request):
    rooms = ChatRoom.objects.all().values('id', 'name')
    return Response({'rooms': rooms})


