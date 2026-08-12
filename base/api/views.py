from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Room
from .serializers import RoomSerializer
from django.db.models import Q
from base.models import Room, Topic, Message
from .serializers import RoomSerializer, TopicSerializer, MessageSerializer, UserSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes


@api_view(['POST'])
@authentication_classes([])
def loginUser(request):

    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {
                "error": "Username and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(
        username=username,
        password=password
    )

    if user is None:
        return Response(
            {
                "error": "Invalid username or password."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    token, created = Token.objects.get_or_create(user=user)

    return Response({
        "token": token.key,
        "user": UserSerializer(user).data
    })

@api_view(['POST'])
@authentication_classes([])
def registerUser(request):

    username = request.data.get('username')
    email = request.data.get('email', '')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {
                "error": "Username and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {
                "error": "Username already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response(
        {
            "id": user.id,
            "username": user.username,
            "email": user.email
        },
        status=status.HTTP_201_CREATED
    )

    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logoutUser(request):
    if request.auth:
        request.auth.delete()

    return Response({"message": "Logged out"})

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/rooms',
        'GET /api/rooms/:id',

    ]
    return Response(routes)

@api_view(['GET'])
def getRooms(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRoom(request, pk):
    room = Room.objects.get(id=pk)
    serializer = RoomSerializer(room, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def homeAPI(request):
    q = request.GET.get('q') if request.GET.get('q') != None else ''

    rooms = Room.objects.filter(
        Q(topic__name__icontains=q) |
        Q(name__icontains=q) |
        Q(description__icontains=q)
    )

    topics = Topic.objects.all()[:5]

    room_count = rooms.count()

    room_messages = Message.objects.filter(
        Q(room__topic__name__icontains=q)
    )

    rooms_serializer = RoomSerializer(rooms, many=True)
    topics_serializer = TopicSerializer(topics, many=True)
    messages_serializer = MessageSerializer(room_messages, many=True)

    return Response({
        "room_count": room_count,
        "rooms": rooms_serializer.data,
        "topics": topics_serializer.data,
        "messages": messages_serializer.data,
    })

@api_view(['GET'])
def getRoomDetails(request, pk):
    room = Room.objects.get(id=pk)

    room_messages = room.message_set.all().order_by('-created')

    participants = room.participants.all()

    return Response({
        "room": RoomSerializer(room).data,
        "messages": MessageSerializer(room_messages, many=True).data,
        "participants": UserSerializer(participants, many=True).data,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRoom(request):

    data = request.data

    topic_name = data.get("topic")

    if not topic_name:
        return Response(
            {"error": "Topic is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    topic, created = Topic.objects.get_or_create(
        name=topic_name
    )

    room = Room.objects.create(
        host=request.user,
        topic=topic,
        name=data.get("name"),
        description=data.get("description", "")
    )

    # Add host as participant
    room.participants.add(request.user)

    serializer = RoomSerializer(room)

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED
    )


@api_view(['PUT'])
def updateRoom(request, pk):
    room = Room.objects.get(id=pk)

    serializer = RoomSerializer(room, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteRoom(request, pk):
    room = Room.objects.get(id=pk)

    room.delete()

    return Response(
        {"message": "Room deleted successfully"},
        status=status.HTTP_204_NO_CONTENT
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMessage(request):

    serializer = MessageSerializer(data=request.data)

    if serializer.is_valid():

        message = serializer.save(
            user=request.user
        )

        return Response(
            MessageSerializer(message).data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['DELETE'])
def deleteMessage(request, pk):

    message = Message.objects.get(id=pk)

    message.delete()

    return Response(
        {
            "message":"Message deleted successfully"
        },
        status=status.HTTP_204_NO_CONTENT
    )


@api_view(['GET'])
def getUserProfile(request, pk):

    user = User.objects.get(id=pk)

    rooms = Room.objects.filter(host=user)

    messages = Message.objects.filter(
        user=user
    ).order_by('-created')

    return Response({
        "user": UserSerializer(user).data,
        "rooms": RoomSerializer(rooms, many=True).data,
        "messages": MessageSerializer(messages, many=True).data,
    })