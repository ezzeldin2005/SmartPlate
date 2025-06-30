from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=100)
    age = models.IntegerField()
    height = models.FloatField()  #in cm
    weight = models.FloatField() # in Kg
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class Meal(models.Model):
    meal_name = models.CharField(max_length=150)
    protein = models.FloatField()
    carbohydrates = models.FloatField()
    fats = models.FloatField()
    calories = models.FloatField()
    picture = models.ImageField(upload_to='meal_pics/')

    def __str__(self):
        return self.meal_name


class UserNutrition(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nutrition_logs')
    meals = models.ManyToManyField(Meal, related_name='nutrition_entries')

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

