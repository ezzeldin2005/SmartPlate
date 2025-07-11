document.addEventListener("DOMContentLoaded", function() {
    var logintop = document.getElementById("Logintop");
    var signuptop = document.getElementById("signuptop");
    var about = document.getElementById("about");
    var home = document.getElementById("home");
    var calculator = document.getElementById("Calculator");
    var search = document.getElementById("search");
    var profile = document.getElementById("profilenav");

    var currentPath = window.location.pathname; // Get the path part of the URL
    // More reliable check for the current page
    if (currentPath.includes("Login.html")) {
        if (logintop) {
            logintop.style.backgroundColor = "#000000";
            logintop.style.padding = "8px , 16px";
            logintop.style.borderRadius = "20px";
            logintop.style.color = "white"; // Optional: to make the text visible
        }
    } 
    else if (currentPath.includes("Signup.html")) 
        {
        if (signuptop) {
            signuptop.style.backgroundColor = "#000000";
            signuptop.style.padding = "8px , 16px";
            signuptop.style.borderRadius = "20px";
            signuptop.style.color = "white";
        }
    }
    
    else if (currentPath.includes("About.html")) {
        if (about) {
            about.style.backgroundColor = "#000000";
            about.style.padding = "8px , 16px";
            about.style.borderRadius = "20px";
            about.style.color = "white";
        }
    }
    else if (currentPath.includes("userHome.html")) {
        if (home) {
            home.style.backgroundColor = "#000000";
            home.style.padding = "8px , 16px";
            home.style.borderRadius = "20px";
            home.style.color = "white";
        }
    }
    else if (currentPath.includes("calculator.html")) {
        if (calculator) {
            calculator.style.backgroundColor = "#000000";
            calculator.style.padding = "8px , 16px";
            calculator.style.borderRadius = "20px";
            calculator.style.color = "white";
        }
    }
    else if (currentPath.includes("search.html")) {
        if (search) {
            search.style.backgroundColor = "#000000";
            search.style.padding = "8px , 16px";
            search.style.borderRadius = "20px";
            search.style.color = "white";
        }
    }
    else if (currentPath.includes("profile.html")) {
        if (profile) {
            profile.style.backgroundColor = "#000000";
            profile.style.padding = "8px , 16px";
            profile.style.borderRadius = "20px";
            profile.style.color = "white";
        }
    }
});