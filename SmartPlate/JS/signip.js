document.getElementById("form").addEventListener('submit', function(e) {
    e.preventDefault();

    const userName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPass = document.getElementById("cpassword").value.trim();
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const gender = document.querySelector('input[name="Gender"]:checked')?.value || "";
    const activity = document.getElementById("activity").value;
    const goal = document.getElementById("goal").value;

    // Example: Logging all data
    console.log({
        userName,
        email,
        password,
        confirmPass,
        age,
        weight,
        height,
        gender
    });

    // You can now do validation or send the data as needed
});


function showMessage(message, type) {
    const messageElement = document.getElementById('msg');
    messageElement.textContent = message;
    messageElement.style.color = type === 'error' ? 'red' : 'green';

    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.style.color = '';
    }, 3000);
}

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