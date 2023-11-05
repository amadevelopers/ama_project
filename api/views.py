from django.shortcuts import render
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt ,datetime
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
        
        if not user.check_password(password):
            raise AuthenticationFailed("wrong password")
        
        paylod={
            'id':user.id,
            'exp':datetime.datetime.utcnow() + datetime.timedelta(days=1), #expire time #change later
            'iat': datetime.datetime.utcnow() #created time 
        }

        token = jwt.encode(paylod,'secret',algorithm='HS256').decode('utf-8')

        respose=Response()
        respose.set_cookie(key='jwt',value=token,httponly=True)

        Response.data={
                "jwt":token
            }
        return respose
        
class UserView(APIView):
    
    def get(self,request):
        token=request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("not authenticated")
        try:
            paylod = jwt.decode(token,'secret',algorithms='HS256').decode('utf-8')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("not authenticated")
        user=User.objects.get(id=paylod['id'].first())
        serializer=UserSerializer(user)
        return Response(serializer.data)
class LogoutView(APIView):
    def post(self,request):
        response=Response()
        response.delete_cookie('jwt')
        response.data={
            'message':'success',
        }
        return response
    
 
