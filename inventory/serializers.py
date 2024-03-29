from rest_framework import serializers
from .models import *

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    building=BuildingSerializer()
    class Meta:
        model = Department
        fields='__all__'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model= Room
        fields='__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()
    class Meta:
        model=Purchase
        feilds='__all__'

class PuchaseSerializerToAdd(serializers.ModelSerializer):
        department = serializers.SlugRelatedField(slug_field='name', queryset=Department.objects.all())
        class Meta:
          model = Purchase
          fields = '__all__'

class SubAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubAsset
        fields = '__all__'

class AssetSerializer(serializers.ModelSerializer):
    sub_assets = SubAssetSerializer(many=True, read_only=True)

    class Meta:
        model = Asset
        fields = '__all__'


class AssetSerializerToAdd(serializers.ModelSerializer):
    department = serializers.SlugRelatedField(slug_field='name', queryset=Department.objects.all())
    purchase = serializers.SlugRelatedField(slug_field='invoice_no', queryset=Purchase.objects.all())
    asset_type = serializers.SlugRelatedField(slug_field='name',queryset=AssetType.objects.all())
    class Meta:
        model = Asset
        fields = '__all__'

class AssetTypeSerializerToAdd(serializers.ModelSerializer):
    class Meta:
        model = AssetType 
        fields='__all__'

class GetAssetSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model=AssetType
        fields=['specs']

class SubAssetSerializerToAdd(serializers.ModelSerializer):
    serializers.SlugRelatedField(slug_field='serial_no',queryset=Asset.objects.all())
    class Meta:
        model=SubAsset
        fields='__all__'

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model= Vendor
        fields=['name']

class GetAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model=Asset
        fields='__all__'

class GetAssetTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model=AssetType
        fields='__all__'  #as of now send names and specs let the frontend handle it , later make 2 api calls or find a btter way