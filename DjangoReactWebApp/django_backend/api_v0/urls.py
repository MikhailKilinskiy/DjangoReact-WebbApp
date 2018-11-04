from rest_framework.routers import DefaultRouter
from .views import *



router = DefaultRouter()
router.register('hive', hive_test_Set)

# API будет доступно по ссылке http://127.0.0.1:8000/api/v0/hive
urlpatterns = router.urls