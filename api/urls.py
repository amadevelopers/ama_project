from .views import RegisterView
from .views import LoginView
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view())
]
