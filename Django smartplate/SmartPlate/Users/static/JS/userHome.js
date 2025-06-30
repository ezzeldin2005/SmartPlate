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