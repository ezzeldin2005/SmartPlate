from django.contrib import admin
from .models import User
from .models import UserNutrition
from .models import CustomMeal
from .models import EatenMeal
# Register your models here.
admin.site.register(User)
admin.site.register(UserNutrition)
admin.site.register(CustomMeal)
admin.site.register(EatenMeal)
