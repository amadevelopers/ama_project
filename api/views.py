from django.shortcuts import render
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.exceptions import AuthenticationFailed

# Create your views here.
class RegisterView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class LoginView(APIView):
    def post(self,request):
        username=request.data['username']
        password=request.data['password']

        user=User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed("No such user")
        
        if password!=user.password:
            return Response(
                {
                    'password': password,
                    'user password':user.password,
                    'status':password==user.password
                }
            )

        return Response(
            {
                "message":"success"
            }
        )

    
 