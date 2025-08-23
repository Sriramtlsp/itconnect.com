// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userSession = getUserSession();
    if (!userSession || !userSession.isLoggedIn) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }

    // Initialize profile page
    initializeProfile(userSession);
    setupProfileNavigation();
    setupProfileForm();
});

function initializeProfile(userData) {
    // Update user info in sidebar
    const userName = document.getElementById('profileUserName');
    const userEmail = document.getElementById('profileUserEmail');
    
    if (userName) {
        userName.textContent = userData.name || 'Demo User';
    }
    if (userEmail) {
        userEmail.textContent = userData.email || 'demo@itconnect.com';
    }

    // Update form fields with user data
    const firstNameField = document.getElementById('firstName');
    const emailField = document.getElementById('email');
    
    if (firstNameField && userData.name) {
        firstNameField.value = userData.name;
    }
    if (emailField && userData.email) {
        emailField.value = userData.email;
    }
}

function setupProfileNavigation() {
    const navItems = document.querySelectorAll('.profile-nav-item');
    const sections = document.querySelectorAll('.profile-section-content');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.dataset.section;
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding section
            this.classList.add('active');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Update URL hash
            window.location.hash = targetSection;
        });
    });

    // Handle initial hash navigation
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetNav = document.querySelector(`[data-section="${hash}"]`);
        if (targetNav) {
            targetNav.click();
        }
    }
}

function setupProfileForm() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate(this);
        });
    }
}

function handleProfileUpdate(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.firstName || !data.email) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
    submitButton.disabled = true;

    // Simulate profile update
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Update user session with new data
        const userSession = getUserSession();
        if (userSession) {
            userSession.name = data.firstName + (data.lastName ? ' ' + data.lastName : '');
            userSession.email = data.email;
            localStorage.setItem('userSession', JSON.stringify(userSession));
        }

        // Show success message
        showNotification('Profile updated successfully!', 'success');
        
        // Update the displayed name in sidebar
        const userName = document.getElementById('profileUserName');
        const userEmail = document.getElementById('profileUserEmail');
        if (userName) {
            userName.textContent = userSession.name;
        }
        if (userEmail) {
            userEmail.textContent = userSession.email;
        }

    }, 1500);
}

// Service history functionality
function viewServiceDetails(serviceId) {
    showNotification('Service details view coming soon!', 'info');
}

// Order tracking functionality
function trackOrder(orderId) {
    showNotification(`Tracking order ${orderId}. Real-time tracking coming soon!`, 'info');
}

// Settings functionality
function updateNotificationSettings() {
    const checkboxes = document.querySelectorAll('.settings-section input[type="checkbox"]');
    const settings = {};
    
    checkboxes.forEach((checkbox, index) => {
        settings[`notification_${index}`] = checkbox.checked;
    });
    
    // Save settings to localStorage
    localStorage.setItem('userNotificationSettings', JSON.stringify(settings));
    showNotification('Notification settings updated!', 'success');
}

// Auto-save notification settings when changed
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.closest('.settings-section')) {
        updateNotificationSettings();
    }
});

// Load saved notification settings
function loadNotificationSettings() {
    const savedSettings = localStorage.getItem('userNotificationSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        const checkboxes = document.querySelectorAll('.settings-section input[type="checkbox"]');
        
        checkboxes.forEach((checkbox, index) => {
            if (settings[`notification_${index}`] !== undefined) {
                checkbox.checked = settings[`notification_${index}`];
            }
        });
    }
}

// Initialize notification settings on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadNotificationSettings, 100);
});

// Export functions for use in other scripts
window.viewServiceDetails = viewServiceDetails;
window.trackOrder = trackOrder;
window.updateNotificationSettings = updateNotificationSettings;