// Tab switching functionality
    function switchTab(tabName) {
        // Hide all tab contents
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Remove active class from all tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove('active'));
        
        // Show selected tab content
        document.getElementById(tabName + '-tab').classList.add('active');
        
        // Add active class to clicked button
        event.target.classList.add('active');
    }

    // Personal calorie calculator
    function calculatePersonCalories() {
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const activityLevel = document.getElementById('activity').value;
        const goal = document.getElementById('goal').value;

        if (!age || !gender || !weight || !height || !activityLevel || !goal) {
            alert('Please fill in all fields');
            return;
        }

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Activity level multipliers
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            veryActive: 1.9
        };

        // Goal adjustments (calories per day)
        const goalAdjustments = {
            lose2: -1000,
            lose1: -500,
            maintain: 0,
            gain1: 500,
            gain2: 1000
        };

        const tdee = bmr * activityMultipliers[activityLevel];
        const goalCalories = tdee + goalAdjustments[goal];

        // Update results
        document.getElementById('bmr-value').textContent = Math.round(bmr) + ' cal';
        document.getElementById('tdee-value').textContent = Math.round(tdee) + ' cal';
        document.getElementById('goal-value').textContent = Math.round(goalCalories) + ' cal';
    }

    // Meal calorie calculator
    function calculateMealCalories() {
        const protein = parseFloat(document.getElementById('protein').value) || 0;
        const carbs = parseFloat(document.getElementById('carbs').value) || 0;
        const fat = parseFloat(document.getElementById('fat').value) || 0;
        const fiber = parseFloat(document.getElementById('fiber').value) || 0;

        // Calculate calories from each macronutrient
        const proteinCal = protein * 4;
        const carbsCal = carbs * 4;
        const fatCal = fat * 9;
        const fiberCal = fiber * 2;

        const totalCalories = proteinCal + carbsCal + fatCal + fiberCal;

        // Update results
        document.getElementById('meal-total').textContent = Math.round(totalCalories);
        document.getElementById('protein-cal').textContent = Math.round(proteinCal) + ' cal';
        document.getElementById('carbs-cal').textContent = Math.round(carbsCal) + ' cal';
        document.getElementById('fat-cal').textContent = Math.round(fatCal) + ' cal';
        document.getElementById('fiber-cal').textContent = Math.round(fiberCal) + ' cal';

        // Show breakdown if there are calories
        const breakdown = document.getElementById('macro-breakdown');
        if (totalCalories > 0) {
            breakdown.style.display = 'grid';
        } else {
            breakdown.style.display = 'none';
        }
    }

    // Initialize meal calculator on page load
    document.addEventListener('DOMContentLoaded', function() {
        calculateMealCalories();
    });



    // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navList = document.getElementById('list');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navList.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !navList.contains(e.target)) {
                    navList.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }