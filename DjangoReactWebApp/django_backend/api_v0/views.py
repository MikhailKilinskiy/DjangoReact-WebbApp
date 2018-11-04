from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *


class hive_test_Set(viewsets.ModelViewSet):
    queryset = hive_test.objects.all()
    serializer_class = hive_test_Serializer

    # Переопределяем метод, чтобы работать массивом словарей
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

            if isinstance(data, list):
                kwargs["many"] = True

        return super(hive_test_Set, self).get_serializer(*args, **kwargs)




    # http://127.0.0.1:8000/api/v0/articles/1/ - Один объект по id

