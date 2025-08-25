// Enhanced WhatsApp Manager with Multiple Accounts and Click-to-Send
class WhatsAppManager {
    constructor() {
        this.accounts = {
            support: {
                number: '+918667018453',
                name: 'IT Connect Support',
                department: 'General Support',
                availability: '24/7',
                specialties: ['general', 'technical', 'billing']
            },
            technical: {
                number: '+919884745432',
                name: 'Technical Team',
                department: 'Technical Support',
                availability: '9 AM - 8 PM',
                specialties: ['hardware', 'software', 'diagnostics']
            },
            sales: {
                number: '+918667018453',
                name: 'Sales Team',
                department: 'Sales & Orders',
                availability: '9 AM - 6 PM',
                specialties: ['sales', 'orders', 'products']
            },
            emergency: {
                number: '+918667018453',
                name: 'Emergency Support',
                department: 'Emergency Services',
                availability: '24/7',
                specialties: ['emergency', 'urgent', 'critical']
            }
        };

        this.messageTemplates = {
            general: {
                greeting: "Hi! I need help with my laptop.",
                inquiry: "I'd like to know more about your services.",
                booking: "I want to book a home visit for laptop repair."
            },
            technical: {
                screen: "Hi! My laptop screen is {issue}. Can you help?",
                keyboard: "Hello! I'm having keyboard issues: {issue}",
                overheating: "My laptop is overheating. {details}",
                software: "I need help with software issues: {issue}",
                hardware: "I need hardware repair/upgrade: {details}",
                battery: "My laptop battery is not working properly. {details}"
            },
            support: {
                ticket: "Hi! I have a support ticket {ticketId}: {subject}",
                followup: "Following up on my previous request: {details}",
                complaint: "I have a complaint about: {issue}",
                feedback: "I'd like to provide feedback: {message}"
            },
            emergency: {
                urgent: "URGENT: My laptop has stopped working completely. {details}",
                critical: "CRITICAL ISSUE: {problem}. Need immediate help!",
                business: "Business emergency - laptop down: {details}"
            },
            sales: {
                quote: "I need a quote for: {service}",
                order: "I want to place an order for: {product}",
                pricing: "What are your prices for {service}?",
                availability: "Is {service} available in my area?"
            }
        };

        this.init();
    }

    init() {
        this.createWhatsAppWidget();
        this.bindEvents();
        this.enhanceExistingButtons();
    }

    createWhatsAppWidget() {
        // Create floating WhatsApp widget
        const widget = document.createElement('div');
        widget.className = 'whatsapp-widget';
        widget.innerHTML = `
            <div class="whatsapp-toggle" id="whatsappToggle">
                <i class="fab fa-whatsapp"></i>
                <span class="whatsapp-pulse"></span>
            </div>
            
            <div class="whatsapp-menu" id="whatsappMenu">
                <div class="whatsapp-header">
                    <h4><i class="fab fa-whatsapp"></i> Contact Us</h4>
                    <button class="whatsapp-close" id="whatsappClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="whatsapp-accounts">
                    ${Object.entries(this.accounts).map(([key, account]) => `
                        <div class="whatsapp-account" data-account="${key}">
                            <div class="account-info">
                                <div class="account-avatar">
                                    <i class="fas fa-${this.getAccountIcon(key)}"></i>
                                </div>
                                <div class="account-details">
                                    <h5>${account.name}</h5>
                                    <p>${account.department}</p>
                                    <small class="availability">${account.availability}</small>
                                </div>
                            </div>
                            <button class="whatsapp-chat-btn" onclick="whatsAppManager.openChat('${key}')">
                                <i class="fab fa-whatsapp"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <div class="whatsapp-quick-actions">
                    <h5>Quick Actions</h5>
                    <div class="quick-action-buttons">
                        <button class="quick-action-btn" onclick="whatsAppManager.sendQuickMessage('general', 'booking')">
                            <i class="fas fa-calendar"></i> Book Service
                        </button>
                        <button class="quick-action-btn" onclick="whatsAppManager.sendQuickMessage('technical', 'screen', {issue: 'cracked/damaged'})">
                            <i class="fas fa-desktop"></i> Screen Issue
                        </button>
                        <button class="quick-action-btn" onclick="whatsAppManager.sendQuickMessage('emergency', 'urgent', {details: 'Please specify your issue'})">
                            <i class="fas fa-exclamation-triangle"></i> Emergency
                        </button>
                        <button class="quick-action-btn" onclick="whatsAppManager.sendQuickMessage('sales', 'quote', {service: 'laptop repair'})">
                            <i class="fas fa-calculator"></i> Get Quote
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(widget);
        this.widget = widget;
    }

    bindEvents() {
        const toggle = document.getElementById('whatsappToggle');
        const menu = document.getElementById('whatsappMenu');
        const close = document.getElementById('whatsappClose');

        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        close.addEventListener('click', () => {
            menu.classList.remove('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.widget.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    }

    enhanceExistingButtons() {
        // Enhance existing WhatsApp buttons with better functionality
        const existingButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]');
        
        existingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleExistingButtonClick(button);
            });
        });

        // Add WhatsApp buttons to service cards
        this.addServiceWhatsAppButtons();
        
        // Add WhatsApp buttons to support tickets
        this.enhanceSupportTickets();
    }

    addServiceWhatsAppButtons() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const serviceName = card.querySelector('h3')?.textContent || '';
            const servicePrice = card.querySelector('.service-price')?.textContent || '';
            
            if (!card.querySelector('.whatsapp-service-btn')) {
                const whatsappBtn = document.createElement('button');
                whatsappBtn.className = 'whatsapp-service-btn btn btn-success btn-sm';
                whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp';
                
                whatsappBtn.addEventListener('click', () => {
                    this.sendServiceInquiry(serviceName, servicePrice);
                });
                
                card.appendChild(whatsappBtn);
            }
        });
    }

    enhanceSupportTickets() {
        // This will be called when support tickets are rendered
        document.addEventListener('ticketsRendered', () => {
            const whatsappButtons = document.querySelectorAll('[onclick*="contactSupport"]');
            
            whatsappButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const ticketId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
                    this.sendTicketMessage(ticketId);
                });
            });
        });
    }

    getAccountIcon(accountKey) {
        const icons = {
            support: 'headset',
            technical: 'tools',
            sales: 'shopping-cart',
            emergency: 'exclamation-triangle'
        };
        return icons[accountKey] || 'user';
    }

    openChat(accountKey, message = '') {
        const account = this.accounts[accountKey];
        if (!account) return;

        let chatMessage = message;
        if (!chatMessage) {
            chatMessage = this.messageTemplates.general.greeting;
        }

        this.sendWhatsAppMessage(account.number, chatMessage);
        
        // Close the menu
        document.getElementById('whatsappMenu').classList.remove('active');
        
        // Track the interaction
        this.trackWhatsAppClick(accountKey, 'direct_chat');
    }

    sendQuickMessage(category, templateKey, variables = {}) {
        let message = this.messageTemplates[category]?.[templateKey] || this.messageTemplates.general.greeting;
        
        // Replace variables in message
        Object.entries(variables).forEach(([key, value]) => {
            message = message.replace(`{${key}}`, value);
        });

        // Determine which account to use
        const accountKey = this.getBestAccount(category);
        const account = this.accounts[accountKey];
        
        this.sendWhatsAppMessage(account.number, message);
        
        // Close the menu
        document.getElementById('whatsappMenu').classList.remove('active');
        
        // Track the interaction
        this.trackWhatsAppClick(accountKey, 'quick_message', { category, templateKey });
    }

    sendServiceInquiry(serviceName, servicePrice) {
        const message = `Hi! I'm interested in ${serviceName}. ${servicePrice ? `I saw the price is ${servicePrice}.` : ''} Can you provide more details and schedule a visit?`;
        
        const accountKey = this.getBestAccount('technical');
        const account = this.accounts[accountKey];
        
        this.sendWhatsAppMessage(account.number, message);
        this.trackWhatsAppClick(accountKey, 'service_inquiry', { service: serviceName });
    }

    sendTicketMessage(ticketId) {
        // Get ticket details if available
        let ticketSubject = 'Support Request';
        if (typeof supportTicketsData !== 'undefined') {
            const ticket = supportTicketsData.find(t => t.id === ticketId);
            if (ticket) {
                ticketSubject = ticket.subject;
            }
        }

        const message = this.messageTemplates.support.ticket
            .replace('{ticketId}', ticketId)
            .replace('{subject}', ticketSubject);

        const accountKey = 'support';
        const account = this.accounts[accountKey];
        
        this.sendWhatsAppMessage(account.number, message);
        this.trackWhatsAppClick(accountKey, 'ticket_support', { ticketId });
    }

    sendContactFormMessage(formData) {
        const message = `Hi IT Connect!

Name: ${formData.name}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ''}
Service: ${formData.service || 'General Inquiry'}

Message: ${formData.message}

Please contact me for laptop repair service.`;

        const accountKey = this.getBestAccount('general');
        const account = this.accounts[accountKey];
        
        this.sendWhatsAppMessage(account.number, message);
        this.trackWhatsAppClick(accountKey, 'contact_form');
    }

    sendEmergencyMessage(issue, details = '') {
        const message = this.messageTemplates.emergency.urgent
            .replace('{details}', details || issue);

        const accountKey = 'emergency';
        const account = this.accounts[accountKey];
        
        this.sendWhatsAppMessage(account.number, message);
        this.trackWhatsAppClick(accountKey, 'emergency');
    }

    getBestAccount(category) {
        // Logic to determine the best account based on category
        const categoryMapping = {
            general: 'support',
            technical: 'technical',
            hardware: 'technical',
            software: 'technical',
            sales: 'sales',
            orders: 'sales',
            emergency: 'emergency',
            urgent: 'emergency',
            billing: 'support'
        };

        return categoryMapping[category] || 'support';
    }

    sendWhatsAppMessage(phoneNumber, message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Open in new window/tab
        window.open(whatsappUrl, '_blank');
    }

    handleExistingButtonClick(button) {
        const href = button.getAttribute('href');
        const existingMessage = this.extractMessageFromUrl(href);
        
        // Enhance the existing message or use default
        let enhancedMessage = existingMessage || this.messageTemplates.general.greeting;
        
        // Determine account based on context
        const accountKey = this.determineAccountFromContext(button);
        const account = this.accounts[accountKey];
        
        this.sendWhatsAppMessage(account.number, enhancedMessage);
        this.trackWhatsAppClick(accountKey, 'existing_button');
    }

    extractMessageFromUrl(url) {
        try {
            const urlObj = new URL(url);
            return decodeURIComponent(urlObj.searchParams.get('text') || '');
        } catch {
            return '';
        }
    }

    determineAccountFromContext(button) {
        const buttonText = button.textContent.toLowerCase();
        const parentContext = button.closest('section')?.id || '';
        
        if (buttonText.includes('emergency') || parentContext.includes('emergency')) {
            return 'emergency';
        } else if (buttonText.includes('technical') || parentContext.includes('service')) {
            return 'technical';
        } else if (buttonText.includes('sales') || buttonText.includes('order')) {
            return 'sales';
        }
        
        return 'support';
    }

    trackWhatsAppClick(accountKey, action, metadata = {}) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                event_category: 'whatsapp',
                event_label: `${accountKey}_${action}`,
                account: accountKey,
                action: action,
                ...metadata
            });
        }

        // Console logging for debugging
        console.log('WhatsApp Click:', {
            account: accountKey,
            action: action,
            metadata: metadata,
            timestamp: new Date().toISOString()
        });
    }

    // Public methods for external use
    showWidget() {
        document.getElementById('whatsappMenu').classList.add('active');
    }

    hideWidget() {
        document.getElementById('whatsappMenu').classList.remove('active');
    }

    sendCustomMessage(accountKey, message) {
        const account = this.accounts[accountKey];
        if (account) {
            this.sendWhatsAppMessage(account.number, message);
            this.trackWhatsAppClick(accountKey, 'custom_message');
        }
    }

    // Integration with contact form
    integrateWithContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Send via WhatsApp
                this.sendContactFormMessage(data);
                
                // Reset form and show success message
                contactForm.reset();
                if (typeof showNotification === 'function') {
                    showNotification('Message sent via WhatsApp! We\'ll contact you soon.', 'success');
                }
            });
        }
    }

    // Integration with support tickets
    integrateWithSupportTickets() {
        // Override the contactSupport function if it exists
        if (typeof window.contactSupport === 'function') {
            window.contactSupport = (ticketId) => {
                this.sendTicketMessage(ticketId);
            };
        }
    }
}

// Initialize WhatsApp Manager
let whatsAppManager;
document.addEventListener('DOMContentLoaded', function() {
    whatsAppManager = new WhatsAppManager();
    
    // Integrate with existing systems
    whatsAppManager.integrateWithContactForm();
    whatsAppManager.integrateWithSupportTickets();
    
    // Make it globally available
    window.whatsAppManager = whatsAppManager;
    
    // Show welcome notification after some time
    setTimeout(() => {
        if (typeof showNotification === 'function') {
            showNotification('💬 Need help? Click the WhatsApp button for instant support!', 'info');
        }
    }, 10000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppManager;
}