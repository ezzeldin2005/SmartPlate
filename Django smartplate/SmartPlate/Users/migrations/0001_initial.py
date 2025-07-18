# Generated by Django 5.2.3 on 2025-06-29 13:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meal_name', models.CharField(max_length=150)),
                ('protein', models.FloatField()),
                ('carbohydrates', models.FloatField()),
                ('fats', models.FloatField()),
                ('calories', models.FloatField()),
                ('picture', models.ImageField(upload_to='meal_pics/')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('age', models.IntegerField()),
                ('height', models.FloatField()),
                ('weight', models.FloatField()),
                ('email', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='UserNutrition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_protein', models.FloatField()),
                ('total_carbs', models.FloatField()),
                ('total_fat', models.FloatField()),
                ('total_calories', models.FloatField()),
                ('total_water', models.FloatField()),
                ('meals', models.ManyToManyField(related_name='nutrition_entries', to='Users.meal')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='nutrition_logs', to='Users.user')),
            ],
        ),
    ]
