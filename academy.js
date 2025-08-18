// WALABI Academy functionality
document.addEventListener('DOMContentLoaded', function() {
    setupAcademyTabs();
    setupAcademyLanguage();
    
    // Check for stored language preference
    const storedLang = localStorage.getItem('walabi-language');
    if (storedLang) {
        switchAcademyLanguage(storedLang);
    }
});

// Setup tab functionality
function setupAcademyTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const themePanels = document.querySelectorAll('.theme-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTheme = this.getAttribute('data-theme');
            
            // Remove active class from all tabs and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            themePanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(targetTheme);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
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
    const tabButtonsEn = document.querySelector('.tab-buttons');
    const tabButtonsNl = document.getElementById('tab-buttons-nl');
    
    if (lang === 'nl') {
        tabButtonsEn.classList.add('hidden');
        tabButtonsNl.classList.remove('hidden');
    } else {
        tabButtonsEn.classList.remove('hidden');
        tabButtonsNl.classList.add('hidden');
    }
    
    // Update active tab
    updateActiveTab(lang);
}

// Update active tab based on language
function updateActiveTab(lang) {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        const targetTheme = activeTab.getAttribute('data-theme');
        
        // Find corresponding tab in new language
        const newActiveTab = document.querySelector(`[data-theme="${targetTheme}"]:not(.hidden)`);
        if (newActiveTab) {
            // Remove active from all tabs
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            // Add active to new tab
            newActiveTab.classList.add('active');
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
