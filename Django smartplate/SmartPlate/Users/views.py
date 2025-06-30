from django.shortcuts import render,redirect
from django.http import HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from .models import User,UserNutrition
import json

# Create your views here.

def Login(request):
    return render(request, 'Login.html')



def Signup(request):
    return render(request, 'Signup.html')


def Home(request):
    user_id = request.session.get('user_id')
    show_modal = False
    nutrition_data = None

    if user_id:
        try:
            # Use select_related to efficiently fetch the user data as well
            nutrition_data = UserNutrition.objects.select_related('user').get(user_id=user_id)

            # The modal should only show if the user's profile is incomplete
            if nutrition_data.user.age == 0 or nutrition_data.user.weight == 0 or nutrition_data.user.height == 0:
                show_modal = True

        except UserNutrition.DoesNotExist:
            # If no nutrition profile exists, show the modal to create one
            show_modal = True
    else:
        # If no user is logged in, redirect to login
        return redirect('login')

    template = loader.get_template('userHome.html')
    # Pass both 'show_modal' and 'nutrition_data' to the template
    context = {
        'show_modal': show_modal,
        'nutrition_data': nutrition_data
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

