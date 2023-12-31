
This file defines the Django models for the asset management system .


##Visualization of the Database

              +---------------+
              |   Building    |
              |---------------|
              | PK: name      |
              +---------------+
                      |
                      |
              +-------|-------+
              |               |
              v               v
    +----------------+  +----------------+
    | Department     |  |      Room      |
    |----------------|  |----------------|
    | PK: name       |  | PK: name       |
    | FK: building   |  | FK: department |
    +----------------+  | FK: building   |
                         +----------------+
                                   |
                                   |
                         +---------|---------+
                         |                   |
                         v                   v
                   +-------------+   +----------------+
                   |   Vendor    |   |   Purchase     |
                   |-------------|   |----------------|
                   | PK: name    |   | PK: invoice    |
                   | contact_no  |   | date           |
                   | address     |   | FK: department |
                   +-------------+   | FK: seller     |
                                      +---------------+
                                              |
                                              |
                                  +-----------|-----------+
                                  |                       |
                                  v                       v
                            +-------------+     +----------------+
                            | AssetType   |     |      Asset     |
                            |-------------|     |----------------|
                            | PK: name    |     | PK: serial_no  |
                            | specs       |     | name           |
                            +-------------+     | FK: asset_type |
                                                | FK: room       |
                                                | FK: department |
                                                | FK: purchase   |
                                                | FK: target_department |
                                                | date           |
                                                | specs          |
                                                +----------------+
                                                          |
                                                          |
                                                +---------|
                                                |          
                                                v             
                                          +--------------+    
                                          |  SubAsset    |    
                                          |--------------|    
                                          | PK: serial_no| 
                                          | FK: asset    |
                                          | FK: purchase |    
                                          | name         |
                                          | specs        |    
                                          +--------------+


1. Building

class Building(models.Model):
    name = models.CharField(max_length=50, primary_key=True)

###Fields:
name: CharField, maximum length 50 characters, primary key. Represents the name of a building.

2. Department

class Department(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    building = models.ForeignKey(Building, on_delete=models.PROTECT)

###Fields:
name: CharField, maximum length 50 characters, primary key. Represents the name of a department.
building: ForeignKey to Building, on_delete=models.PROTECT. Represents the building to which the department belongs.

3. Room

class Room(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    building = models.ForeignKey(Building, on_delete=models.PROTECT)


###Fields:
name: CharField, maximum length 50 characters, primary key. Represents the name of a room.
department: ForeignKey to Department, on_delete=models.PROTECT. Represents the department to which the room belongs.
building: ForeignKey to Building, on_delete=models.PROTECT. Represents the building to which the room belongs.

4. Vendor

class Vendor(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    contact_no = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
###Fields:
name: CharField, maximum length 100 characters, primary key. Represents the name of a vendor.
contact_no: CharField, maximum length 10 characters. Represents the contact number of a vendor.
address: CharField, maximum length 200 characters. Represents the address of a vendor.

5. Purchase

class Purchase(models.Model):
    invoice_no = models.CharField(max_length=30, primary_key=True)
    date = models.DateField()
    department = models.ForeignKey(Department, to_field='name', db_column='department_name', on_delete=models.PROTECT)
    seller = models.ForeignKey(Vendor, to_field='name', db_column='vendor_name', on_delete=models.PROTECT)
###Fields:
invoice_no: CharField, maximum length 30 characters, primary key. Represents the invoice number of a purchase.
date: DateField. Represents the date of the purchase.
department: ForeignKey to Department, on_delete=models.PROTECT. Represents the department making the purchase.
seller: ForeignKey to Vendor, on_delete=models.PROTECT. Represents the vendor from whom the purchase is made.

6. AssetType

class AssetType(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    specs = ArrayField(models.CharField(max_length=50), null=True)

###Fields:
name: CharField, maximum length 50 characters, primary key. Represents the name of an asset type.
specs: ArrayField of CharField, maximum length 50 characters, allowing null values. Represents specifications for the asset type.

7. Asset

class Asset(models.Model):
    name = models.CharField(max_length=100)
    serial_no = models.CharField(max_length=50, primary_key=True)
    asset_type = models.ForeignKey(AssetType, to_field='name', db_column='assettype_name', on_delete=models.PROTECT)
    room = models.ForeignKey(Room, to_field='name', db_column='room_name', on_delete=models.PROTECT, null=True)
    department = models.ForeignKey(Department, to_field='name', db_column='department_name', on_delete=models.PROTECT)
    purchase = models.ForeignKey(Purchase, to_field='invoice_no', db_column='purchase_invoice_no', on_delete=models.PROTECT, null=True)
    target_department = models.ForeignKey(Department, related_name='assets_moved', to_field='name', db_column='target_department_name', null=True, on_delete=models.PROTECT)
    date = models.DateField()
    specs = models.JSONField()

###Fields:
name: CharField, maximum length 100 characters. Represents the name of an asset.
serial_no: CharField, maximum length 50 characters, primary key. Represents the serial number of an asset.
asset_type: ForeignKey to AssetType, on_delete=models.PROTECT. Represents the type of the asset.
room: ForeignKey to Room, on_delete=models.PROTECT, allowing null values. Represents the room where the asset is located.
department: ForeignKey to Department, on_delete=models.PROTECT. Represents the department to which the asset belongs.
purchase: ForeignKey to Purchase, on_delete=models.PROTECT, allowing null values. Represents the purchase associated with the asset.
target_department: ForeignKey to Department, related_name='assets_moved', on_delete=models.PROTECT, allowing null values. Represents the department to which the asset is moved.
date: DateField. Represents the date of the asset.
specs: JSONField. Represents the specifications of the asset.

8. SubAsset

class SubAsset(models.Model):
    name = models.CharField(max_length=100)
    serial_no = models.CharField(max_length=50, primary_key=True)
    purchase = models.ForeignKey(Purchase, to_field='invoice_no', db_column='purchase_invoice_no', on_delete=models.PROTECT)
    specs = models.JSONField()
    asset = models.ForeignKey(Asset, to_field='serial_no', db_column='asset_serial_no', on_delete=models.PROTECT)

###Fields:
name: CharField, maximum length 100 characters. Represents the name of a sub-asset.
serial_no: CharField, maximum length 50 characters, primary key. Represents the serial number of a sub-asset.
purchase: ForeignKey to Purchase, on_delete=models.PROTECT. Represents the purchase associated with the sub-asset.
specs: JSONField. Represents the specifications of the sub-asset.
asset: ForeignKey to Asset, on_delete=models.PROTECT. Represents the parent asset of the sub-asset.
