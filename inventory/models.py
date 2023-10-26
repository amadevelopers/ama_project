from django.db import models
from django.contrib.postgres.fields import ArrayField #for specs in asset-type
# Create your models here.

class Building(models.Model):
    name = models.CharField(max_length=50)

class Department(models.Model):
    name = models.CharField(max_length=50)
    building = models.ForeignKey(Building, on_delete=models.PROTECT)

class Room(models.Model):
    name = models.CharField(max_length=50)
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    building = models.ForeignKey(Building, on_delete=models.PROTECT)

class Purchase(models.Model):
    invoice_no = models.CharField(max_length=30)
    date = models.DateField()
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    seller = models.CharField(max_length=100)

class AssetType(models.Model):
    name=models.CharField(max_length=50)
    specs=ArrayField(models.CharField(max_length=50),null=True) 

class Asset(models.Model):
    name = models.CharField(max_length=100)
    serial_no = models.CharField(max_length=50)
    asset_type = models.ForeignKey(AssetType, on_delete=models.PROTECT)
    room = models.ForeignKey(Room, on_delete=models.PROTECT)
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    target_department = models.ForeignKey(Department, related_name='assets_moved',null=True, on_delete=models.PROTECT)
    date = models.DateField()
    specs = models.JSONField()

class SubAsset(models.Model):
    name = models.CharField(max_length=100)
    serial_no = models.CharField(max_length=50)
    purchase = models.ForeignKey(Purchase, on_delete=models.PROTECT)
    specs = models.JSONField()
    asset = models.ForeignKey(Asset, on_delete=models.PROTECT)
