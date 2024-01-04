from .views import *
from django.urls import path
from django.conf.urls import include
from .views import search_assets

urlpatterns = [
    path('GetDepartment', GetDeparments.as_view()),
    path('GetBuildings', GetBuildings.as_view()),
    path('GetAssetsByRoom', GetAssetsByRoom.as_view()),
    path('GetRoomByDepartment', GetRoomByDepartment.as_view()),
    path('AddPurchase',AddPurchase.as_view()),
    path('AddAssets',AddAssets.as_view()),
    path('GetAssetTypes',GetAssetTypes.as_view()),
    path('AddAssetType',AddAssetType.as_view()),
    path('GetExistingAsset',GetExistingAsset.as_view()),
    path('GetAssetSpecs',GetAssetSpecs.as_view()),
    path('AddSubAsset',AddSubAsset.as_view()),
    path('GetVendors',GetVendors.as_view()),
    
    path('search_assets/', search_assets, name='search_assets')
]
