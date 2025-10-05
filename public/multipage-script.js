// Sidebar interactive toggle
document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.getElementById('sidebar');
    var sidebarToggle = document.getElementById('sidebar-toggle');
    var sidebarToggleIcon = document.getElementById('sidebar-toggle-icon');
    var mainContent = document.querySelector('.main-content.with-sidebar');
    if (sidebar && sidebarToggle && sidebarToggleIcon && mainContent) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
            if (sidebar.classList.contains('collapsed')) {
                sidebarToggleIcon.className = 'fas fa-angle-double-right';
            } else {
                sidebarToggleIcon.className = 'fas fa-angle-double-left';
            }
        });
    }
});
// Sidebar dropdown toggle
document.addEventListener('DOMContentLoaded', function() {
    var sidebarDropdown = document.querySelector('.sidebar-dropdown');
    if (sidebarDropdown) {
        var toggleBtn = sidebarDropdown.querySelector('.dropdown-toggle');
        var dropdownContent = sidebarDropdown.querySelector('.sidebar-dropdown-content');
        toggleBtn.addEventListener('click', function() {
            sidebarDropdown.classList.toggle('open');
        });
        // Optional: close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebarDropdown.contains(e.target)) {
                sidebarDropdown.classList.remove('open');
            }
        });
    }
});
/**
 * Multi-Page Kochi Metro Rail Management System
 * Simplified JavaScript for multi-page navigation
 * Author: Metro Rail Development Team
 * Version: 2.0.0
 */

'use strict';

// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let slideInterval;

// ===== APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    try {
        // Core functionality
        initializeSlideshow();
        initializeNavigation();
        initializeModals();
        initializeNotifications();
        initializeThemeToggle();
    initializeInteractiveBackground();
        initializeLiveMap();
        initializeTrainOperations();
        initializeVerifyOperations();
        
        // Update time if element exists
        updateCurrentTime();
        setInterval(updateCurrentTime, 60000);
        
        console.log('Kochi Metro Management System initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
        showErrorMessage('Failed to initialize application. Please refresh the page.');
    }
}

// ===== SLIDESHOW FUNCTIONALITY =====
/**
 * Initialize hero slideshow (only on dashboard)
 */
function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    if (slides.length === 0) return; // Not on dashboard page
    
    // Auto-rotate slides
    slideInterval = setInterval(nextSlide, 6000);
    
    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Pause on hover
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', pauseSlideshow);
        slideshowContainer.addEventListener('mouseleave', resumeSlideshow);
    }
    
    // Touch support
    initializeTouchSupport(slideshowContainer);
}

function initializeTouchSupport(container) {
    if (!container) return;
    
    let startX = 0;
    let endX = 0;
    
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;
        const minSwipeDistance = 50;
        
        if (Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }, { passive: true });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (!slides || slides.length === 0) return;
    
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlideshow();
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    if (!slides || slides.length === 0) return;
    
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlideshow();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (!slides || slides.length === 0 || index < 0 || index >= slides.length) return;
    
    currentSlide = index;
    updateSlideshow();
}

function updateSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides || slides.length === 0) return;
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    if (dots && dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

function pauseSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function resumeSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, 6000);
}

// ===== NAVIGATION FUNCTIONALITY =====
/**
 * Initialize navigation
 */
function initializeNavigation() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('show');
            mobileNav.classList.toggle('show');
            mobileMenuToggle.setAttribute('aria-expanded', !isOpen);
            
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.className = mobileNav.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
            }
        });
    }
    
    // Dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = toggle.closest('.nav-dropdown');
            const isOpen = dropdown.classList.contains('show');
            
            // Close all dropdowns
            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('show'));
            
            // Toggle current dropdown
            if (!isOpen) {
                dropdown.classList.add('show');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
        closeMobileMenu();
    });
    
    // Emergency button
    const emergencyBtn = document.getElementById('emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', showEmergencyContacts);
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    if (mobileNav) {
        mobileNav.classList.remove('show');
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
}

// ===== MODAL FUNCTIONALITY =====
/**
 * Initialize modals
 */
function initializeModals() {
    // Add Train Modal
    const addTrainBtn = document.getElementById('add-train-btn');
    const addTrainModal = document.getElementById('add-train-modal');
    const addTrainModalClose = document.getElementById('add-train-modal-close');
    const cancelAddTrain = document.getElementById('cancel-add-train');
    const submitTrain = document.getElementById('submit-train');
    
    if (addTrainBtn) addTrainBtn.addEventListener('click', () => showModal('add-train-modal'));
    if (addTrainModalClose) addTrainModalClose.addEventListener('click', () => hideModal('add-train-modal'));
    if (cancelAddTrain) cancelAddTrain.addEventListener('click', () => hideModal('add-train-modal'));
    
    if (submitTrain) {
        submitTrain.addEventListener('click', () => {
            const trainId = document.getElementById('train-id')?.value;
            const trainDriver = document.getElementById('train-driver')?.value;
            const trainRoute = document.getElementById('train-route')?.value;
            
            if (trainId && trainDriver && trainRoute) {
                hideModal('add-train-modal');
                showSuccessMessage(`Train ${trainId} added successfully!`);
                const form = document.getElementById('add-train-form');
                if (form) form.reset();
            } else {
                showErrorMessage('Please fill in all required fields.');
            }
        });
    }
    
    // Verification Modal
    const verificationModal = document.getElementById('verification-modal');
    const verificationModalClose = document.getElementById('verification-modal-close');
    const cancelVerification = document.getElementById('cancel-verification');
    const confirmVerification = document.getElementById('confirm-verification');
    
    if (verificationModalClose) verificationModalClose.addEventListener('click', () => hideModal('verification-modal'));
    if (cancelVerification) cancelVerification.addEventListener('click', () => hideModal('verification-modal'));
    
    if (confirmVerification) {
        confirmVerification.addEventListener('click', () => {
            hideModal('verification-modal');
            showSuccessMessage('Operations verified successfully!');
        });
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target.id);
        }
    });
    
    // Close modals with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                hideModal(openModal.id);
            }
        }
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        const focusableElements = modal.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// ===== NOTIFICATION FUNCTIONALITY =====
/**
 * Initialize notifications
 */
function initializeNotifications() {
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = notificationDropdown.classList.contains('show');
            
            // Close profile dropdown
            if (profileDropdown) profileDropdown.classList.remove('show');
            if (profileBtn) profileBtn.classList.remove('active');
            
            // Toggle notification dropdown
            if (!isOpen) {
                notificationDropdown.classList.add('show');
                notificationBtn.setAttribute('aria-expanded', 'true');
            } else {
                notificationDropdown.classList.remove('show');
                notificationBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = profileDropdown.classList.contains('show');
            
            // Close notification dropdown
            if (notificationDropdown) notificationDropdown.classList.remove('show');
            if (notificationBtn) notificationBtn.setAttribute('aria-expanded', 'false');
            
            // Toggle profile dropdown
            if (!isOpen) {
                profileDropdown.classList.add('show');
                profileBtn.classList.add('active');
                profileBtn.setAttribute('aria-expanded', 'true');
            } else {
                profileDropdown.classList.remove('show');
                profileBtn.classList.remove('active');
                profileBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Logout functionality
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        if (notificationDropdown) {
            notificationDropdown.classList.remove('show');
            if (notificationBtn) notificationBtn.setAttribute('aria-expanded', 'false');
        }
        if (profileDropdown) {
            profileDropdown.classList.remove('show');
            if (profileBtn) {
                profileBtn.classList.remove('active');
                profileBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.clear();
        sessionStorage.clear();
        showSuccessMessage('Logged out successfully');
        setTimeout(() => {
        window.location.href = 'index.html';
        }, 1500);
    }
}

// ===== THEME TOGGLE FUNCTIONALITY =====
/**
 * Initialize theme toggle
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // ✅ Always start with light theme unless user previously switched
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
}


function setTheme(theme) {
    const themeIcon = document.getElementById('theme-icon');
    const themeToggle = document.getElementById('theme-toggle');
    
    document.documentElement.setAttribute('data-theme', theme);
    
    if (themeIcon && themeToggle) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon theme-icon';
            themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            themeIcon.className = 'fas fa-sun theme-icon';
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    }
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#1e293b' : '#2563eb');
    }
    
    localStorage.setItem('theme', theme);
    // Notify other modules about theme change
    try {
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    } catch (e) {
        // no-op if CustomEvent not supported
    }
}

// ===== INTERACTIVE BACKGROUND =====
/**
 * Initialize a full-viewport canvas that renders a subtle particle field.
 * The visuals adapt to the current theme (dark/light). It is interactive
 * on pointer move and respects prefers-reduced-motion.
 */
function initializeInteractiveBackground() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const existing = document.querySelector('.interactive-bg');
    if (existing) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'interactive-bg';
    const canvas = document.createElement('canvas');
    canvas.className = 'interactive-canvas';
    wrapper.appendChild(canvas);
    // Insert as first child so header/main remain visually above (z-index in CSS)
    document.body.insertBefore(wrapper, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let animationId = null;
    let pointer = { x: -9999, y: -9999 };
    let theme = document.documentElement.getAttribute('data-theme') || 'light';

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        const area = width * height;
        const base = Math.max(30, Math.min(120, Math.floor(area / 10000)));
        createParticles(base);
    }

    function createParticles(count) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                r: Math.random() * 1.8 + 0.8
            });
        }
    }

    function getColorsForTheme(t) {
        if (t === 'dark') {
            return { particle: 'rgba(180,220,255,0.9)', line: 'rgba(120,180,255,0.12)', bg: 'transparent' };
        }
        // light theme: subtle gray particles
        return { particle: 'rgba(30,41,59,0.12)', line: 'rgba(30,41,59,0.06)', bg: 'transparent' };
    }

    function step() {
        ctx.clearRect(0, 0, width, height);
        const colors = getColorsForTheme(theme);

        // draw lines
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.strokeStyle = colors.line;
                    ctx.lineWidth = 1 * (1 - dist / 120) * 0.9;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }

        // draw particles and update
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            // interaction with pointer
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (1 - dist / 120) * 0.6;
                p.vx += (dx / dist) * force * 0.08;
                p.vy += (dy / dist) * force * 0.08;
            }

            p.x += p.vx;
            p.y += p.vy;

            // wrap
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            ctx.fillStyle = getColorsForTheme(theme).particle;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }

        animationId = requestAnimationFrame(step);
    }

    function onPointerMove(e) {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
    }

    function onPointerLeave() {
        pointer.x = -9999;
        pointer.y = -9999;
    }

    function applyTheme(t) {
        theme = t;
        // colors will adapt on next frame
    }

    // Initialize
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(animationId);
        else animationId = requestAnimationFrame(step);
    });

    // Observe theme changes
    document.addEventListener('themechange', (ev) => {
        if (ev && ev.detail && ev.detail.theme) applyTheme(ev.detail.theme);
    });

    // Start animation
    animationId = requestAnimationFrame(step);
}

// ===== TRAIN OPERATIONS FUNCTIONALITY =====
/**
 * Initialize train operations (only on train operations page)
 */
function initializeTrainOperations() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const trainSearch = document.getElementById('train-search');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterTrains(filter);
        });
    });
    
    if (trainSearch) {
        trainSearch.addEventListener('input', debounce((e) => {
            searchTrains(e.target.value);
        }, 300));
    }
}

function filterTrains(filter) {
    const trainItems = document.querySelectorAll('.train-item');
    
    trainItems.forEach(item => {
        const status = item.getAttribute('data-status');
        const shouldShow = filter === 'all' || status === filter;
        
        item.style.display = shouldShow ? 'flex' : 'none';
    });
}

function searchTrains(searchTerm) {
    const trainItems = document.querySelectorAll('.train-item');
    const term = searchTerm.toLowerCase().trim();
    
    trainItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const shouldShow = !term || text.includes(term);
        
        item.style.display = shouldShow ? 'flex' : 'none';
    });
}

// ===== VERIFY OPERATIONS FUNCTIONALITY =====
/**
 * Initialize verification operations
 */
function initializeVerifyOperations() {
    const verifyBtns = document.querySelectorAll('.btn-verify');
    
    verifyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const trainId = btn.getAttribute('data-train');
            showVerificationModal(trainId);
        });
    });
}

function showVerificationModal(trainId) {
    const verifyTrainId = document.getElementById('verify-train-id');
    if (verifyTrainId) {
        verifyTrainId.textContent = trainId;
    }
    showModal('verification-modal');
}

// ===== LIVE MAP FUNCTIONALITY =====
/**
 * Initialize live map (only on live map page)
 */
function initializeLiveMap() {
    const stations = document.querySelectorAll('.station');
    
    stations.forEach(station => {
        station.addEventListener('click', () => {
            const stationName = station.getAttribute('data-station');
            showStationDetails(stationName);
            
            stations.forEach(s => s.classList.remove('active'));
            station.classList.add('active');
        });
    });
}

function showStationDetails(stationName) {
    const stationDetails = document.getElementById('station-details');
    const noSelection = stationDetails?.querySelector('.no-selection');
    const stationInfo = stationDetails?.querySelector('.station-info');
    const selectedStationName = document.getElementById('selected-station-name');
    
    if (noSelection) noSelection.style.display = 'none';
    if (stationInfo) stationInfo.style.display = 'block';
    if (selectedStationName) selectedStationName.textContent = stationName;
    
    const stationOfficers = document.getElementById('station-officers');
    const stationTrains = document.getElementById('station-trains');
    
    if (stationOfficers) stationOfficers.textContent = Math.floor(Math.random() * 5) + 2;
    if (stationTrains) stationTrains.textContent = Math.floor(Math.random() * 30) + 15;
}

// ===== UTILITY FUNCTIONS =====
/**
 * Update current time display
 */
function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        timeElement.textContent = now.toLocaleDateString('en-IN', options);
    }
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    showToast(message, 'success');
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    showToast(message, 'error');
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1100;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.875rem;
        font-weight: 500;
    `;
    
    if (window.innerWidth <= 576) {
        toast.style.cssText += `
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
            transform: translateY(-100%);
        `;
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (window.innerWidth <= 576) {
            toast.style.transform = 'translateY(0)';
        } else {
            toast.style.transform = 'translateX(0)';
        }
    }, 100);
    
    setTimeout(() => {
        if (window.innerWidth <= 576) {
            toast.style.transform = 'translateY(-100%)';
        } else {
            toast.style.transform = 'translateX(100%)';
        }
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

/**
 * Emergency contacts function
 */
function showEmergencyContacts() {
    const emergencyInfo = `
Emergency Contacts:

Control Room: +91 484 400 6000
Fire Department: 101
Police: 100
Medical Emergency: 108
Station Master: +91 484 400 6001
Security: +91 484 400 6002

For immediate assistance, contact the Control Room.
    `;
    
    alert(emergencyInfo);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showErrorMessage('An unexpected error occurred. Please try again.');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showErrorMessage('A network error occurred. Please check your connection.');
});













    // Define the base URL for your deployed API
    const API_BASE_URL = "https://operation1.onrender.com";

    // ---------------------
    // Status Chart
    // ---------------------
    async function loadStatusChart() {
        try {
            const canvas = document.getElementById("statusChart");
            if (!canvas) return;
            const ctx = canvas.getContext("2d");

            // Use the live API URL
            const res = await fetch(`${API_BASE_URL}/api/rules`);
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();

            const eligible = data.filter(r => r.status === "Eligible").length;
            const blocked = data.filter(r => r.status !== "Eligible").length;

            if (window.statusChartInstance) window.statusChartInstance.destroy();

            window.statusChartInstance = new Chart(ctx, {
                type: "pie",
                data: { labels: ["Eligible", "Blocked"], datasets: [{ data: [eligible, blocked], backgroundColor: ["#28a745", "#dc3545"] }] },
                options: { responsive: false, maintainAspectRatio: false }
            });
        } catch (err) {
            console.error("Failed to load Status chart:", err);
        }
    }

    function downloadStatusReport() {
        // Use the live API URL for the PDF report
        window.open(`${API_BASE_URL}/api/report/status-pdf`, "_blank");
    }

    // ---------------------
    // What-If Chart
    // ---------------------
    async function loadWhatIfChart() {
        try {
            const canvas = document.getElementById("whatifChart");
            if (!canvas) return;
            const ctx = canvas.getContext("2d");

            // Use the live API URL
            const defaultsRes = await fetch(`${API_BASE_URL}/api/whatif/defaults`);
            const defaults = await defaultsRes.json();

            const k = document.getElementById("whatifK")?.value ? Number(document.getElementById("whatifK").value) : defaults.k;
            const branding_weight = document.getElementById("brandingWeight")?.value ? Number(document.getElementById("brandingWeight").value) : defaults.branding_weight;
            const stabling_weight = document.getElementById("stablingWeight")?.value ? Number(document.getElementById("stablingWeight").value) : defaults.stabling_weight;

            // Use the live API URL
            const res = await fetch(`${API_BASE_URL}/api/whatif?k=${k}&branding_weight=${branding_weight}&stabling_weight=${stabling_weight}`, { method: "POST" });
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();

            const beforeScores = data.map(r => r.mileage);
            const afterScores = data.map(r => r.score);

            if (window.whatIfChartInstance) window.whatIfChartInstance.destroy();

            window.whatIfChartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: data.map(r => r.id),
                    datasets: [
                        { label: "Before (Mileage)", data: beforeScores, backgroundColor: "#007bff" },
                        { label: "After (Score)", data: afterScores, backgroundColor: "#28a745" }
                    ]
                },
                options: { responsive: false, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
            });
        } catch (err) {
            console.error("Failed to load What-If chart:", err);
        }
    }

    function downloadWhatIfReport() {
        const k = document.getElementById("whatifK")?.value ? Number(document.getElementById("whatifK").value) : 3;
        const branding_weight = document.getElementById("brandingWeight")?.value ? Number(document.getElementById("brandingWeight").value) : 2000;
        const stabling_weight = document.getElementById("stablingWeight")?.value ? Number(document.getElementById("stablingWeight").value) : 5;

        // Use the live API URL for the PDF report
        const url = `${API_BASE_URL}/api/report/whatif-pdf?k=${k}&branding_weight=${branding_weight}&stabling_weight=${stabling_weight}`;
        window.open(url, "_blank");
    }

    // ---------------------
    // Alerts Distribution Chart
    // ---------------------
    async function loadAlertsChart() {
        try {
            const canvas = document.getElementById("alertsChart");
            if (!canvas) return;
            const ctx = canvas.getContext("2d");

            // Use the live API URL
            const res = await fetch(`${API_BASE_URL}/api/rules`);
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();

            const alertCounts = {};
            data.forEach(row => {
                if (row.alerts && row.alerts !== "-") {
                    row.alerts.split(",").forEach(alert => {
                        alertCounts[alert.trim()] = (alertCounts[alert.trim()] || 0) + 1;
                    });
                }
            });

            if (window.alertsChartInstance) window.alertsChartInstance.destroy();

            window.alertsChartInstance = new Chart(ctx, {
                type: "bar",
                data: { labels: Object.keys(alertCounts), datasets: [{ label: "Number of Trains", data: Object.values(alertCounts), backgroundColor: "#ffc107" }] },
                options: { responsive: false, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
            });
        } catch (err) {
            console.error("Failed to load Alerts chart:", err);
        }
    }

    function downloadAlertsReport() {
        // Use the live API URL for the PDF report
        window.open(`${API_BASE_URL}/api/report/alerts-pdf`, "_blank");
    }

    // ---------------------
    // Auto-load charts on page load
    // ---------------------
    window.onload = () => {
        loadStatusChart();
        loadWhatIfChart();
        loadAlertsChart();
    };
