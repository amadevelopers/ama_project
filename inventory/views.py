from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import *
from djauth.models import *

# Create your views here.
class GetDeparments(APIView):
    def get(self,request):
        departments=Department.objects.all()
        serializer=DepartmentSerializer(departments,many=True)
        return Response(serializer.data)
    
class GetBuildings(APIView):
    def get(self,request):
        building=Building.objects.all()
        serializer=BuildingSerializer(building,many=True)
        return Response(serializer.data)
    
class GetRoomByDepartment(APIView):
    def post(self,request):
        department=request.data['department']
        room=Room.objects.filter(department__name=department)
        serializer=RoomSerializer(room,many=True)
        return Response(serializer.data)
    
class GetAssetsByRoom(APIView):
    def post(self,request):
        room=request.data['room']
        asset=Asset.objects.filter(room__name=room)
        serializer=AssetSerailizer(asset,many=True)
        return Response(serializer.data)
    
class AddPurchase(APIView):
    def post(Self,request):
        serializer=PuchaseSerializerToAdd(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddAssets(APIView):
    def post(Self,request):
        serializer=AssetSerializerToAdd(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddAssetType(APIView):
    def post(Self,request):
        serializer=AssetTypeSerializerToAdd(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetAssetSpecs(APIView):
    def post(self, request):
        asset_name = request.data['asset_name']
        asset_type = AssetType.objects.filter(name=asset_name)
        serializer = GetAssetSpecsSerializer(asset_type, many=True)  # Assuming there can be multiple types
        return Response(serializer.data)
    
class AddSubAsset(APIView):
    def post(self,request):
        serializer=SubAssetSerializerToAdd(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class GetVendors(APIView):
    def get(self,request):
        vendors = Vendor.objects.all()
        serializer=VendorSerializer(vendors,many=True)
        return Response(serializer.data)

class AddVendors(APIView):
    def post(self,request):
        serializer = VendorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetExistingAsset(APIView):
    def post(self,request):
        serial_no=request.data['serial_no']
        asset=Asset.objects.get(serial_no=serial_no)
        serializer=GetAssetSerializer(asset)
        return Response(serializer.data)
    
class GetAssetTypes(APIView):
    def get(self,request):
        asset_types=AssetType.objects.all()
        serializer = GetAssetTypesSerializer(asset_types,many=True)
        return Response(serializer.data)
    
class Dashboard(APIView):
    def get(self,request):
        assets=Asset.objects.all().count()
        buildings = Building.objects.all().count()
        departments = Department.objects.all().count()
        users = User.objects.all().count()
        unallocated = Asset.objects.filter(target_department__isnull=True).count()
        data = {
            "assets":assets,
            "buildings":buildings,
            "departments":departments,
            "users":users,
            "unallocated":unallocated
        }
        return Response(data=data)