from django.contrib import admin
from .models import Department , Building , Room , Asset , Purchase , SubAsset , AssetType


# Register your models here.
admin.site.register(Department)
admin.site.register(Building)
admin.site.register(Room)
admin.site.register(Asset)
admin.site.register(Purchase)
admin.site.register(SubAsset)
admin.site.register(AssetType)