# it is for function based views

from django.urls import path
from . import views
from .generic_views import RoomList, RoomDetail ,RoomCreate, RoomUpdate, RoomDelete


urlpatterns = [

    # path('',views.getRoutes),
    # path('home/', views.homeAPI),
    # path('rooms/', views.getRooms),
    # path('rooms/create/', views.createRoom),
    # path('rooms/<str:pk>/', views.getRoomDetails),
    # path('rooms/update/<str:pk>/', views.updateRoom),
    # path('rooms/delete/<str:pk>/', views.deleteRoom),


    path('generic/rooms/', RoomList.as_view()),
    path('generic/rooms/<int:pk>/', RoomDetail.as_view()),
    path('generic/rooms/create/', RoomCreate.as_view()),
    path('generic/rooms/update/<int:pk>/', RoomUpdate.as_view()),
    path('generic/rooms/delete/<int:pk>/', RoomDelete.as_view()),
      
]



# it is for viewsets and routers


from rest_framework.routers import DefaultRouter
from .viewsets import RoomViewSet

router = DefaultRouter()

router.register('rooms', RoomViewSet)

urlpatterns += router.urls