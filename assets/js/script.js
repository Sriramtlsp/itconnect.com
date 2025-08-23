// Mobile Navigation Toggle and User Session Management
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Initialize user session management
    initializeUserSession();
});

// User Session Management
function initializeUserSession() {
    const userSession = getUserSession();
    if (userSession && userSession.isLoggedIn) {
        updateHeaderForLoggedInUser(userSession);
    }
}

function getUserSession() {
    try {
        const sessionData = localStorage.getItem('userSession');
        return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
        console.error('Error parsing user session:', error);
        return null;
    }
}

function updateHeaderForLoggedInUser(userData) {
    const loginButton = document.querySelector('a[href="login.html"]');
    if (loginButton) {
        // Replace login button with user profile dropdown
        const userProfile = createUserProfileDropdown(userData);
        loginButton.parentElement.replaceChild(userProfile, loginButton);
    }
}

function createUserProfileDropdown(userData) {
    const profileContainer = document.createElement('div');
    profileContainer.className = 'user-profile-dropdown';
    profileContainer.innerHTML = `
        <button class="user-profile-btn btn btn-outline">
            <i class="fas fa-user-circle"></i> ${userData.name}
        </button>
        <div class="profile-dropdown-menu">
            <div class="profile-info">
                <div class="profile-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="profile-details">
                    <strong>${userData.name}</strong>
                    <span>${userData.email}</span>
                </div>
            </div>
            <div class="profile-menu-items">
                <a href="profile.html#profile" class="profile-menu-item">
                    <i class="fas fa-user"></i> My Profile
                </a>
                <a href="profile.html#service-history" class="profile-menu-item">
                    <i class="fas fa-history"></i> Service History
                </a>
                <a href="profile.html#orders" class="profile-menu-item">
                    <i class="fas fa-shopping-bag"></i> My Orders
                </a>
                <a href="profile.html#settings" class="profile-menu-item">
                    <i class="fas fa-cog"></i> Settings
                </a>
                <div class="profile-menu-divider"></div>
                <a href="#" class="profile-menu-item logout-btn" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        </div>
    `;
    
    // Add click event to toggle dropdown
    const profileBtn = profileContainer.querySelector('.user-profile-btn');
    const dropdownMenu = profileContainer.querySelector('.profile-dropdown-menu');
    
    profileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileContainer.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
    
    return profileContainer;
}

function handleLogout() {
    // Clear user session
    localStorage.removeItem('userSession');
    
    // Show logout message
    showNotification('You have been logged out successfully.', 'success');
    
    // Reload page to reset UI
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.phone || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Phone number validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
        showNotification('Please enter a valid phone number.', 'error');
        return;
    }
    
    // Email validation (if provided)
    if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset form
        this.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Thank you! Your message has been sent. We\'ll contact you within 2 hours.', 'success');
        
        // In a real implementation, you would send this data to your server
        console.log('Form data:', data);
        
        // Optional: Redirect to WhatsApp with pre-filled message
        const whatsappMessage = encodeURIComponent(
            `Hi IT Connect! I'm interested in ${data.service || 'laptop repair services'}. ${data.message}`
        );
        // window.open(`https://wa.me/1234567890?text=${whatsappMessage}`, '_blank');
        
    }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                border-radius: 8px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
            }
            
            .notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
            }
            
            .notification-info {
                background: linear-gradient(135deg, #3b82f6, #2563eb);
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 20px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                margin-left: auto;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Scroll Animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .stat-item');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .stat-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check
    handleScrollAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
});

// Click to Call Functionality
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone call click (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'contact',
                    'event_label': 'header_phone'
                });
            }
        });
    });
});

// WhatsApp Click Tracking
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track WhatsApp click (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'contact',
                    'event_label': 'whatsapp_button'
                });
            }
        });
    });
});

// Service Card Click Tracking
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            
            // Track service interest (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'service_interest', {
                    'event_category': 'services',
                    'event_label': serviceName
                });
            }
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Pre-fill service in contact form
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    const serviceValue = serviceName.toLowerCase().replace(/\s+/g, '-');
                    const option = serviceSelect.querySelector(`option[value*="${serviceValue}"]`);
                    if (option) {
                        serviceSelect.value = option.value;
                    }
                }
            }
        });
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    // Add styles
    const backToTopStyles = document.createElement('style');
    backToTopStyles.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(37, 99, 235, 0.4);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    
    document.head.appendChild(backToTopStyles);
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Performance Optimization: Debounce scroll events
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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    handleScrollAnimations();
}, 10));

// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active', 'prev'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Add prev class to previous slide for animation
        if (index > 0) {
            slides[index - 1].classList.add('prev');
        } else {
            slides[slides.length - 1].classList.add('prev');
        }

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto-slide
    startAutoSlide();

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
    });
});

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    // Always get fresh cart data from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function addToCart(product) {
    // Always get fresh cart data from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Update cart UI if function exists
    if (typeof window.updateCartUI === 'function') {
        window.updateCartUI();
    }
}

function removeFromCart(productId) {
    // Always get fresh cart data from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Update cart UI if function exists
    if (typeof window.updateCartUI === 'function') {
        window.updateCartUI();
    }
}

function updateCartQuantity(productId, quantity) {
    // Always get fresh cart data from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Update cart UI if function exists
            if (typeof window.updateCartUI === 'function') {
                window.updateCartUI();
            }
        }
    }
}

function getCartTotal() {
    // Always get fresh cart data from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Make cart functions globally available
window.cart = cart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.getCartTotal = getCartTotal;
window.updateCartCount = updateCartCount;

// WhatsApp Message Functionality
function sendWhatsAppMessage(message, phone = '+918667018453') {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Enhanced Contact Form with WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.phone || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Phone number validation
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Email validation (if provided)
            if (data.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
            }
            
            // Create WhatsApp message
            const whatsappMessage = `Hi IT Connect!

Name: ${data.name}
Phone: ${data.phone}
${data.email ? `Email: ${data.email}` : ''}
Service: ${data.service || 'General Inquiry'}

Message: ${data.message}

Please contact me for laptop repair service.`;
            
            // Send to WhatsApp
            sendWhatsAppMessage(whatsappMessage);
            
            // Reset form
            this.reset();
            showNotification('Message sent via WhatsApp! We\'ll contact you soon.', 'success');
        });
    }
});

// Real-time Phone Number Validation
document.addEventListener('DOMContentLoaded', function() {
    setupPhoneValidation();
});

function setupPhoneValidation() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            validatePhoneNumber(this);
        });
        
        input.addEventListener('blur', function() {
            validatePhoneNumber(this);
        });
    });
}

function validatePhoneNumber(input) {
    const phoneValue = input.value.trim();
    const validationMessage = input.parentElement.querySelector('.validation-message') ||
                             input.parentElement.parentElement.querySelector('.validation-message');
    
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

// Coming Soon Features System
class ComingSoonManager {
    constructor() {
        this.modal = null;
        this.banner = null;
        this.subscribers = JSON.parse(localStorage.getItem('comingSoonSubscribers')) || [];
        this.init();
    }

    init() {
        this.createModal();
        this.createBanner();
        this.bindEvents();
        this.showBannerIfNeeded();
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'coming-soon-modal';
        this.modal.innerHTML = `
            <div class="coming-soon-modal-content">
                <button class="coming-soon-modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="coming-soon-icon">
                    <i class="fas fa-rocket"></i>
                </div>
                <h2>Exciting Features Coming Soon!</h2>
                <p>We're working hard to bring you amazing new features. Be the first to know when they're ready!</p>
                
                <div class="feature-preview">
                    <h4><i class="fas fa-star"></i> What's Coming</h4>
                    <ul>
                        <li>Advanced Order Tracking System</li>
                        <li>Real-time Service Updates</li>
                        <li>AI-Powered Diagnostics</li>
                        <li>Mobile App Integration</li>
                        <li>Live Chat Support</li>
                    </ul>
                </div>

                <div class="progress-bar">
                    <div class="progress-fill" style="--progress-width: 75%; width: 75%;"></div>
                </div>
                <small style="color: #64748b;">Development Progress: 75% Complete</small>

                <form class="newsletter-signup" id="comingSoonNewsletter">
                    <input type="email" placeholder="Enter your email for updates" required>
                    <button type="submit">
                        <i class="fas fa-bell"></i> Notify Me
                    </button>
                </form>

                <p style="font-size: 0.9rem; color: #64748b; margin: 0;">
                    Join <span id="subscriberCount">${this.subscribers.length}</span> others waiting for these features!
                </p>
            </div>
        `;
        document.body.appendChild(this.modal);
    }

  

    bindEvents() {
        // Modal close events
        const closeBtn = this.modal.querySelector('.coming-soon-modal-close');
        closeBtn.addEventListener('click', () => this.hideModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hideModal();
        });

        // Banner click event
        this.banner.addEventListener('click', () => this.showModal());

        // Newsletter signup
        const form = this.modal.querySelector('#comingSoonNewsletter');
        form.addEventListener('submit', (e) => this.handleNewsletterSignup(e));

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.hideModal();
            }
        });
    }

    showModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update subscriber count
        const countElement = this.modal.querySelector('#subscriberCount');
        if (countElement) {
            countElement.textContent = this.subscribers.length;
        }
    }

    hideModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    showBanner() {
        this.banner.style.display = 'block';
        // Auto-hide banner after 10 seconds
        setTimeout(() => {
            if (this.banner) {
                this.banner.style.display = 'none';
            }
        }, 10000);
    }

    hideBanner() {
        if (this.banner) {
            this.banner.style.display = 'none';
        }
    }

    showBannerIfNeeded() {
        // Show banner if user hasn't seen it in the last 24 hours
        const lastShown = localStorage.getItem('comingSoonBannerLastShown');
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (!lastShown || (now - parseInt(lastShown)) > oneDayMs) {
            setTimeout(() => this.showBanner(), 3000); // Show after 3 seconds
            localStorage.setItem('comingSoonBannerLastShown', now.toString());
        }
    }

    handleNewsletterSignup(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (this.subscribers.includes(email)) {
            showNotification('You\'re already subscribed for updates!', 'info');
            return;
        }

        this.subscribers.push(email);
        localStorage.setItem('comingSoonSubscribers', JSON.stringify(this.subscribers));
        
        // Update subscriber count in modal
        const countElement = this.modal.querySelector('#subscriberCount');
        if (countElement) {
            countElement.textContent = this.subscribers.length;
        }

        showNotification('Thanks for subscribing! We\'ll notify you when new features are ready.', 'success');
        e.target.reset();
        
        // Hide modal after successful signup
        setTimeout(() => this.hideModal(), 2000);
    }

    // Method to show coming soon notification for specific features
    showFeatureComingSoon(featureName, description = '') {
        const message = description
            ? `${featureName}: ${description}`
            : `${featureName} is coming soon! Click the banner above to learn more.`;
        
        showEnhancedNotification(message, 'info');
        
        // Show the banner if it's hidden
        this.showBanner();
    }
}

// Initialize Coming Soon Manager
let comingSoonManager;
document.addEventListener('DOMContentLoaded', function() {
    comingSoonManager = new ComingSoonManager();
});

// Enhanced showNotification function for coming soon features
function showEnhancedNotification(message, type = 'info') {
    // Check if it's a "Feature coming soon!" message and enhance it
    if (message.toLowerCase().includes('feature coming soon') || message.toLowerCase().includes('coming soon')) {
        // Add coming soon styling
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-rocket"></i>
                <div class="notification-message">
                    <strong>Coming Soon!</strong><br>
                    <span>${message.replace(/feature coming soon!?/i, '').trim() || 'This feature is under development'}</span>
                    <br><small style="opacity: 0.8;">Click the banner above to get notified when it\'s ready!</small>
                </div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add enhanced styles
        if (!document.querySelector('#enhanced-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'enhanced-notification-styles';
            styles.textContent = `
                .notification .notification-message {
                    line-height: 1.4;
                }
                .notification .notification-message strong {
                    color: inherit;
                    font-weight: 600;
                }
                .notification .notification-message small {
                    font-size: 0.8em;
                    font-style: italic;
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 7 seconds (longer for coming soon messages)
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 7000);
        
        // Show the coming soon banner
        if (comingSoonManager) {
            comingSoonManager.showBanner();
        }
    } else {
        // Use original showNotification function for other notifications
        showNotification(message, type);
    }
}

// Function to add coming soon badges to elements
function addComingSoonBadge(element, text = 'Coming Soon') {
    if (element.querySelector('.coming-soon-badge')) return; // Don't add duplicate badges
    
    const badge = document.createElement('span');
    badge.className = 'coming-soon-badge';
    badge.innerHTML = `<i class="fas fa-clock"></i> ${text}`;
    element.appendChild(badge);
}

// Function to create a coming soon section
function createComingSoonSection() {
    const section = document.createElement('section');
    section.className = 'coming-soon-section';
    section.innerHTML = `
        <div class="container">
            <h2>Exciting Features in Development</h2>
            <p>We're constantly working to improve your experience with cutting-edge features</p>
            
            <div class="coming-soon-features">
                <div class="coming-soon-feature-card">
                    <i class="fas fa-mobile-alt"></i>
                    <h4>Mobile App</h4>
                    <p>Track your repairs, book services, and get real-time updates on your phone</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="--progress-width: 60%; width: 60%;"></div>
                    </div>
                    <small>60% Complete</small>
                </div>
                
                <div class="coming-soon-feature-card">
                    <i class="fas fa-robot"></i>
                    <h4>AI Diagnostics</h4>
                    <p>Advanced AI-powered diagnostics to identify issues before our technician arrives</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="--progress-width: 40%; width: 40%;"></div>
                    </div>
                    <small>40% Complete</small>
                </div>
                
                <div class="coming-soon-feature-card">
                    <i class="fas fa-comments"></i>
                    <h4>Live Chat Support</h4>
                    <p>Get instant help from our support team with integrated live chat</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="--progress-width: 80%; width: 80%;"></div>
                    </div>
                    <small>80% Complete</small>
                </div>
                
                <div class="coming-soon-feature-card">
                    <i class="fas fa-shipping-fast"></i>
                    <h4>Advanced Tracking</h4>
                    <p>Real-time GPS tracking of our technicians and detailed service progress</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="--progress-width: 70%; width: 70%;"></div>
                    </div>
                    <small>70% Complete</small>
                </div>
            </div>
            
            <div style="margin-top: 3rem;">
                <button class="btn btn-primary btn-lg" onclick="comingSoonManager.showModal()">
                    <i class="fas fa-bell"></i> Get Notified When Ready
                </button>
            </div>
        </div>
    `;
    
    return section;
}

// Auto-add coming soon badges to specific elements
document.addEventListener('DOMContentLoaded', function() {
    // Add badges to footer links that show coming soon notifications
    setTimeout(() => {
        const comingSoonLinks = document.querySelectorAll('a[onclick*="Feature coming soon"]');
        comingSoonLinks.forEach(link => {
            addComingSoonBadge(link.parentElement, 'Soon');
        });
        
        // Add coming soon section before footer if on main page
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            const footer = document.querySelector('.footer');
            if (footer) {
                const comingSoonSection = createComingSoonSection();
                footer.parentNode.insertBefore(comingSoonSection, footer);
            }
        }
    }, 1000);
});

// Export for use in other scripts
window.ComingSoonManager = ComingSoonManager;
window.addComingSoonBadge = addComingSoonBadge;
window.createComingSoonSection = createComingSoonSection;
