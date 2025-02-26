/* script.js */

// General JavaScript Functions and Event Listeners

// Splash Page Redirection
const isDevelopment = true; // Set to false for production
const developmentFilePath = 'https://missionode.github.io/temple-app/'; // Hardcoded base path

if (isDevelopment && window.location.pathname === developmentFilePath + 'index.html') {
    console.log("Splash Page Detected (Dev):", window.location.pathname);
    setTimeout(function() {
        console.log("templeProfile:", localStorage.getItem('templeProfile'));
        if (localStorage.getItem('templeProfile')) {
            console.log("Redirecting to:", 'dashboard.html');
            window.location.href = 'dashboard.html';
        } else {
            console.log("Redirecting to:", 'introduction.html');
            window.location.href = 'introduction.html';
        }
    }, 2000);
} else if (!isDevelopment && (window.location.pathname === '/index.html' || window.location.pathname === '/')) {
    console.log("Splash Page Detected (Prod):", window.location.pathname);
    setTimeout(function() {
        console.log("templeProfile:", localStorage.getItem('templeProfile'));
        if (localStorage.getItem('templeProfile')) {
            console.log("Redirecting to:", 'dashboard.html');
            window.location.href = 'dashboard.html';
        } else {
            console.log("Redirecting to:", 'introduction.html');
            window.location.href = 'introduction.html';
        }
    }, 2000);
}

// Introduction Page Navigation
if (isDevelopment && window.location.pathname === developmentFilePath + 'introduction.html') {
    document.getElementById('continue-to-profile').addEventListener('click', function() {
        window.location.href = 'profile.html';
    });
} else if (!isDevelopment && window.location.pathname === '/introduction.html') {
    document.getElementById('continue-to-profile').addEventListener('click', function() {
        window.location.href = 'profile.html';
    });
}

// Navigation (Bottom and Hamburger)
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupHamburgerMenu();
});


// Navigation (Bottom and Hamburger)
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupHamburgerMenu();
});

function setupNavigation() {
    const navLinks = document.querySelectorAll('.bottom-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    });

    // Highlight active link
    const path = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else if (path.includes(link.getAttribute('href').replace('.html', ''))) {
            //Handles edge cases where path includes the href.
            link.classList.add('active');
        }
    });

}

function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const menuItems = document.querySelector('.menu-items');

    if (hamburger && menuItems) { // Check if elements exist
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            menuItems.classList.toggle('active');
        });

        menuItems.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                menuItems.classList.remove('active');
            });
        });
    }
}

// General Modal Functionality
function setupModal(modalId, openButtonId, closeButtonClass) {
    const modal = document.getElementById(modalId);
    const openButton = document.getElementById(openButtonId);
    const closeButtons = document.querySelectorAll(`.${closeButtonClass}`);

    if (openButton) {
        openButton.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Local Storage Helper Functions (if needed here)
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// header.js or your script.js

document.addEventListener('DOMContentLoaded', function() {
    updateHeaderTempleName()
    console.log('DOM content loaded'); // Add this line
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const headerNav = document.querySelector('.header-nav');

    hamburgerMenu.addEventListener('click', function() {
        headerNav.classList.toggle('show');
    });
});

function updateHeaderTempleName() {
    const templeProfile = JSON.parse(localStorage.getItem('templeProfile')) || {};
    const templeName = templeProfile.templeName || "Your Page Title"; // Default if templeName is not found

    document.querySelector('.header-title').textContent = templeName;
}