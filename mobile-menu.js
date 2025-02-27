document.addEventListener("DOMContentLoaded", function() {
    initializeMenu();
});

// Separate function to initialize the menu
function initializeMenu() {
    // Get references to elements
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    
    // Remove any existing mobile menu buttons first to avoid duplicates
    const existingButton = document.querySelector('.mobile-menu-toggle');
    if (existingButton) {
        existingButton.remove();
    }
    
    // Create the mobile menu button
    if (header && nav) {
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '☰ Meny';
        
        // Add button to DOM
        header.insertBefore(mobileMenuToggle, nav);
        
        // Function to toggle menu visibility
        function toggleMenu(e) {
            if (e) {
                e.stopPropagation(); // Prevent event bubbling
            }
            const navMenu = document.querySelector('header nav ul');
            if (navMenu) {
                navMenu.classList.toggle('show');
            }
        }
        
        // Event listeners for the menu button
        mobileMenuToggle.addEventListener('click', toggleMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const navMenu = document.querySelector('header nav ul');
            if (navMenu && navMenu.classList.contains('show') && 
                !nav.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
        
        // For each link in the nav menu
        const navLinks = document.querySelectorAll('header nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Close the menu
                const navMenu = document.querySelector('header nav ul');
                if (navMenu) {
                    navMenu.classList.remove('show');
                }
                
                // Check if the link is to a different page
                const href = this.getAttribute('href');
                if (href && href.startsWith('/')) {
                    // Prevent default navigation
                    e.preventDefault();
                    
                    // Use history.pushState for SPA-like navigation
                    history.pushState(null, '', href);
                    
                    // Load the new page content
                    loadPageContent(href);
                }
            });
        });
    }
}

// Function to load page content dynamically
function loadPageContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            // Create a temporary div to parse the fetched HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Find the main content area (adjust selector as needed)
            const mainContent = document.querySelector('main');
            const fetchedMainContent = tempDiv.querySelector('main');
            
            if (mainContent && fetchedMainContent) {
                // Replace the current main content with the fetched content
                mainContent.innerHTML = fetchedMainContent.innerHTML;
                
                // Optional: Update page title
                const fetchedTitle = tempDiv.querySelector('title');
                if (fetchedTitle) {
                    document.title = fetchedTitle.textContent;
                }
                
                // Reinitialize any page-specific scripts or functionality
                if (typeof initializeMenu === 'function') {
                    initializeMenu();
                }
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
            // Fallback to standard navigation if fetch fails
            window.location.href = url;
        });
}

// Handle viewport
if (document.querySelector('meta[name="viewport"]')) {
    document.querySelector('meta[name="viewport"]').setAttribute(
        'content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function() {
    loadPageContent(window.location.pathname);
});