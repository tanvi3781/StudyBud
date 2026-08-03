from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from base.models import Room
from .serializers import RoomSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.filters import OrderingFilter


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, SearchFilter]

    filterset_fields = ['topic', 'host']

    search_fields = [
        'name',
        'description',
        'topic__name',
        'host__username',
    ]

    ordering_fields = [
        'name',
        'created',
        'updated',
    ]