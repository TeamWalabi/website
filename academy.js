// WALABI Academy functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only load header/footer if we're on the academy page
    if (window.location.pathname.includes('academy.html')) {
        loadHeaderFooter();
    }
    
    setupAcademyTabs();
    setupAcademyLanguage();
    
    // Check for stored language preference
    const storedLang = localStorage.getItem('walabi-language');
    if (storedLang) {
        switchAcademyLanguage(storedLang);
    }
});

// Load header and footer
function loadHeaderFooter() {
    // Load header
    fetch('./header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
            setupHeaderNavigation();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback header
            document.getElementById('header-container').innerHTML = createFallbackHeader();
        });
    
    // Load footer
    fetch('./footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback footer
            document.getElementById('footer-container').innerHTML = createFallbackFooter();
        });
}

// Setup header navigation for academy page
function setupHeaderNavigation() {
    // Handle theme dropdown navigation
    const themeLinks = document.querySelectorAll('[href^="#theme"]');
    themeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to homepage with theme anchor
            window.location.href = './index.html' + this.getAttribute('href');
        });
    });
    
    // Handle other navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#about-section' || href === '#themes-section' || 
                href === '#services-section' || href === '#track-record-section') {
                // Redirect to homepage with anchor
                window.location.href = './index.html' + href;
            }
        });
    });
    
    // Handle language switching in header
    const langButtons = document.querySelectorAll('.language-switch button');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.textContent.toLowerCase();
            switchLanguage(lang);
            
            // Update header language buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Create fallback header if loading fails
function createFallbackHeader() {
    return `
        <header class="header">
            <nav class="navbar">
                <div class="nav-brand">
                    <a href="./index.html">
                        <img src="./images/Walabi-logo_large.png" alt="WALABI Logo" class="logo">
                    </a>
                </div>
                <ul class="nav-menu">
                    <li><a href="./index.html#about-section">About</a></li>
                    <li><a href="./index.html#themes-section">Themes</a></li>
                    <li><a href="./index.html#services-section">Services</a></li>
                    <li><a href="./academy.html">Academy</a></li>
                    <li><a href="./index.html#contact-section">Contact</a></li>
                </ul>
            </nav>
        </header>
    `;
}

// Create fallback footer if loading fails
function createFallbackFooter() {
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <p>Email: <a href="mailto:walabi.wser@wur.nl">walabi.wser@wur.nl</a></p>
                    </div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="./index.html#about-section">About</a></li>
                            <li><a href="./index.html#themes-section">Themes</a></li>
                            <li><a href="./index.html#services-section">Services</a></li>
                            <li><a href="./academy.html">Academy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// Setup tab functionality
function setupAcademyTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const themePanels = document.querySelectorAll('.theme-panel');
    
    console.log('Setting up academy tabs, found buttons:', tabButtons.length);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTheme = this.getAttribute('data-theme');
            console.log('Tab clicked:', targetTheme);
            
            // Remove active class from all tabs and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            themePanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(targetTheme);
            if (targetPanel) {
                targetPanel.classList.add('active');
                console.log('Panel activated:', targetTheme);
            } else {
                console.error('Panel not found for theme:', targetTheme);
            }
        });
    });
    
    // Initialize first tab as active
    const firstTab = document.querySelector('.tab-btn.active');
    if (firstTab) {
        const firstTheme = firstTab.getAttribute('data-theme');
        const firstPanel = document.getElementById(firstTheme);
        if (firstPanel) {
            firstPanel.classList.add('active');
            console.log('Initial panel activated:', firstTheme);
        }
    }
}

// Setup academy language switching
function setupAcademyLanguage() {
    // Listen for language changes from main script
    window.addEventListener('languageChanged', function(e) {
        switchAcademyLanguage(e.detail.language);
    });
}

// Switch academy language
function switchAcademyLanguage(lang) {
    console.log('Switching academy language to:', lang);
    
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
    
    // Update tab buttons language
    const tabButtonsEn = document.getElementById('tab-buttons-en');
    const tabButtonsNl = document.getElementById('tab-buttons-nl');
    
    if (lang === 'nl') {
        if (tabButtonsEn) tabButtonsEn.classList.add('hidden');
        if (tabButtonsNl) tabButtonsNl.classList.remove('hidden');
    } else {
        if (tabButtonsEn) tabButtonsEn.classList.remove('hidden');
        if (tabButtonsNl) tabButtonsNl.classList.add('hidden');
    }
    
    // Update active tab and ensure proper panel is shown
    updateActiveTab(lang);
    
    // Re-setup tabs after language change
    setTimeout(() => {
        setupAcademyTabs();
    }, 100);
}

// Update active tab based on language
function updateActiveTab(lang) {
    console.log('Updating active tab for language:', lang);
    
    // Find the currently visible tab buttons container
    const visibleTabButtons = lang === 'nl' ? 
        document.getElementById('tab-buttons-nl') : 
        document.getElementById('tab-buttons-en');
    
    if (!visibleTabButtons) {
        console.error('Visible tab buttons container not found for language:', lang);
        return;
    }
    
    // Find the first tab in the visible container and make it active
    const firstVisibleTab = visibleTabButtons.querySelector('.tab-btn');
    if (firstVisibleTab) {
        // Remove active from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add active to first visible tab
        firstVisibleTab.classList.add('active');
        
        // Show corresponding panel
        const targetTheme = firstVisibleTab.getAttribute('data-theme');
        const targetPanel = document.getElementById(targetTheme);
        
        if (targetPanel) {
            // Hide all panels
            document.querySelectorAll('.theme-panel').forEach(panel => panel.classList.remove('active'));
            // Show target panel
            targetPanel.classList.add('active');
            console.log('Updated active tab to:', targetTheme);
        }
    }
}

// Video player functionality (placeholder for future implementation)
function playVideo(videoId) {
    console.log('Playing video:', videoId);
    // Future implementation for video player
    // This could integrate with YouTube, Vimeo, or custom video player
}

// Download functionality (placeholder for future implementation)
function downloadResource(resourceId) {
    console.log('Downloading resource:', resourceId);
    // Future implementation for file downloads
    // This could handle authentication and file serving
}

// Search functionality (placeholder for future implementation)
function searchAcademy(query) {
    console.log('Searching academy for:', query);
    // Future implementation for search functionality
    // This could search through video titles, descriptions, and resource content
}

// Filter by difficulty level
function filterByLevel(level) {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const levelSpan = card.querySelector('.level');
        if (level === 'all' || levelSpan.textContent.toLowerCase() === level.toLowerCase()) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter by content type
function filterByType(type) {
    const videoCards = document.querySelectorAll('.video-card');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    if (type === 'all') {
        videoCards.forEach(card => card.style.display = 'block');
        resourceCards.forEach(card => card.style.display = 'block');
    } else if (type === 'videos') {
        videoCards.forEach(card => card.style.display = 'block');
        resourceCards.forEach(card => card.style.display = 'none');
    } else if (type === 'resources') {
        videoCards.forEach(card => card.style.display = 'none');
        resourceCards.forEach(card => card.style.display = 'block');
    }
}

// Progress tracking (placeholder for future implementation)
function trackProgress(userId, contentId, progress) {
    console.log('Tracking progress:', { userId, contentId, progress });
    // Future implementation for learning progress tracking
    // This could integrate with a learning management system
}

// Export functions to global scope for potential external use
window.WALABIAcademy = {
    playVideo,
    downloadResource,
    searchAcademy,
    filterByLevel,
    filterByType,
    trackProgress,
    switchLanguage: switchAcademyLanguage
};
