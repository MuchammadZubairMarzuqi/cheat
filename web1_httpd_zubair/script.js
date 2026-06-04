/**
 * Personal Portfolio - Main JavaScript
 * =====================================
 */

// Initialize particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}

/**
 * Switch between tabs
 * @param {string} tabId - The ID of the tab to activate
 */
function switchTab(tabId) {
    // Update active tab button
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabId) {
            tab.classList.add('active');
        }
    });

    // Update active content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
            
            // Animate skill bars if skills tab
            if (tabId === 'skills') {
                setTimeout(animateSkillBars, 100);
            }
            
            // Animate reveal elements
            setTimeout(observeRevealElements, 100);
        }
    });
}

/**
 * Animate skill progress bars
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.dataset.progress;
        bar.style.transform = `scaleX(${progress / 100})`;
        bar.classList.add('animate');
    });
}

/**
 * Observe and animate reveal elements
 */
function observeRevealElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
    });
}

/**
 * Initialize tab click handlers
 */
function initTabHandlers() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
}

/**
 * Initialize keyboard navigation for tabs
 */
function initKeyboardNav() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                const nextTab = navTabs[(index + 1) % navTabs.length];
                nextTab.focus();
                switchTab(nextTab.dataset.tab);
            } else if (e.key === 'ArrowLeft') {
                const prevTab = navTabs[(index - 1 + navTabs.length) % navTabs.length];
                prevTab.focus();
                switchTab(prevTab.dataset.tab);
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchTab(tab.dataset.tab);
            }
        });
    });
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Initialize the application
 */
function init() {
    createParticles();
    initTabHandlers();
    initKeyboardNav();
    initSmoothScroll();
    observeRevealElements();
    
    // Animate skill bars on initial load if skills tab is active
    const skillsTab = document.querySelector('#skills.tab-content.active');
    if (skillsTab) {
        setTimeout(animateSkillBars, 500);
    }
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Expose switchTab to global scope for onclick handlers
window.switchTab = switchTab;