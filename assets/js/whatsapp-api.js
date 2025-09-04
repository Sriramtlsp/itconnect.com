/**
 * WhatsApp API Integration for IT Connect
 * Handles WhatsApp Business API communication and messaging
 */

class WhatsAppAPI {
    constructor() {
        this.config = {
            // WhatsApp Business API Configuration
            phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || 'YOUR_PHONE_NUMBER_ID',
            accessToken: process.env.WHATSAPP_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN',
            webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'YOUR_VERIFY_TOKEN',
            apiVersion: 'v18.0',
            baseUrl: 'https://graph.facebook.com',
            businessPhone: '+918667018453' // IT Connect business number
        };
        
        this.templates = {
            serviceBooking: 'service_booking_confirmation',
            appointmentReminder: 'appointment_reminder',
            serviceComplete: 'service_completion',
            quotation: 'repair_quotation'
        };
    }

    /**
     * Send a text message via WhatsApp Business API
     * @param {string} to - Recipient phone number
     * @param {string} message - Message text
     * @returns {Promise<Object>} API response
     */
    async sendTextMessage(to, message) {
        const url = `${this.config.baseUrl}/${this.config.apiVersion}/${this.config.phoneNumberId}/messages`;
        
        const payload = {
            messaging_product: 'whatsapp',
            to: this.formatPhoneNumber(to),
            type: 'text',
            text: {
                body: message
            }
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(`WhatsApp API Error: ${result.error?.message || 'Unknown error'}`);
            }

            return result;
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
            throw error;
        }
    }

    /**
     * Send a template message
     * @param {string} to - Recipient phone number
     * @param {string} templateName - Template name
     * @param {Array} parameters - Template parameters
     * @returns {Promise<Object>} API response
     */
    async sendTemplateMessage(to, templateName, parameters = []) {
        const url = `${this.config.baseUrl}/${this.config.apiVersion}/${this.config.phoneNumberId}/messages`;
        
        const payload = {
            messaging_product: 'whatsapp',
            to: this.formatPhoneNumber(to),
            type: 'template',
            template: {
                name: templateName,
                language: {
                    code: 'en'
                },
                components: parameters.length > 0 ? [{
                    type: 'body',
                    parameters: parameters.map(param => ({
                        type: 'text',
                        text: param
                    }))
                }] : []
            }
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(`WhatsApp API Error: ${result.error?.message || 'Unknown error'}`);
            }

            return result;
        } catch (error) {
            console.error('Error sending WhatsApp template:', error);
            throw error;
        }
    }

    /**
     * Send service booking confirmation
     * @param {Object} bookingData - Booking information
     * @returns {Promise<Object>} API response
     */
    async sendServiceBookingConfirmation(bookingData) {
        const { customerPhone, customerName, serviceName, appointmentDate, deviceType } = bookingData;
        
        const message = `🔧 *Service Booking Confirmed* 🔧

Hello ${customerName}!

Your laptop repair service has been booked successfully:

📋 *Service:* ${serviceName}
💻 *Device:* ${deviceType}
📅 *Date:* ${appointmentDate}
📍 *Location:* Your doorstep

Our technician will contact you 30 minutes before arrival.

*IT Connect - Professional Laptop Repair*
📞 Call: +91 9884745432
🌐 Website: itconnect.com

Thank you for choosing IT Connect! 🙏`;

        return await this.sendTextMessage(customerPhone, message);
    }

    /**
     * Send repair quotation
     * @param {Object} quotationData - Quotation details
     * @returns {Promise<Object>} API response
     */
    async sendRepairQuotation(quotationData) {
        const { customerPhone, customerName, deviceType, issue, estimatedCost, repairTime } = quotationData;
        
        const message = `💰 *Repair Quotation* 💰

Hello ${customerName}!

After diagnosing your ${deviceType}, here's our quotation:

🔍 *Issue:* ${issue}
💵 *Estimated Cost:* ₹${estimatedCost}
⏰ *Repair Time:* ${repairTime}
🛡️ *Warranty:* 6 months

*What's Included:*
✅ Genuine parts
✅ Professional repair
✅ Free pickup & delivery
✅ 6-month warranty

Reply 'YES' to approve or call us to discuss.

*IT Connect - Professional Laptop Repair*
📞 Call: +91 9884745432`;

        return await this.sendTextMessage(customerPhone, message);
    }

    /**
     * Send appointment reminder
     * @param {Object} reminderData - Reminder details
     * @returns {Promise<Object>} API response
     */
    async sendAppointmentReminder(reminderData) {
        const { customerPhone, customerName, serviceName, appointmentTime, technicianName } = reminderData;
        
        const message = `⏰ *Appointment Reminder* ⏰

Hello ${customerName}!

This is a reminder for your laptop repair service:

🔧 *Service:* ${serviceName}
👨‍🔧 *Technician:* ${technicianName}
📅 *Time:* ${appointmentTime}

Our technician will arrive at your location shortly. Please ensure:
✅ Laptop is available
✅ Backup important data
✅ Clear workspace

*IT Connect - Professional Laptop Repair*
📞 Emergency: +91 9884745432

See you soon! 🚀`;

        return await this.sendTextMessage(customerPhone, message);
    }

    /**
     * Send service completion notification
     * @param {Object} completionData - Service completion details
     * @returns {Promise<Object>} API response
     */
    async sendServiceCompletion(completionData) {
        const { customerPhone, customerName, serviceName, totalCost, warrantyPeriod } = completionData;
        
        const message = `✅ *Service Completed Successfully* ✅

Hello ${customerName}!

Your laptop repair has been completed:

🔧 *Service:* ${serviceName}
💰 *Total Cost:* ₹${totalCost}
🛡️ *Warranty:* ${warrantyPeriod}

*Your laptop is ready for pickup/delivered!*

📋 *Warranty Coverage:*
• Parts replacement
• Labor charges
• Technical support

Rate our service: ⭐⭐⭐⭐⭐
Share feedback: itconnect.com/feedback

*IT Connect - Professional Laptop Repair*
📞 Support: +91 9884745432

Thank you for choosing IT Connect! 🙏`;

        return await this.sendTextMessage(customerPhone, message);
    }

    /**
     * Handle incoming webhook messages
     * @param {Object} webhookData - Webhook payload
     * @returns {Promise<Object>} Response
     */
    async handleIncomingMessage(webhookData) {
        try {
            const { entry } = webhookData;
            
            for (const entryItem of entry) {
                const { changes } = entryItem;
                
                for (const change of changes) {
                    if (change.field === 'messages') {
                        const { messages, contacts } = change.value;
                        
                        if (messages) {
                            for (const message of messages) {
                                await this.processIncomingMessage(message, contacts);
                            }
                        }
                    }
                }
            }
            
            return { status: 'success' };
        } catch (error) {
            console.error('Error handling incoming message:', error);
            throw error;
        }
    }

    /**
     * Process individual incoming message
     * @param {Object} message - Message object
     * @param {Array} contacts - Contacts array
     */
    async processIncomingMessage(message, contacts) {
        const { from, type, text, timestamp } = message;
        const contact = contacts?.find(c => c.wa_id === from);
        const customerName = contact?.profile?.name || 'Customer';
        
        if (type === 'text') {
            const messageText = text.body.toLowerCase().trim();
            
            // Auto-reply based on message content
            if (messageText.includes('booking') || messageText.includes('appointment')) {
                await this.sendAutoReply(from, 'booking', customerName);
            } else if (messageText.includes('quotation') || messageText.includes('price')) {
                await this.sendAutoReply(from, 'quotation', customerName);
            } else if (messageText.includes('status') || messageText.includes('update')) {
                await this.sendAutoReply(from, 'status', customerName);
            } else if (messageText === 'yes' || messageText === 'approve') {
                await this.sendAutoReply(from, 'approval', customerName);
            } else {
                await this.sendAutoReply(from, 'general', customerName);
            }
        }
    }

    /**
     * Send auto-reply based on message type
     * @param {string} to - Recipient phone number
     * @param {string} type - Reply type
     * @param {string} customerName - Customer name
     */
    async sendAutoReply(to, type, customerName) {
        let message = '';
        
        switch (type) {
            case 'booking':
                message = `Hello ${customerName}! 👋

To book a laptop repair service:
📞 Call: +91 9884745432
🌐 Visit: itconnect.com
📱 WhatsApp: Send us your laptop details

We provide doorstep service across Chennai! 🚀`;
                break;
                
            case 'quotation':
                message = `Hello ${customerName}! 💰

For repair quotation, please share:
📱 Laptop brand & model
🔍 Issue description
📸 Photos (if applicable)

Our technician will provide accurate estimate within 2 hours!

📞 Call: +91 9884745432`;
                break;
                
            case 'status':
                message = `Hello ${customerName}! 📋

To check service status:
📞 Call: +91 9884745432
🌐 Visit: itconnect.com/track
📱 Share your service ID

Our team will update you immediately! ⚡`;
                break;
                
            case 'approval':
                message = `Thank you ${customerName}! ✅

Your approval has been received. Our technician will contact you shortly to schedule the repair.

📞 Contact: +91 9884745432
⏰ Service Hours: Mon-Sat 9AM-8PM

IT Connect - Your trusted laptop repair partner! 🔧`;
                break;
                
            default:
                message = `Hello ${customerName}! 👋

Welcome to IT Connect - Professional Laptop Repair Services!

🔧 *Our Services:*
• Screen replacement
• Keyboard repair
• Hardware upgrades
• Software issues
• Battery replacement
• Overheating fixes

📞 Call: +91 9884745432
🌐 Website: itconnect.com
📍 Doorstep service in Chennai

How can we help you today? 😊`;
        }
        
        await this.sendTextMessage(to, message);
    }

    /**
     * Format phone number for WhatsApp API
     * @param {string} phoneNumber - Phone number
     * @returns {string} Formatted phone number
     */
    formatPhoneNumber(phoneNumber) {
        // Remove all non-digit characters
        let cleaned = phoneNumber.replace(/\D/g, '');
        
        // Add country code if not present
        if (!cleaned.startsWith('91') && cleaned.length === 10) {
            cleaned = '91' + cleaned;
        }
        
        return cleaned;
    }

    /**
     * Verify webhook signature (for security)
     * @param {string} payload - Request payload
     * @param {string} signature - Webhook signature
     * @returns {boolean} Verification result
     */
    verifyWebhookSignature(payload, signature) {
        const crypto = require('crypto');
        const expectedSignature = crypto
            .createHmac('sha256', this.config.webhookVerifyToken)
            .update(payload)
            .digest('hex');
        
        return signature === `sha256=${expectedSignature}`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppAPI;
} else {
    window.WhatsAppAPI = WhatsAppAPI;
}
