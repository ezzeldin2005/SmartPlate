from django.urls import path
from . import views

urlpatterns = [
    path('', views.Login ,name='login'),
    path('Signup/', views.Signup ,name='signup'),
    path('Home/',views.Home,name='home'),
    path('Search/',views.Search,name='search'),
    path('Claculator/',views.Claculator,name='calculator'),
    path('Profile/',views.Profile,name='profile'),
    path('AddMeal/',views.Add_meal,name='add_meal'),
    path('custom-login/', views.login_custom, name='custom_login'),
    path('custom-signup/', views.signup_custom, name='custom_signup'),
    path('logout/', views.logout_view, name='logout'),
    path('save-nutrition-data/', views.save_nutrition_data, name='save_nutrition_data'),
]

