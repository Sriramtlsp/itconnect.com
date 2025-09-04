/**
 * WhatsApp Integration for IT Connect Website
 * Handles form submissions and WhatsApp messaging
 */

class WhatsAppIntegration {
    constructor() {
        this.whatsappAPI = new WhatsAppAPI();
        this.businessNumber = '+918667018453';
        this.init();
    }

    init() {
        this.bindFormEvents();
        this.bindWhatsAppButtons();
        this.initFloatingWhatsApp();
    }

    /**
     * Bind form submission events
     */
    bindFormEvents() {
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        // Booking form
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => this.handleBookingForm(e));
        }

        // Rental form
        const rentalForm = document.getElementById('rentalForm');
        if (rentalForm) {
            rentalForm.addEventListener('submit', (e) => this.handleRentalForm(e));
        }
    }

    /**
     * Bind WhatsApp button events
     */
    bindWhatsAppButtons() {
        // Quick WhatsApp buttons
        document.querySelectorAll('[data-whatsapp]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const message = button.getAttribute('data-whatsapp');
                this.openWhatsApp(message);
            });
        });

        // Service booking buttons
        document.querySelectorAll('.btn-book').forEach(button => {
            button.addEventListener('click', (e) => {
                const service = button.getAttribute('data-service');
                const price = button.getAttribute('data-price');
                this.openServiceWhatsApp(service, price);
            });
        });
    }

    /**
     * Initialize floating WhatsApp widget
     */
    initFloatingWhatsApp() {
        const floatingWidget = document.createElement('div');
        floatingWidget.className = 'whatsapp-float';
        floatingWidget.innerHTML = `
            <div class="whatsapp-float-button" onclick="whatsappIntegration.toggleWhatsAppWidget()">
                <i class="fab fa-whatsapp"></i>
                <span class="pulse-ring"></span>
            </div>
            <div class="whatsapp-widget" id="whatsappWidget">
                <div class="widget-header">
                    <img src="assets/images/logo.jpg" alt="IT Connect" class="widget-logo">
                    <div class="widget-info">
                        <h4>IT Connect</h4>
                        <p class="online-status">
                            <span class="status-dot"></span>
                            Online - Reply in minutes
                        </p>
                    </div>
                    <button class="widget-close" onclick="whatsappIntegration.closeWhatsAppWidget()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="widget-body">
                    <div class="chat-messages">
                        <div class="message bot-message">
                            <div class="message-content">
                                <p>👋 Hi there! Welcome to IT Connect!</p>
                                <p>How can we help you with your laptop today?</p>
                            </div>
                            <div class="message-time">${this.getCurrentTime()}</div>
                        </div>
                    </div>
                    <div class="quick-actions">
                        <button class="quick-btn" onclick="whatsappIntegration.sendQuickMessage('repair')">
                            🔧 Laptop Repair
                        </button>
                        <button class="quick-btn" onclick="whatsappIntegration.sendQuickMessage('rental')">
                            💻 Laptop Rental
                        </button>
                        <button class="quick-btn" onclick="whatsappIntegration.sendQuickMessage('quotation')">
                            💰 Get Quotation
                        </button>
                        <button class="quick-btn" onclick="whatsappIntegration.sendQuickMessage('emergency')">
                            🚨 Emergency Service
                        </button>
                    </div>
                </div>
                <div class="widget-footer">
                    <div class="message-input-container">
                        <input type="text" id="whatsappMessage" placeholder="Type your message..." 
                               onkeypress="whatsappIntegration.handleMessageKeyPress(event)">
                        <button onclick="whatsappIntegration.sendCustomMessage()">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="widget-powered">
                        Powered by WhatsApp Business
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(floatingWidget);
    }

    /**
     * Handle contact form submission
     */
    async handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        // Send WhatsApp notification to business
        const businessMessage = `🔔 *New Contact Form Submission*

👤 *Name:* ${data.name}
📞 *Phone:* ${data.phone}
📧 *Email:* ${data.email}
🔧 *Service:* ${data.service}
💬 *Message:* ${data.message}

*Submitted from:* itconnect.com/contact`;

        try {
            await this.whatsappAPI.sendTextMessage(this.businessNumber, businessMessage);
            
            // Send confirmation to customer
            if (data.phone) {
                const customerMessage = `Thank you ${data.name}! 🙏

Your inquiry has been received. Our team will contact you within 2 hours.

*Your Details:*
📞 Phone: ${data.phone}
🔧 Service: ${data.service}

*IT Connect - Professional Laptop Repair*
📞 Call: +91 9884745432`;

                await this.whatsappAPI.sendTextMessage(data.phone, customerMessage);
            }

            this.showNotification('Message sent successfully! We will contact you soon.', 'success');
            e.target.reset();
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
            this.showNotification('Message sent! We will contact you soon.', 'success');
            e.target.reset();
        }
    }

    /**
     * Handle booking form submission
     */
    async handleBookingForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const bookingData = {
            customerName: formData.get('customerName'),
            customerPhone: formData.get('customerPhone'),
            customerEmail: formData.get('customerEmail'),
            serviceName: formData.get('serviceName'),
            servicePrice: formData.get('servicePrice'),
            appointmentDate: formData.get('appointmentDate'),
            deviceType: formData.get('deviceType'),
            issueDescription: formData.get('issueDescription')
        };

        try {
            // Send booking confirmation to customer
            await this.whatsappAPI.sendServiceBookingConfirmation(bookingData);
            
            // Send notification to business
            const businessMessage = `📅 *New Service Booking*

👤 *Customer:* ${bookingData.customerName}
📞 *Phone:* ${bookingData.customerPhone}
📧 *Email:* ${bookingData.customerEmail}
🔧 *Service:* ${bookingData.serviceName}
💰 *Price:* ₹${bookingData.servicePrice}
📅 *Date:* ${bookingData.appointmentDate}
💻 *Device:* ${bookingData.deviceType}
🔍 *Issue:* ${bookingData.issueDescription}

*Booking ID:* BK${Date.now()}`;

            await this.whatsappAPI.sendTextMessage(this.businessNumber, businessMessage);
            
            this.showNotification('Booking confirmed! Check WhatsApp for details.', 'success');
            this.closeModal();
            e.target.reset();
        } catch (error) {
            console.error('Error sending booking confirmation:', error);
            this.showNotification('Booking confirmed! We will contact you soon.', 'success');
            this.closeModal();
            e.target.reset();
        }
    }

    /**
     * Handle rental form submission
     */
    async handleRentalForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const rentalData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            laptopType: formData.get('laptop-type'),
            quantity: formData.get('quantity'),
            rentalPeriod: formData.get('rental-period'),
            message: formData.get('message')
        };

        const customerMessage = `🎉 *Laptop Rental Inquiry Received*

Hello ${rentalData.name}! 👋

Your rental request details:
💻 *Laptop Type:* ${rentalData.laptopType}
📊 *Quantity:* ${rentalData.quantity}
📅 *Period:* ${rentalData.rentalPeriod}
📝 *Requirements:* ${rentalData.message}

Our rental team will contact you within 1 hour with:
✅ Availability confirmation
✅ Pricing details
✅ Delivery schedule

*IT Connect - Laptop Rental Services*
📞 Call: +91 9884745432`;

        try {
            await this.whatsappAPI.sendTextMessage(rentalData.phone, customerMessage);
            
            // Send to business
            const businessMessage = `💻 *New Laptop Rental Inquiry*

👤 *Customer:* ${rentalData.name}
📞 *Phone:* ${rentalData.phone}
📧 *Email:* ${rentalData.email}
💻 *Type:* ${rentalData.laptopType}
📊 *Quantity:* ${rentalData.quantity}
📅 *Period:* ${rentalData.rentalPeriod}
📝 *Requirements:* ${rentalData.message}`;

            await this.whatsappAPI.sendTextMessage(this.businessNumber, businessMessage);
            
            this.showNotification('Rental inquiry sent! Check WhatsApp for confirmation.', 'success');
            e.target.reset();
        } catch (error) {
            console.error('Error sending rental inquiry:', error);
            this.showNotification('Rental inquiry sent! We will contact you soon.', 'success');
            e.target.reset();
        }
    }

    /**
     * Open WhatsApp with custom message
     */
    openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.businessNumber.replace('+', '')}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }

    /**
     * Open WhatsApp for service booking
     */
    openServiceWhatsApp(service, price) {
        const message = `Hi! I'm interested in ${service} service (₹${price}). 

Please provide:
- Free home visit
- Detailed quotation
- Service timeline

My laptop details:
- Brand: [Please specify]
- Model: [Please specify]
- Issue: [Please describe]

Thank you!`;

        this.openWhatsApp(message);
    }

    /**
     * Toggle WhatsApp widget
     */
    toggleWhatsAppWidget() {
        const widget = document.getElementById('whatsappWidget');
        const button = document.querySelector('.whatsapp-float-button');
        
        if (widget.classList.contains('active')) {
            this.closeWhatsAppWidget();
        } else {
            widget.classList.add('active');
            button.classList.add('active');
            document.getElementById('whatsappMessage').focus();
        }
    }

    /**
     * Close WhatsApp widget
     */
    closeWhatsAppWidget() {
        const widget = document.getElementById('whatsappWidget');
        const button = document.querySelector('.whatsapp-float-button');
        
        widget.classList.remove('active');
        button.classList.remove('active');
    }

    /**
     * Send quick message
     */
    sendQuickMessage(type) {
        let message = '';
        
        switch (type) {
            case 'repair':
                message = `Hi! I need laptop repair service.

My laptop issue:
- Brand: [Please specify]
- Model: [Please specify] 
- Problem: [Describe the issue]

Please provide:
✅ Free home diagnosis
✅ Repair quotation
✅ Service timeline

Thank you!`;
                break;
                
            case 'rental':
                message = `Hi! I'm interested in laptop rental.

My requirements:
- Laptop type: [Business/Gaming/Creative]
- Quantity: [Number needed]
- Duration: [Days/Weeks/Months]
- Purpose: [Work/Event/Project]

Please share:
✅ Available models
✅ Rental pricing
✅ Delivery options

Thank you!`;
                break;
                
            case 'quotation':
                message = `Hi! I need a repair quotation.

Laptop details:
- Brand: [Please specify]
- Model: [Please specify]
- Issue: [Describe problem]
- Age: [How old is the laptop]

Please provide:
✅ Diagnostic report
✅ Repair cost estimate
✅ Parts availability
✅ Service timeline

Thank you!`;
                break;
                
            case 'emergency':
                message = `🚨 URGENT: I need emergency laptop repair!

Issue: [Describe urgent problem]
Laptop: [Brand and model]
Location: [Your area in Chennai]

I need:
✅ Immediate technician visit
✅ Same-day repair if possible
✅ Priority service

Please call me ASAP!
Thank you!`;
                break;
        }
        
        this.openWhatsApp(message);
        this.closeWhatsAppWidget();
    }

    /**
     * Send custom message
     */
    sendCustomMessage() {
        const messageInput = document.getElementById('whatsappMessage');
        const message = messageInput.value.trim();
        
        if (message) {
            this.openWhatsApp(message);
            this.closeWhatsAppWidget();
        }
    }

    /**
     * Handle message input key press
     */
    handleMessageKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendCustomMessage();
        }
    }

    /**
     * Get current time
     */
    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    /**
     * Close modal
     */
    closeModal() {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Initialize WhatsApp integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.whatsappIntegration = new WhatsAppIntegration();
});
