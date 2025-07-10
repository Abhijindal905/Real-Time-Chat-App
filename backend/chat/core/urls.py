from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', register, name="register"),
    path('login/', login, name="login"),
    path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('create_room/', create_room, name="create_room"),
    path('list_room/', list_room, name="list_room"),
    path('user_profile/', user_profile, name="user_profile"),
    path('upload_profile_image/', upload_profile_image, name="upload_profile_image"),

]
