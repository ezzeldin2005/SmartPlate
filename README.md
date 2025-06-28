# SmartPlate - Nutrition and Calorie Tracking Application

## Overview

SmartPlate is a comprehensive nutrition and calorie tracking web application designed to help users monitor their dietary intake, calculate daily caloric needs, and track macronutrients. The application features a clean, responsive interface with two main calculators (personal and meal), user authentication, and a dashboard for tracking progress.

## Features

### 1. User Authentication System
- **Login Page**: Secure authentication with email and password
- **Signup Page**: Comprehensive registration with:
  - Personal details (name, age, gender)
  - Physical metrics (weight, height)
  - Nutrition goals and activity level
- Form validation with error messaging

### 2. Calorie Calculators
- **Personal Calculator**:
  - Uses Mifflin-St Jeor equation for accurate BMR calculation
  - Calculates TDEE based on activity level
  - Provides goal calories for weight loss/gain/maintenance
  - Inputs: age, gender, weight, height, activity level, goal

- **Meal Calculator**:
  - Calculates calories from macronutrients
  - Supports protein, carbs, fats, and fiber
  - Real-time calculation as values change
  - Detailed macro breakdown display

### 3. User Dashboard
- Visual progress tracking with:
  - Calorie consumption progress bar
  - Macronutrient breakdown (carbs, protein, fats)
  - Weight and water tracking
  - Meal cards with consumption tracking

### 4. Responsive Design
- Fully responsive layout for all device sizes
- Mobile-optimized navigation and forms
- Adaptive grid layouts for calculators

### 5. Additional Features
- Nutrition API integration (Edamam)
- Persistent user session management
- Clean, modern UI with intuitive navigation

## Technical Implementation

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: 
  - Flexbox and Grid layouts
  - Responsive design with media queries
  - Custom animations and transitions
- **JavaScript**:
  - Form validation
  - Calculator logic
  - API integration
  - DOM manipulation

### Architecture
- Modular component structure
- Separation of concerns (HTML/CSS/JS)
- Reusable UI components (cards, forms, navigation)



## Usage Instructions

1. **Registration**:
   - Navigate to signup page
   - Fill in all required details
   - Submit form to create account

2. **Login**:
   - Enter registered email and password
   - Redirects to dashboard upon success

3. **Dashboard**:
   - View current calorie and nutrient intake
   - Track progress toward goals
   - Log meals and water intake

4. **Calculators**:
   - Personal Calculator: Get daily calorie targets
   - Meal Calculator: Calculate calories from macros

5. **Navigation**:
   - Use the top navigation bar to access all features
   - Logout from the profile menu

## API Integration

The application integrates with the Edamam Nutrition API to:
- Fetch nutritional data for foods
- Calculate calories and macros from ingredients
- API key is included in the `API.js` file

## Dependencies

- Font Awesome (v6) - For icons
- Google Fonts (Edu NSW ACT Hand Pre) - For typography
- Edamam Nutrition API - For food data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari and Chrome

## Future Enhancements

1. Backend integration for data persistence
2. Expanded food database
3. Meal planning features
4. Social sharing capabilities
5. Advanced analytics and reporting

