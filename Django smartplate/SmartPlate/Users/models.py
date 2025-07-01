from django.utils import timezone

from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=100)
    age = models.IntegerField(default=0)
    height = models.FloatField(default=0.0)  #in cm
    weight = models.FloatField(default=0.0) # in Kg
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class CustomMeal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='custom_meals')
    name = models.CharField(max_length=150)
    calories = models.FloatField()
    protein = models.FloatField()
    fats = models.FloatField()
    carbs = models.FloatField()
    water = models.FloatField()
    image = models.ImageField(upload_to='custom_meal_pics/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} (by {self.user.username})"


class UserNutrition(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='nutrition_profile')
    gender = models.CharField(max_length=10 , null=True)

    #current intake (for progress tracking)
    total_protein = models.FloatField(default=0)
    total_carbs = models.FloatField(default=0)
    total_fat = models.FloatField(default=0)
    total_calories = models.FloatField(default=0)
    total_water = models.FloatField(default=0)

    # Daily goal fields
    goal_protein = models.FloatField(default=0)
    goal_carbs = models.FloatField(default=0)
    goal_fat = models.FloatField(default=0)
    goal_calories = models.FloatField(default=0)
    goal_water = models.FloatField(default=0)


class EatenMeal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    meal = models.ForeignKey(CustomMeal, on_delete=models.CASCADE)
    date_eaten = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.user.username} ate {self.meal.name} on {self.date_eaten}"