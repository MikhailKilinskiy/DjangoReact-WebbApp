from rest_framework import serializers
from .models import hive_test

# Сериализуем модели

class hive_test_Serializer(serializers.ModelSerializer):
    class Meta:
        model = hive_test
        fields = [
            'schema_version',
            'tablName',
            'isarray',
            'lvl',
            'fullPath',
            'name',
        ]