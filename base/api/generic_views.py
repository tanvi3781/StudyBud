from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from base.models import Room
from .serializers import RoomSerializer
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView

from django.shortcuts import get_object_or_404

class RoomList(ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    # def get(self, request):
    #     rooms = self.get_queryset()
    #     serializer = self.get_serializer(rooms, many=True)
    #     return Response(serializer.data)

class RoomDetail(RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    # def get(self, request, pk):
    #     room = get_object_or_404(Room, id=pk)
    #     serializer = self.get_serializer(room)
    #     return Response(serializer.data)

class RoomCreate(CreateAPIView):

    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    # serializer_class = RoomSerializer

    # def post(self, request):
    #     serializer = self.get_serializer(data=request.data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)

    #     return Response(serializer.errors)


class RoomUpdate(UpdateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


# @api_view(['GET', 'PUT'])
# def RoomUpdate(request, pk):
#     room = get_object_or_404(Room, id=pk)

#     if request.method == 'GET':
#         serializer = RoomSerializer(room)
#         return Response(serializer.data)

#     serializer = RoomSerializer(room, data=request.data)

#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)

#     return Response(serializer.errors, status=400)


class RoomDelete(DestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


# class RoomDelete(GenericAPIView):

#     queryset = Room.objects.all()

#     def delete(self, request, pk):

#         room = self.get_object()
#         room.delete()

#         return Response(
#             {"message": "Deleted"}
#         )


