# Generated by Django 2.0.1 on 2018-09-28 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='hive_test',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('schema_version', models.CharField(blank=True, max_length=10, null=True, verbose_name='schema_version')),
                ('tablName', models.CharField(blank=True, max_length=100, null=True, verbose_name='tablName')),
                ('isarray', models.NullBooleanField(verbose_name='isarray')),
                ('lvl', models.BigIntegerField(null=True, verbose_name='lvl')),
                ('fullPath', models.CharField(blank=True, max_length=200, null=True, verbose_name='fullPath')),
                ('name', models.CharField(blank=True, max_length=100, null=True, verbose_name='name')),
            ],
        ),
    ]