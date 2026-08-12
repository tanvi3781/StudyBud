# it is for function based views

from django.urls import path
from . import views
from .generic_views import RoomList, RoomDetail ,RoomCreate, RoomUpdate, RoomDelete
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [

    path('',views.getRoutes),
    path('home/', views.homeAPI),
    path('rooms/', views.getRooms),
    path('rooms/create/', views.createRoom),
    path('rooms/<str:pk>/', views.getRoomDetails),
    path('rooms/update/<str:pk>/', views.updateRoom),
    path('rooms/delete/<str:pk>/', views.deleteRoom),


    path('generic/rooms/', RoomList.as_view()),
    path('generic/rooms/<int:pk>/', RoomDetail.as_view()),
    path('generic/rooms/create/', RoomCreate.as_view()),
    path('generic/rooms/update/<int:pk>/', RoomUpdate.as_view()),
    path('generic/rooms/delete/<int:pk>/', RoomDelete.as_view()),

    path('messages/create/',views.createMessage),

    path("login/", views.loginUser),
    path("logout/", views.logoutUser),
    path("register/", views.registerUser),

    path('messages/delete/<str:pk>/',views.deleteMessage),

    path('users/<str:pk>/', views.getUserProfile),
    

    path("token/", obtain_auth_token),
]



# it is for viewsets and routers


from rest_framework.routers import DefaultRouter
from .viewsets import RoomViewSet

router = DefaultRouter()

router.register('rooms', RoomViewSet)

urlpatterns += router.urls