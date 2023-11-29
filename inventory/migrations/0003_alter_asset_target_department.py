# Generated by Django 4.2.6 on 2023-11-20 17:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_alter_asset_asset_type_alter_asset_department_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asset',
            name='target_department',
            field=models.ForeignKey(db_column='target_department_name', null=True, on_delete=django.db.models.deletion.PROTECT, related_name='assets_moved', to='inventory.department'),
        ),
    ]
