/**
 * WhatsApp Webhook Handler for IT Connect
 * Node.js server to handle WhatsApp Business API webhooks
 */

const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const WhatsAppAPI = require('./assets/js/whatsapp-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize WhatsApp API
const whatsappAPI = new WhatsAppAPI();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

/**
 * Webhook verification endpoint
 * GET /webhook
 */
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Verify the webhook
    if (mode === 'subscribe' && token === whatsappAPI.config.webhookVerifyToken) {
        console.log('Webhook verified successfully');
        res.status(200).send(challenge);
    } else {
        console.log('Webhook verification failed');
        res.status(403).send('Forbidden');
    }
});

/**
 * Webhook message handler
 * POST /webhook
 */
app.post('/webhook', async (req, res) => {
    try {
        const signature = req.headers['x-hub-signature-256'];
        const payload = JSON.stringify(req.body);

        // Verify webhook signature for security
        if (!whatsappAPI.verifyWebhookSignature(payload, signature)) {
            console.log('Invalid webhook signature');
            return res.status(403).send('Forbidden');
        }

        // Process the webhook
        await whatsappAPI.handleIncomingMessage(req.body);
        
        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Send message endpoint
 * POST /send-message
 */
app.post('/send-message', async (req, res) => {
    try {
        const { to, message, type = 'text' } = req.body;

        if (!to || !message) {
            return res.status(400).json({
                error: 'Missing required fields: to, message'
            });
        }

        let result;
        if (type === 'template') {
            const { templateName, parameters } = req.body;
            result = await whatsappAPI.sendTemplateMessage(to, templateName, parameters);
        } else {
            result = await whatsappAPI.sendTextMessage(to, message);
        }

        res.json({
            success: true,
            messageId: result.messages[0].id,
            data: result
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            error: 'Failed to send message',
            details: error.message
        });
    }
});

/**
 * Send service booking confirmation
 * POST /send-booking-confirmation
 */
app.post('/send-booking-confirmation', async (req, res) => {
    try {
        const bookingData = req.body;
        
        const result = await whatsappAPI.sendServiceBookingConfirmation(bookingData);
        
        res.json({
            success: true,
            messageId: result.messages[0].id,
            data: result
        });
    } catch (error) {
        console.error('Booking confirmation error:', error);
        res.status(500).json({
            error: 'Failed to send booking confirmation',
            details: error.message
        });
    }
});

/**
 * Send repair quotation
 * POST /send-quotation
 */
app.post('/send-quotation', async (req, res) => {
    try {
        const quotationData = req.body;
        
        const result = await whatsappAPI.sendRepairQuotation(quotationData);
        
        res.json({
            success: true,
            messageId: result.messages[0].id,
            data: result
        });
    } catch (error) {
        console.error('Quotation error:', error);
        res.status(500).json({
            error: 'Failed to send quotation',
            details: error.message
        });
    }
});

/**
 * Send appointment reminder
 * POST /send-reminder
 */
app.post('/send-reminder', async (req, res) => {
    try {
        const reminderData = req.body;
        
        const result = await whatsappAPI.sendAppointmentReminder(reminderData);
        
        res.json({
            success: true,
            messageId: result.messages[0].id,
            data: result
        });
    } catch (error) {
        console.error('Reminder error:', error);
        res.status(500).json({
            error: 'Failed to send reminder',
            details: error.message
        });
    }
});

/**
 * Send service completion notification
 * POST /send-completion
 */
app.post('/send-completion', async (req, res) => {
    try {
        const completionData = req.body;
        
        const result = await whatsappAPI.sendServiceCompletion(completionData);
        
        res.json({
            success: true,
            messageId: result.messages[0].id,
            data: result
        });
    } catch (error) {
        console.error('Completion notification error:', error);
        res.status(500).json({
            error: 'Failed to send completion notification',
            details: error.message
        });
    }
});

/**
 * Health check endpoint
 * GET /health
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'IT Connect WhatsApp API'
    });
});

/**
 * API documentation endpoint
 * GET /docs
 */
app.get('/docs', (req, res) => {
    res.json({
        service: 'IT Connect WhatsApp API',
        version: '1.0.0',
        endpoints: {
            'GET /webhook': 'Webhook verification',
            'POST /webhook': 'Webhook message handler',
            'POST /send-message': 'Send text/template message',
            'POST /send-booking-confirmation': 'Send service booking confirmation',
            'POST /send-quotation': 'Send repair quotation',
            'POST /send-reminder': 'Send appointment reminder',
            'POST /send-completion': 'Send service completion notification',
            'GET /health': 'Health check',
            'GET /docs': 'API documentation'
        },
        examples: {
            sendMessage: {
                url: '/send-message',
                method: 'POST',
                body: {
                    to: '+919884745432',
                    message: 'Hello from IT Connect!',
                    type: 'text'
                }
            },
            sendBookingConfirmation: {
                url: '/send-booking-confirmation',
                method: 'POST',
                body: {
                    customerPhone: '+919884745432',
                    customerName: 'John Doe',
                    serviceName: 'Screen Replacement',
                    appointmentDate: '2024-03-25',
                    deviceType: 'Dell Inspiron 15'
                }
            }
        }
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: error.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        availableEndpoints: [
            'GET /webhook',
            'POST /webhook',
            'POST /send-message',
            'POST /send-booking-confirmation',
            'POST /send-quotation',
            'POST /send-reminder',
            'POST /send-completion',
            'GET /health',
            'GET /docs'
        ]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 IT Connect WhatsApp API server running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/docs`);
    console.log(`💚 Health Check: http://localhost:${PORT}/health`);
    console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook`);
});

module.exports = app;
