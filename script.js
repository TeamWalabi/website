// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            setupMobileMenu();
            setupSubmenuToggle();
            updateSubmenuLanguage(getCurrentLanguage());
        });
    
    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
    
    // Check for stored language preference
    const storedLang = localStorage.getItem('walabi-language');
    if (storedLang) {
        switchLanguage(storedLang);
    }
});

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
}

// Submenu toggle for mobile
function setupSubmenuToggle() {
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
    
    hasSubmenuItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        
        link.addEventListener('click', function(e) {
            // Only toggle on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });
}

// Switch language functionality
function switchLanguage(lang) {
    const elements = document.querySelectorAll('[id$="-en"], [id$="-nl"]');
    
    elements.forEach(el => {
        const id = el.id;
        const idBase = id.slice(0, id.lastIndexOf('-'));
        const idLang = id.slice(id.lastIndexOf('-') + 1);
        
        if (idLang === lang) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
    
    // Update active state on language buttons
    const langButtons = document.querySelectorAll('.language-switch button');
    langButtons.forEach(button => {
        if (button.textContent.toLowerCase() === lang.toUpperCase()) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Store language preference
    localStorage.setItem('walabi-language', lang);
    
    // Update submenu language if it exists
    updateSubmenuLanguage(lang);
}

// Get current language
function getCurrentLanguage() {
    return localStorage.getItem('walabi-language') || 'en';
}

// Update submenu language
function updateSubmenuLanguage(lang) {
    const submenuItems = document.querySelectorAll('.submenu a');
    
    if (submenuItems.length > 0) {
        const translations = {
            en: [
                'Business Architecture',
                'Digital Transformation',
                'Digital Trends Exploration',
                'Interoperability and Data Sharing Infrastructures',
                'Smart Business Information Systems'
            ],
            nl: [
                'Bedrijfsarchitectuur',
                'Digitale Transformatie',
                'Verkenning Digitale Trends',
                'Interoperabiliteit en Data-uitwisselingsinfrastructuren',
                'Slimme Bedrijfsinformatiesystemen'
            ]
        };
        
        submenuItems.forEach((item, index) => {
            if (translations[lang] && translations[lang][index]) {
                item.textContent = translations[lang][index];
            }
        });
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Scroll to the target
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    }
});
