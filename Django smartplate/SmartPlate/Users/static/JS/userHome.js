document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("userDataForm");
    const modal = document.getElementById("userDataModal");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const age = parseInt(document.getElementById("age").value);
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight_hidden").value);
        const gender = document.getElementById("gender").value;
        const goal = document.getElementById("goalWeight").value;
        const activity = document.getElementById("activityLevel").value;

        fetch(saveNutritionDataUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                age: age,
                height: height,
                weight: weight,
                gender: gender,
                goal: goal,
                activity: activity
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                // Hide the modal
                modal.style.display = "none";
                location.reload(); // Optional: Refresh the page to update displayed goals
            } else {
        console.error("Server responded with error:", data);
        alert("Server error: " + data.message);  // Show backend error
    }
    })
    .catch(error => {
        console.error("Request failed:", error);
        alert("Network error: " + error.message);
    });
    });


    const macros = ['calories', 'protein', 'carbs', 'fat', 'water'];

    // Function to update a single progress bar
    function updateProgressBar(macro, current, goal) {
        const totalEl = document.getElementById(`${macro}-current-total`);
        const fillEl = document.getElementById(`${macro}-progress-fill`);

        if (!totalEl || !fillEl || goal <= 0) return;

        // Update the text
        const displayValue = macro === 'water' ? current.toFixed(1) : Math.round(current);
        totalEl.innerHTML = `<b>${displayValue}</b> <sub style="color: gray;">/${macro === 'water' ? 'Liter' : 'Gram'}</sub>`;
        if (macro === 'calories') {
             totalEl.innerHTML = `<b>${displayValue}</b> <sub style="color: gray;">/Cal</sub>`;
        }


        // Update the bar width
        const percentage = Math.min((current / goal) * 100, 100); // Cap at 100%
        fillEl.style.width = `${percentage}%`;
    }

    // Initialize all progress bars on page load
    macros.forEach(macro => {
        updateProgressBar(macro, nutritionTotals[macro], nutritionGoals[macro]);
    });


    // Add event listeners to all "Done" buttons
    const doneButtons = document.querySelectorAll('.done-btn');
    doneButtons.forEach(button => {
        button.addEventListener('click', handleMealDone);
    });

    async function handleMealDone(event) {
        const button = event.currentTarget;
        const card = button.closest('.meal-card');
        const mealId = card.dataset.mealId;

        // Prevent double-clicking
        button.disabled = true;
        button.textContent = 'Logged!';

        try {
            const response = await fetch(logMealUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({ meal_id: mealId }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Update UI with new totals from the server response
                macros.forEach(macro => {
                    const newTotal = result.updated_totals[macro];
                    updateProgressBar(macro, newTotal, nutritionGoals[macro]);
                });
                card.classList.add('eaten'); // Style the card to show it's eaten
            } else {
                alert(`Error: ${result.message}`);
                button.disabled = false; // Re-enable button on error
                button.textContent = 'Done';
            }
        } catch (error) {
            console.error('Failed to log meal:', error);
            alert('An error occurred. Please try again.');
            button.disabled = false; // Re-enable button on network error
            button.textContent = 'Done';
        }
    }

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