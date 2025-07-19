from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', default='profile_images/default.png', null=True, blank=True)

    def __str__(self):
        return self.user.username


class ChatRoom(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests', null=True, blank=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recieved_requests', null=True, blank=True)
    name = models.CharField(max_length=100, unique=True, null=True, blank=True)
    is_accepted = models.BooleanField(default=False)
    
