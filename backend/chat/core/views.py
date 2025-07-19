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
                "profile_image": request.build_absolute_uri(user.profile_image.url) if user.profile_image else None
            }
        )

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(user=user)
        data = {
            'username': user.username,
            'profile_image': profile.profile_image.url if profile.profile_image else None,
        }
        return Response(data)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Profile does not exist'}, status=404)



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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_requests(request):
    receiver_username = request.data.get('receiver_username')

    if not receiver_username:
        return Response({"error": "receiver Name is Required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if receiver_username == request.user.username:
        return Response({"error": "You cant send request to yourself"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        receiver = User.objects.get(username = receiver_username)
    except User.DoesNotExist:
        return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    if ChatRoom.objects.filter(models.Q(sender_user=request.user, receiver_user=receiver) | models.Q(sender_user=receiver, receiver_user=request.user)).exists():
        return Response({"message": "Chat request already exists."}, status=400)


    
    room_name = f"{request.user.username}_{receiver_username}"
    room = ChatRoom.objects.create(
        sender_user = request.user,
        receiver_user = receiver,
        room_name = room_name,
        is_both_accepted = False
    )

    return Response({
        "id": room.id,
        "sender": room.sender_user.username,
        "receiver": room.receiver_user.username,
        "room_name": room.room_name,
        "is_accepted": room.is_both_accepted,
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pending_requests(request):
    rooms = ChatRoom.objects.filter(receiver_user=request.user, is_both_accepted = False)

    data = []
    
    for room in rooms:
        data.append(
            {
                "id": room.id,
                "sender": room.sender_user.username,
                "room_name": room.room_name,
                "is_accepted": room.is_both_accepted,
            }
        )
    
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_request(request):
    print("Incoming request data:", request.data) 
    room_id = request.data.get('room_id')  # 👈 Use room_id instead of room_name

    if not room_id:
        return Response({"error": "room_id is required"}, status=400)

    try:
        room = ChatRoom.objects.get(id=room_id, receiver_user=request.user)
    except ChatRoom.DoesNotExist:
        return Response({"error": "Request not found"}, status=404)

    room.is_both_accepted = True
    room.save()

    return Response({"message": "Request accepted successfully"}, status=200)

    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def outgoing_requests(request):
    rooms = ChatRoom.objects.filter(sender_user=request.user, is_both_accepted=False)

    data = [
        {
            "id": room.id,
            "receiver": room.receiver_user.username,
            "room_name": room.room_name,
            "is_accepted": room.is_both_accepted,
        }
        for room in rooms
    ]
    return Response(data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def accepted_rooms(request):
    rooms = ChatRoom.objects.filter(is_both_accepted=True).filter(sender_user=request.user) | ChatRoom.objects.filter(is_both_accepted=True,receiver_user=request.user)

    data = []
    for room in rooms:
        data.append( 
            {
                "id": room.id,
                "room_name": room.room_name,
                "friend_username": room.receiver_user.username if room.sender_user == request.user else room.sender_user.username,
            }
        )
        
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decline_request(request):
    room_id = request.data.get("room_id")
    if not room_id:
        return Response({"error": "room_id is required"}, status=400)

    try:
        room = ChatRoom.objects.get(id=room_id, receiver_user=request.user, is_both_accepted=False)
        room.delete()
        return Response({"message": "Request declined and deleted."})
    except ChatRoom.DoesNotExist:
        return Response({"message": "Request not found."}, status=404)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])

def delete_account(request):
    user = request.user
    user.delete()
    return Response({"detail": "Account Deleted"}, status=status.HTTP_204_NO_CONTENT)




