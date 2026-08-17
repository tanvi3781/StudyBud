from rest_framework.serializers import ModelSerializer, SerializerMethodField
from base.models import Room, Topic, Message
from django.contrib.auth.models import User
from rest_framework import serializers


class TopicSerializer(ModelSerializer):
    room_count = SerializerMethodField()

    class Meta:
        model = Topic
        fields = ["id", "name", "room_count"]

    def get_room_count(self, obj):
        return obj.room_set.count()


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RoomSerializer(ModelSerializer):
    host = UserSerializer(read_only=True)
    topic = TopicSerializer(read_only=True)
    participants = UserSerializer(many=True, read_only=True)

    topic_id = serializers.IntegerField(
        write_only=True,
        required=False
    )

    class Meta:
        model = Room
        fields = [
            "id",
            "host",
            "topic",
            "topic_id",
            "name",
            "description",
            "participants",
            "created",
            "updated"
        ]

    def create(self, validated_data):

        topic_id = validated_data.pop("topic_id")

        room = Room.objects.create(
            topic_id=topic_id,
            **validated_data
        )

        return room


class MessageSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    room = serializers.SerializerMethodField()

    room_id = serializers.PrimaryKeyRelatedField(
        source="room",
        queryset=Room.objects.all(),
        write_only=True
    )

    class Meta:
        model = Message
        fields = [
            "id",
            "user",
            "room",
            "room_id",
            "body",
            "updated",
            "created"
        ]

    def get_room(self, obj):
        return {
            "id": obj.room.id,
            "name": obj.room.name
        }