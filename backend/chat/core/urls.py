from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', register, name="register"),
    path('login/', login, name="login"),
    path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('list_users/', list_users, name="list_users"),
    path('user_profile/', user_profile, name="user_profile"),
    path('upload_profile_image/', upload_profile_image, name="upload_profile_image"),
    path('send_requests/', send_requests, name="sent_requests"),
    path('pending_requests/', pending_requests, name="pending_requests"),
    path('accept_request/', accept_request, name="accept_request"),
    path('outgoing_requests/', outgoing_requests, name='outgoing_requests'),
    path('accepted_rooms/', accepted_rooms, name='accepted_rooms'),
    path('decline_request/', decline_request, name="decline_request"),
    path('delete_account/', delete_account, name="delete_account"),
    path('get_other_user_profile/<int:room_id>/', get_other_user_profile, name="get_other_user_profile"),
]
