from django.db import models
from django.contrib.postgres.fields import ArrayField #for specs in asset-type
# Create your models here.

class Building(models.Model):
    name = models.CharField(max_length=50,primary_key=True)

class Department(models.Model):
    name = models.CharField(max_length=50,primary_key=True)
    building = models.ForeignKey(Building, on_delete=models.PROTECT)

class Room(models.Model):
    name = models.CharField(max_length=50,primary_key=True)
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    building = models.ForeignKey(Building, on_delete=models.PROTECT)

class Vendor(models.Model):
    name = models.CharField(max_length=100,primary_key=True)
    contact_no = models.CharField(max_length=10)
    address = models.CharField(max_length=200)

class Purchase(models.Model):
    invoice_no = models.CharField(max_length=30,primary_key=True)
    date = models.DateField()
    department = models.ForeignKey(Department, to_field='name', db_column='department_name', on_delete=models.PROTECT)
    seller = models.ForeignKey(Vendor,to_field='name',db_column='vendor name',on_delete=models.PROTECT)

class AssetType(models.Model):
    name=models.CharField(max_length=50,primary_key=True)
    specs=ArrayField(models.CharField(max_length=50),null=True) 

class Asset(models.Model):
    name = models.CharField(max_length=100)
    serial_no = models.CharField(max_length=50,primary_key=True)
    asset_type = models.ForeignKey(AssetType, to_field='name',db_column='assettype_name',on_delete=models.PROTECT)
    room = models.ForeignKey(Room, to_field='name',db_column='room_name',on_delete=models.PROTECT,null=True)
    department = models.ForeignKey(Department,to_field='name',db_column='department_name', on_delete=models.PROTECT)
    purchase=models.ForeignKey(Purchase,to_field='invoice_no',db_column='purchase_invoice_no',on_delete=models.PROTECT,null=True)
    target_department= models.ForeignKey(Department,related_name='assets_moved',to_field='name',db_column='target_department_name',null=True, on_delete=models.PROTECT)
    specs = models.JSONField()

class SubAsset(models.Model):
    name = models.CharField(max_length=100)
    serial_no = models.CharField(max_length=50,primary_key=True)
    purchase = models.ForeignKey(Purchase,to_field='invoice_no',db_column='purchase_invoice_no',on_delete=models.PROTECT)
    specs = models.JSONField()
    asset = models.ForeignKey(Asset,to_field='serial_no',db_column='asset_serial_no' ,on_delete=models.PROTECT)