/* navigation.js */

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