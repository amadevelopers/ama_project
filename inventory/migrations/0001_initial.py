# Generated by Django 4.2.6 on 2024-02-13 07:42

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('name', models.CharField(max_length=100)),
                ('serial_no', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('specs', models.JSONField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='AssetType',
            fields=[
                ('name', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('specs', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), null=True, size=None)),
            ],
        ),
        migrations.CreateModel(
            name='Building',
            fields=[
                ('name', models.CharField(max_length=50, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('name', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='inventory.building')),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('invoice_no', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('department', models.ForeignKey(db_column='department_name', on_delete=django.db.models.deletion.PROTECT, to='inventory.department')),
            ],
        ),
        migrations.CreateModel(
            name='Vendor',
            fields=[
                ('name', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('contact_no', models.CharField(max_length=10)),
                ('address', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='SubAsset',
            fields=[
                ('name', models.CharField(max_length=100)),
                ('serial_no', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('specs', models.JSONField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('asset', models.ForeignKey(db_column='asset_serial_no', on_delete=django.db.models.deletion.PROTECT, to='inventory.asset')),
                ('purchase', models.ForeignKey(db_column='purchase_invoice_no', on_delete=django.db.models.deletion.PROTECT, to='inventory.purchase')),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('name', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='inventory.building')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='inventory.department')),
            ],
        ),
        migrations.AddField(
            model_name='purchase',
            name='seller',
            field=models.ForeignKey(db_column='vendor name', on_delete=django.db.models.deletion.PROTECT, to='inventory.vendor'),
        ),
        migrations.AddField(
            model_name='asset',
            name='asset_type',
            field=models.ForeignKey(db_column='assettype_name', on_delete=django.db.models.deletion.PROTECT, to='inventory.assettype'),
        ),
        migrations.AddField(
            model_name='asset',
            name='department',
            field=models.ForeignKey(db_column='department_name', on_delete=django.db.models.deletion.PROTECT, to='inventory.department'),
        ),
        migrations.AddField(
            model_name='asset',
            name='purchase',
            field=models.ForeignKey(db_column='purchase_invoice_no', null=True, on_delete=django.db.models.deletion.PROTECT, to='inventory.purchase'),
        ),
        migrations.AddField(
            model_name='asset',
            name='room',
            field=models.ForeignKey(db_column='room_name', null=True, on_delete=django.db.models.deletion.PROTECT, to='inventory.room'),
        ),
        migrations.AddField(
            model_name='asset',
            name='target_department',
            field=models.ForeignKey(db_column='target_department_name', null=True, on_delete=django.db.models.deletion.PROTECT, related_name='assets_moved', to='inventory.department'),
        ),
    ]
