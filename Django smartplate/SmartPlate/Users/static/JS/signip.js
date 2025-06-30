document.getElementById("form").addEventListener('submit', function(e) {
    e.preventDefault();

    const userName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPass = document.getElementById("cpassword").value.trim();

    if (password !== confirmPass) {
        showMessage("Passwords do not match", "error");
        return;
    }

    // Send data to backend
    fetch('/user/custom-signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            showMessage("Signup successful!", "success");
            setTimeout(() => {
                window.location.href = "/user/";  // Redirect to login page
            }, 2000);
        } else {
            showMessage(data.message || "Signup failed", "error");
        }
    })
    .catch(err => {
        console.error(err);
        showMessage("Something went wrong", "error");
    });
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