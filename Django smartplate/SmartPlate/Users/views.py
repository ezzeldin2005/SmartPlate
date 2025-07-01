from django.shortcuts import render,redirect
from django.http import HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from .models import User, UserNutrition, CustomMeal,EatenMeal
from django.db.models import F # Import F to perform database-level operations
from django.utils import timezone
import json
import math

# Create your views here.

def Login(request):
    return render(request, 'Login.html')



def Signup(request):
    return render(request, 'Signup.html')


def Home(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')


    eaten_today_ids = []
    show_modal = False
    nutrition_data = None
    healthy_weight_range = ""
    custom_meals = []  # Initialize as an empty list

    try:
        user = User.objects.get(id=user_id)
        nutrition_data = UserNutrition.objects.get(user=user)

        # Fetch the user's custom meals
        custom_meals = CustomMeal.objects.filter(user=user)

        # ✨ GET A LIST OF MEAL IDs EATEN TODAY ✨
        today = timezone.now().date()
        eaten_today_ids = EatenMeal.objects.filter(
            user=user, date_eaten=today
        ).values_list('meal_id', flat=True)

        if user.age == 0 or user.weight == 0 or user.height == 0:
            show_modal = True
        else:
            height_in_meters = user.height / 100
            lower_bmi = 18.5
            upper_bmi = 24.9
            lower_bound = lower_bmi * math.pow(height_in_meters, 2)
            upper_bound = upper_bmi * math.pow(height_in_meters, 2)
            healthy_weight_range = f"{lower_bound:.0f} - {upper_bound:.0f} Kg"

    except (User.DoesNotExist, UserNutrition.DoesNotExist):
        # This might happen if a user exists but their nutrition profile was somehow deleted
        # Or if the session user_id is invalid. Redirecting to login is a safe fallback.
        return redirect('login')

    template = loader.get_template('userHome.html')
    context = {
        'show_modal': show_modal,
        'nutrition_data': nutrition_data,
        'healthy_weight_range': healthy_weight_range,
        'custom_meals': custom_meals,  # Pass the meals to the template
        'eaten_today_ids': list(eaten_today_ids),
    }
    return HttpResponse(template.render(context, request))

def Claculator(request):
    if 'user_id' not in request.session:
        return redirect('login')
    return render(request, 'calculator.html')

def Search(request):
    if 'user_id' not in request.session:
        return redirect('login')
    return render(request, 'search.html')

def Profile(request):
    if 'user_id' not in request.session:
        return redirect('login')
    return render(request, 'profile.html')

def Add_meal(request):
    if 'user_id' not in request.session:
        return redirect('login')
    return render(request, 'Addmeal.html')

def logout_view(request):
    request.session.flush()  # This clears all session data
    return render(request, 'About.html')  # Redirect to login or home page


@csrf_exempt
def login_custom(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Fetch all users as a list of dictionaries
            users = User.objects.all()

            # Search for a user with matching email and password
            for user in users:
                if user.email == email and user.password == password:
                    request.session['user_id'] = user.id
                    request.session['user_name'] = user.username

                    return JsonResponse({
                        'status': 'success',
                        'user_id': user.id,
                        'name': user.username
                    })

            return JsonResponse({'status': 'error', 'message': 'Invalid email or password'})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

    return JsonResponse({'status': 'fail', 'message': 'Only POST method allowed'})

@csrf_exempt
def signup_custom(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('name')
            email = data.get('email')
            password = data.get('password')

            # Check if user already exists
            if User.objects.filter(email=email).exists():
                return JsonResponse({'status': 'error', 'message': 'Email already exists'})

            # Create user (other fields will be filled later)
            user = User.objects.create(
                username=username,
                email=email,
                password=password,
                height=0.0,
                weight=0.0,
                age=0
            )

            UserNutrition.objects.create(user=user)

            request.session['user_id'] = user.id
            request.session['user_name'] = user.username

            return JsonResponse({'status': 'success', 'user_id': user.id})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({'status': 'fail', 'message': 'Only POST allowed'})

@csrf_exempt
def save_nutrition_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            user_id = request.session.get('user_id')
            if not user_id:
                return JsonResponse({'status': 'error', 'message': 'User not logged in'})

            age = int(data.get('age'))
            height = float(data.get('height'))
            weight = float(data.get('weight'))
            gender = data.get('gender')
            goal = data.get('goal')
            activity = data.get('activity')

            # Update user core info
            user = User.objects.get(id=user_id)
            user.age = age
            user.height = height
            user.weight = weight
            user.save()

            # --- BMR Calculation ---
            if gender == "male":
                bmr = 10 * weight + 6.25 * height - 5 * age + 5
            else:
                bmr = 10 * weight + 6.25 * height - 5 * age - 161

            activity_multipliers = {
                "sedentary": 1.2,
                "light": 1.375,
                "moderate": 1.55,
                "active": 1.725,
                "very_active": 1.9,
            }
            multiplier = activity_multipliers.get(activity, 1.2)
            maintenance_calories = bmr * multiplier

            goal_adjustments = {
                "lose2": -1000,
                "lose1": -500,
                "maintain": 0,
                "gain1": 500,
                "gain2": 1000,
            }
            adjusted_calories = maintenance_calories + goal_adjustments.get(goal, 0)

            protein_g = (adjusted_calories * 0.3) / 4
            carbs_g = (adjusted_calories * 0.4) / 4
            fat_g = (adjusted_calories * 0.3) / 9
            water_l = weight * 0.033

            # Save or update UserNutrition
            nutrition, created = UserNutrition.objects.get_or_create(user=user)
            nutrition.gender = gender
            nutrition.goal_calories = adjusted_calories
            nutrition.goal_protein = protein_g
            nutrition.goal_carbs = carbs_g
            nutrition.goal_fat = fat_g
            nutrition.goal_water = water_l
            nutrition.save()

            return JsonResponse({"status": "success"})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

    return JsonResponse({'status': 'fail', 'message': 'Only POST allowed'})

@csrf_exempt
def add_custom_meal(request):
    if request.method == 'POST':
        try:
            user_id = request.session.get('user_id')
            if not user_id:
                return JsonResponse({'status': 'error', 'message': 'User not authenticated'}, status=401)

            user = User.objects.get(id=user_id)

            # Use request.POST for form data and request.FILES for files
            custom_meal = CustomMeal(
                user=user,
                name=request.POST.get('name'),
                calories=float(request.POST.get('calories')),
                protein=float(request.POST.get('protein')),
                fats=float(request.POST.get('fats')),
                carbs=float(request.POST.get('carbs')),
                water=float(request.POST.get('water')),
                image=request.FILES.get('image')  # Handle the uploaded file
            )
            custom_meal.save()

            return JsonResponse({'status': 'success', 'message': 'Meal added successfully!'})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'fail', 'message': 'Invalid request method'}, status=405)


@csrf_exempt
def log_meal(request):
    if request.method == 'POST':
        user_id = request.session.get('user_id')
        if not user_id:
            return JsonResponse({'status': 'error', 'message': 'User not authenticated'}, status=401)

        try:
            data = json.loads(request.body)
            meal_id = data.get('meal_id')

            user = User.objects.get(id=user_id)
            meal = CustomMeal.objects.get(id=meal_id, user_id=user_id)
            nutrition_profile = UserNutrition.objects.get(user_id=user_id)
            today = timezone.now().date()

            # ✨ CHECK IF THE MEAL WAS ALREADY LOGGED TODAY ✨
            if EatenMeal.objects.filter(user=user, meal=meal, date_eaten=today).exists():
                return JsonResponse({'status': 'info', 'message': 'Meal already logged for today.'})

            # Update the user's total intake using F() expressions for safety
            # F() prevents race conditions and is more efficient
            nutrition_profile.total_calories = F('total_calories') + meal.calories
            nutrition_profile.total_protein = F('total_protein') + meal.protein
            nutrition_profile.total_carbs = F('total_carbs') + meal.carbs
            nutrition_profile.total_fat = F('total_fat') + meal.fats
            nutrition_profile.total_water = F('total_water') + (meal.water / 1000)  # Convert mL to Liters

            nutrition_profile.save()
            # ✨ CREATE THE EatenMeal RECORD ✨
            EatenMeal.objects.create(user=user, meal=meal, date_eaten=today)

            # Refresh the object from the database to get the updated values
            nutrition_profile.refresh_from_db()

            # Return the new totals to update the frontend
            return JsonResponse({
                'status': 'success',
                'updated_totals': {
                    'calories': nutrition_profile.total_calories,
                    'protein': nutrition_profile.total_protein,
                    'carbs': nutrition_profile.total_carbs,
                    'fat': nutrition_profile.total_fat,
                    'water': nutrition_profile.total_water,
                }
            })

        except (CustomMeal.DoesNotExist, UserNutrition.DoesNotExist):
            return JsonResponse({'status': 'error', 'message': 'Meal or profile not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'fail', 'message': 'Invalid request method'}, status=405)
