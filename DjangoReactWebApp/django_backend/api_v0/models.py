from django.db import models

class hive_test (models.Model):
    schema_version = models.CharField(verbose_name='schema_version', max_length=10, blank=True, null=True)
    tablName = models.CharField(verbose_name='tablName', max_length=100, blank=True, null=True)
    isarray = models.NullBooleanField(verbose_name='isarray', null=True)
    lvl = models.BigIntegerField(verbose_name='lvl', null=True)
    fullPath = models.CharField(verbose_name='fullPath', max_length=200, blank=True, null=True)
    name = models.CharField(verbose_name='name', max_length=100, blank=True, null=True)

