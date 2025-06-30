from django.contrib import admin
from .models import User
from .models import UserNutrition
from .models import Meal
# Register your models here.
admin.site.register(User)
admin.site.register(UserNutrition)
admin.site.register(Meal)
