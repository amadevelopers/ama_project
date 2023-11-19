from .views import GetDeparments , GetBuildings , GetAssetsByRoom , GetRoomByDepartment , AddPurchase
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('GetDepartment', GetDeparments.as_view()),
    path('GetBuildings', GetBuildings.as_view()),
    path('GetAssetsByRoom', GetRoomByDepartment.as_view()),
    path('GetRoomByDepartment', GetRoomByDepartment.as_view()),
    path('AddPurchase',AddPurchase.as_view())
]