<<<<<<< HEAD
from .views import GetDeparments ,GetVendors, GetBuildings , GetAssetsByRoom , GetRoomByDepartment , AddPurchase , AddAssetType , AddAssets , GetAssetSpecs ,AddSubAsset
=======
from .views import GetDeparments , GetBuildings , GetAssetsByRoom , GetRoomByDepartment , AddPurchase , AddAssetType , AddAssets , GetAssetSpecs ,AddSubAsset,GetAssetTypes
>>>>>>> refs/remotes/origin/master
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('GetDepartment', GetDeparments.as_view()),
    path('GetBuildings', GetBuildings.as_view()),
    path('GetAssetsByRoom', GetRoomByDepartment.as_view()),
    path('GetRoomByDepartment', GetRoomByDepartment.as_view()),
    path('AddPurchase',AddPurchase.as_view()),
    path('AddAssets',AddAssets.as_view()),
    path('AddAssetType',AddAssetType.as_view()),
    path('GetAssetSpecs',GetAssetSpecs.as_view()),
    path('AddSubAsset',AddSubAsset.as_view()),
<<<<<<< HEAD
    path('GetVendor',GetVendors.as_view())
=======
    path('GetAssetTypes',GetAssetTypes.as_view())
>>>>>>> refs/remotes/origin/master
]
