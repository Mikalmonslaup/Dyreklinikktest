// mobile-menu.js - Fixed version
document.addEventListener("DOMContentLoaded", function() {
    // Get references to elements
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    const navMenu = document.querySelector('header nav ul');
    
    // Ensure the menu starts closed on mobile
    if (window.innerWidth <= 768 && navMenu) {
        navMenu.classList.remove('show');
    }
    
    // Create the mobile menu button if it doesn't exist
    if (header && nav && !document.querySelector('.mobile-menu-toggle')) {
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '☰ Meny';
        
        header.insertBefore(mobileMenuToggle, nav);
        
        // Toggle menu visibility when button is clicked
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from immediately closing menu
            if (navMenu) {
                navMenu.classList.toggle('show');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu && 
                navMenu.classList.contains('show') &&
                !nav.contains(event.target) && 
                !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('show');
            }
        });
        
        // Close menu when clicking a menu link
        const navLinks = document.querySelectorAll('header nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu) {
                    navMenu.classList.remove('show');
                }
            });
        });
    }
});

// Add an extra check when window loads to ensure menu is closed on mobile
window.onload = function() {
    const navMenu = document.querySelector('header nav ul');
    if (window.innerWidth <= 768 && navMenu) {
        navMenu.classList.remove('show');
    }
};