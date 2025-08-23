// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupTabSwitching();
    setupFormValidation();
    setupPasswordStrength();
    setupSocialLogin();
    setupPhoneValidation();
    initializeGoogleOAuth();
});

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = '958075348409-9q8cm6daqu2uva9oq8jmt7nnssls88v2.apps.googleusercontent.com; // Replace with your actual client ID

// Initialize Google OAuth
function initializeGoogleOAuth() {
    // Check if Google API is loaded
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleSignIn,
            auto_select: false,
            cancel_on_tap_outside: true
        });
    } else {
        console.warn('Google OAuth API not loaded. Using demo mode.');
    }
}

// Handle Google Sign-In response
function handleGoogleSignIn(response) {
    try {
        // Decode the JWT token to get user information
        const userInfo = parseJwt(response.credential);
        
        // Create user data object
        const userData = {
            id: userInfo.sub,
            email: userInfo.email,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
            fullName: userInfo.name,
            picture: userInfo.picture,
            isLoggedIn: true,
            loginMethod: 'google',
            sessionId: generateSessionId(),
            loginTime: new Date().toISOString()
        };
        
        // Store user session
        localStorage.setItem('userSession', JSON.stringify(userData));
        
        // Show success message
        const greeting = getTimeBasedGreeting();
        showNotification(`${greeting}, ${userData.firstName}! Welcome to IT Connect.`, 'success');
        
        // Redirect to profile or home page
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 2000);
        
    } catch (error) {
        console.error('Google Sign-In error:', error);
        showNotification('Google Sign-In failed. Please try again.', 'error');
    }
}

// Parse JWT token
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT token:', error);
        return null;
    }
}

// Generate session ID
function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Get time-based greeting
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

function setupFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(this);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration(this);
        });
    }
}

function handleLogin(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.email || !data.password) {
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
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitButton.disabled = true;

    // Simulate database authentication delay
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Authenticate with database
        const authResult = window.ITConnectDB.authenticateUser(data.email, data.password);
        
        if (authResult.success) {
            // Store user session data
            const userData = {
                ...authResult.user,
                sessionId: authResult.session.sessionId,
                loginTime: authResult.session.loginTime,
                isLoggedIn: true
            };
            
            // Store in localStorage
            localStorage.setItem('userSession', JSON.stringify(userData));
            
            // Show success message with personalized greeting
            const greeting = getTimeBasedGreeting();
            showNotification(`${greeting}, ${authResult.user.firstName}! Welcome back.`, 'success');
            
            // Show role-specific message
            if (authResult.user.role === 'admin') {
                setTimeout(() => {
                    showNotification('Admin access granted. You have full system privileges.', 'info');
                }, 1000);
            } else if (authResult.user.role === 'technician') {
                setTimeout(() => {
                    showNotification('Technician access granted. Service dashboard available.', 'info');
                }, 1000);
            }
            
            // Redirect to appropriate page based on role
            setTimeout(() => {
                if (authResult.user.role === 'admin') {
                    // In a real system, this would go to admin dashboard
                    window.location.href = 'profile.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 2000);
        } else {
            // Show error message
            showNotification(authResult.message || 'Invalid email or password.', 'error');
            
            // Shake the form for visual feedback
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }

    }, 1500); // Reduced delay for better UX
}

function handleRegistration(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.password || !data.confirmPassword) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
        showNotification('Please enter a valid phone number.', 'error');
        return;
    }

    // Password validation
    if (data.password.length < 8) {
        showNotification('Password must be at least 8 characters long.', 'error');
        return;
    }

    if (data.password !== data.confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }

    if (!data.terms) {
        showNotification('Please accept the Terms of Service and Privacy Policy.', 'error');
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitButton.disabled = true;

    // Simulate registration process
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Register with database
        const registrationResult = window.ITConnectDB.registerUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: data.password
        });
        
        if (registrationResult.success) {
            // Show success message
            showNotification(`Welcome ${data.firstName}! Account created successfully.`, 'success');
            
            // Pre-fill login form with new credentials
            setTimeout(() => {
                document.querySelector('.tab-btn[data-tab="login"]').click();
                document.getElementById('loginEmail').value = data.email;
                showNotification('You can now login with your new account!', 'info');
            }, 2000);
        } else {
            // Show error message
            showNotification(registrationResult.message, 'error');
            
            // Shake the form for visual feedback
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }

    }, 2000);
}

function setupPasswordStrength() {
    const passwordInput = document.getElementById('registerPassword');
    if (!passwordInput) return;

    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');

        if (!strengthBar || !strengthText) return;

        const strength = calculatePasswordStrength(password);
        
        // Update strength bar
        strengthBar.style.width = strength.percentage + '%';
        strengthBar.className = 'strength-fill ' + strength.class;
        
        // Update strength text
        strengthText.textContent = strength.text;
        strengthText.className = 'strength-text ' + strength.class;
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];

    if (password.length === 0) {
        return { percentage: 0, class: '', text: 'Password strength' };
    }

    // Length check
    if (password.length >= 8) score += 25;
    else feedback.push('at least 8 characters');

    // Lowercase check
    if (/[a-z]/.test(password)) score += 25;
    else feedback.push('lowercase letters');

    // Uppercase check
    if (/[A-Z]/.test(password)) score += 25;
    else feedback.push('uppercase letters');

    // Number or special character check
    if (/[\d\W]/.test(password)) score += 25;
    else feedback.push('numbers or symbols');

    // Determine strength level
    let strengthClass, strengthText;
    
    if (score < 50) {
        strengthClass = 'weak';
        strengthText = 'Weak - Add ' + feedback.slice(0, 2).join(', ');
    } else if (score < 75) {
        strengthClass = 'medium';
        strengthText = 'Medium - Add ' + feedback.join(', ');
    } else if (score < 100) {
        strengthClass = 'good';
        strengthText = 'Good - Add ' + feedback.join(', ');
    } else {
        strengthClass = 'strong';
        strengthText = 'Strong password';
    }

    return {
        percentage: score,
        class: strengthClass,
        text: strengthText
    };
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.password-toggle');
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function setupSocialLogin() {
    const socialButtons = document.querySelectorAll('.btn-social');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isGoogle = this.classList.contains('btn-google');
            const provider = isGoogle ? 'Google' : 'Facebook';
            
            if (isGoogle) {
                // Handle Google OAuth
                handleGoogleLogin(this);
            } else {
                // Handle Facebook (still demo mode)
                handleFacebookLogin(this, provider);
            }
        });
    });
}

function handleGoogleLogin(button) {
    // Show loading state
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    button.disabled = true;
    
    // Check if Google API is available
    if (typeof google !== 'undefined' && google.accounts) {
        try {
            // Trigger Google Sign-In
            google.accounts.id.prompt((notification) => {
                // Reset button state
                button.innerHTML = originalText;
                button.disabled = false;
                
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    // If prompt is not displayed, show manual sign-in
                    showGoogleSignInButton();
                }
            });
        } catch (error) {
            console.error('Google Sign-In error:', error);
            button.innerHTML = originalText;
            button.disabled = false;
            showNotification('Google Sign-In is not available. Please check your internet connection.', 'error');
        }
    } else {
        // Fallback to demo mode if Google API is not loaded
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            showDemoModeMessage('Google');
        }, 1500);
    }
}

function handleFacebookLogin(button, provider) {
    // Show loading state
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    button.disabled = true;

    // Simulate Facebook login (demo mode)
    setTimeout(() => {
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;

        // Show enhanced demo mode message
        showDemoModeMessage(provider);
    }, 1500);
}

function showGoogleSignInButton() {
    // Create a temporary Google Sign-In button
    const tempDiv = document.createElement('div');
    tempDiv.id = 'temp-google-signin';
    tempDiv.style.position = 'fixed';
    tempDiv.style.top = '50%';
    tempDiv.style.left = '50%';
    tempDiv.style.transform = 'translate(-50%, -50%)';
    tempDiv.style.zIndex = '10000';
    tempDiv.style.background = 'white';
    tempDiv.style.padding = '20px';
    tempDiv.style.borderRadius = '8px';
    tempDiv.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    
    document.body.appendChild(tempDiv);
    
    // Render Google Sign-In button
    google.accounts.id.renderButton(tempDiv, {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular'
    });
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '5px';
    closeBtn.style.right = '10px';
    closeBtn.style.border = 'none';
    closeBtn.style.background = 'none';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => tempDiv.remove();
    
    tempDiv.appendChild(closeBtn);
    
    // Auto-remove after 30 seconds
    setTimeout(() => {
        if (tempDiv.parentElement) {
            tempDiv.remove();
        }
    }, 30000);
}

// Enhanced demo mode message function
function showDemoModeMessage(provider) {
    // Create a more detailed message for demo mode
    const message = `${provider} login is not available in demo mode. Try demo credentials: demo@itconnect.com / demo123 (or press Ctrl+Shift+D to auto-fill)`;
    
    // Use the existing notification system but with longer duration
    showNotification(message, 'info');
    
    // Also create a custom detailed notification
    setTimeout(() => {
        showDetailedDemoNotification(provider);
    }, 100);
}

// Detailed demo notification with better formatting
function showDetailedDemoNotification(provider) {
    // Remove existing notifications first
    const existingNotifications = document.querySelectorAll('.demo-notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create detailed notification element
    const notification = document.createElement('div');
    notification.className = 'notification demo-notification info';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <div class="notification-message">
                <strong>${provider} login is not available in demo mode.</strong><br><br>
                <strong>Try the demo instead:</strong><br>
                • Email: <code>demo@itconnect.com</code><br>
                • Password: <code>demo123</code><br><br>
                <em>💡 Press Ctrl+Shift+D to auto-fill credentials</em>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 8 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 8000);
}

// Forgot password functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('forgot-password')) {
        e.preventDefault();
        
        const email = prompt('Please enter your email address:');
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                showNotification('Password reset instructions have been sent to your email.', 'success');
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        }
    }
});

// Real-time Phone Number Validation for Login Page
function setupPhoneValidation() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            validatePhoneNumber(this);
        });
        
        phoneInput.addEventListener('blur', function() {
            validatePhoneNumber(this);
        });
        
        // Helper function for time-based greetings
        function getTimeBasedGreeting() {
            const hour = new Date().getHours();
            if (hour < 12) return 'Good morning';
            if (hour < 17) return 'Good afternoon';
            return 'Good evening';
        }
        
        // Enhanced demo credentials display
        function showAllDemoCredentials() {
            const credentials = window.ITConnectDB.getDemoCredentials();
            let credentialsList = '<div class="demo-credentials-list"><h4>Available Demo Accounts:</h4>';
            
            credentials.forEach(cred => {
                credentialsList += `
                    <div class="demo-account" onclick="fillCredentials('${cred.email}', '${cred.password}')">
                        <strong>${cred.name}</strong> (${cred.role})<br>
                        <code>${cred.email}</code> / <code>${cred.password}</code>
                    </div>
                `;
            });
            
            credentialsList += '</div>';
            
            // Create and show modal
            const modal = document.createElement('div');
            modal.className = 'demo-modal';
            modal.innerHTML = `
                <div class="demo-modal-content">
                    <span class="demo-modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                    ${credentialsList}
                    <p><em>Click on any account to auto-fill the login form</em></p>
                </div>
            `;
            
            document.body.appendChild(modal);
        }
        
        // Fill credentials helper
        function fillCredentials(email, password) {
            document.getElementById('loginEmail').value = email;
            document.getElementById('loginPassword').value = password;
            document.querySelector('.demo-modal').remove();
            showNotification('Credentials filled! Click Sign In to login.', 'info');
        }
    }
}

function validatePhoneNumber(input) {
    const phoneValue = input.value.trim();
    const validationMessage = input.parentElement.parentElement.querySelector('.validation-message');
    
    if (!validationMessage) return;
    
    // Clear previous validation state
    input.classList.remove('valid', 'invalid', 'warning');
    validationMessage.classList.remove('show', 'error', 'success', 'warning');
    
    if (phoneValue === '') {
        // Empty field - no validation message
        return;
    }
    
    // Phone validation regex - supports various formats
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phoneValue.replace(/[\s\-\(\)]/g, '');
    
    if (cleanPhone.length < 10) {
        // Too short
        input.classList.add('warning');
        validationMessage.textContent = 'Phone number seems too short.';
        validationMessage.classList.add('show', 'warning');
    } else if (!phoneRegex.test(cleanPhone)) {
        // Invalid format
        input.classList.add('invalid');
        validationMessage.textContent = 'Please enter a valid phone number.';
        validationMessage.classList.add('show', 'error');
    } else if (cleanPhone.length > 15) {
        // Too long
        input.classList.add('invalid');
        validationMessage.textContent = 'Please enter a valid phone number.';
        validationMessage.classList.add('show', 'error');
    } else {
        // Valid
        input.classList.add('valid');
        validationMessage.textContent = 'Phone number looks good!';
        validationMessage.classList.add('show', 'success');
    }
}

// Auto-fill demo credentials (for testing purposes)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        const loginEmail = document.getElementById('loginEmail');
        const loginPassword = document.getElementById('loginPassword');
        
        if (loginEmail && loginPassword) {
            loginEmail.value = 'demo@itconnect.com';
            loginPassword.value = 'demo123';
            showNotification('Demo credentials filled!', 'info');
        }
    }
});