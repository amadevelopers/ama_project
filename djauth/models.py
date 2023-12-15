from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username=models.CharField(max_length=30,unique=True)
    email=models.CharField(max_length=50,blank=True) 
    
    def save(self, *args, **kwargs):
        # set_password here to hash it before saving
        self.set_password(self.password)
        super().save(*args, **kwargs)

    def _str_(self):
        return self.username
    
    def create_superuser(self, username, email, password=None, **extra_fields):
        user = self.create_user(username, email, password=password, is_staff=True, **extra_fields)
        user.is_active = True
        user.save(using=self._db)
        return