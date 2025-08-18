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
    
    // Setup services carousel
    setupServicesCarousel();
});

// Services Carousel functionality
function setupServicesCarousel() {
    const servicesGrid = document.querySelector('.services-grid');
    const prevBtn = document.getElementById('services-prev-btn');
    const nextBtn = document.getElementById('services-next-btn');
    const dotsContainer = document.getElementById('services-dots');
    
    if (!servicesGrid || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const serviceCards = servicesGrid.querySelectorAll('.service-card');
    const totalServices = serviceCards.length;
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    
    console.log('Total services:', totalServices, 'Cards per view:', cardsPerView);
    
    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(totalServices / cardsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Get number of cards that fit per view
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    // Update carousel position
    function updateCarousel() {
        const cardWidth = 350 + 32; // card width + gap
        const translateX = -currentIndex * (cardsPerView * cardWidth);
        servicesGrid.style.transform = `translateX(${translateX}px)`;
        
        console.log('Current index:', currentIndex, 'Translate X:', translateX);
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update navigation buttons
        const maxIndex = Math.ceil(totalServices / cardsPerView) - 1;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        console.log('Max index:', maxIndex, 'Next disabled:', currentIndex >= maxIndex);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        const maxIndex = Math.ceil(totalServices / cardsPerView) - 1;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        currentIndex = 0;
        updateCarousel();
        createDots();
    });
    
    // Initialize carousel
    createDots();
    updateCarousel();
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    servicesGrid.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    servicesGrid.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                nextSlide();
            } else {
                // Swipe right - previous
                prevSlide();
            }
        }
    }
}

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
