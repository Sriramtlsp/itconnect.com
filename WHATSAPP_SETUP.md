# WhatsApp Business API Setup Guide for IT Connect

## Overview
This guide will help you set up the WhatsApp Business API integration for the IT Connect website. The integration includes automated messaging, form submissions, and a floating WhatsApp widget.

## Prerequisites
- WhatsApp Business Account
- Meta Business Account
- Node.js (v14 or higher)
- Valid SSL certificate for webhook URL

## Step 1: WhatsApp Business API Setup

### 1.1 Create Meta Business Account
1. Go to [Meta Business](https://business.facebook.com/)
2. Create a new business account or use existing one
3. Verify your business information

### 1.2 Set up WhatsApp Business API
1. Navigate to [Meta Developers](https://developers.facebook.com/)
2. Create a new app and select "Business" type
3. Add WhatsApp product to your app
4. Complete the setup wizard

### 1.3 Get Required Credentials
You'll need these credentials from your WhatsApp Business API setup:
- **Phone Number ID**: Found in WhatsApp > API Setup
- **Access Token**: Generated in WhatsApp > API Setup
- **Webhook Verify Token**: Create a secure random string
- **App Secret**: Found in App Settings > Basic

## Step 2: Environment Configuration

### 2.1 Create Environment File
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials in `.env`:
   ```env
   WHATSAPP_PHONE_NUMBER_ID=your_actual_phone_number_id
   WHATSAPP_ACCESS_TOKEN=your_actual_access_token
   WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_secure_verify_token
   BUSINESS_PHONE_NUMBER=+918667018453
   PORT=3000
   ```

### 2.2 Security Notes
- Never commit `.env` file to version control
- Use strong, unique tokens
- Rotate tokens regularly
- Use HTTPS for production webhooks

## Step 3: Install Dependencies

```bash
# Install Node.js dependencies
npm install

# For development with auto-restart
npm install -g nodemon
```

## Step 4: Configure Webhook

### 4.1 Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

### 4.2 Set up Webhook URL
1. In Meta Developers, go to WhatsApp > Configuration
2. Set webhook URL: `https://yourdomain.com/webhook`
3. Set verify token (same as in your .env file)
4. Subscribe to message events

### 4.3 Test Webhook
1. Send a test message to your WhatsApp Business number
2. Check server logs for incoming webhook calls
3. Verify auto-replies are working

## Step 5: Website Integration

### 5.1 Files Added/Modified
- `assets/js/whatsapp-api.js` - Core WhatsApp API functions
- `assets/js/whatsapp-integration.js` - Website integration logic
- `assets/css/whatsapp-widget.css` - Widget styling
- `whatsapp-webhook.js` - Node.js webhook server
- `package.json` - Dependencies

### 5.2 HTML Pages Updated
All HTML pages now include:
- WhatsApp widget CSS and JS files
- Floating WhatsApp widget
- Form integration with WhatsApp messaging

## Step 6: Features Overview

### 6.1 Floating WhatsApp Widget
- Always visible on bottom-right
- Quick action buttons for common services
- Custom message input
- Professional chat interface

### 6.2 Form Integration
- Contact form submissions → WhatsApp notifications
- Booking confirmations → Automated WhatsApp messages
- Rental inquiries → WhatsApp follow-ups

### 6.3 Automated Messages
- Service booking confirmations
- Appointment reminders
- Repair quotations
- Service completion notifications

### 6.4 Auto-Reply System
The system automatically responds to common keywords:
- "repair", "fix" → Repair service information
- "rental", "rent" → Rental service details
- "price", "cost" → Pricing information
- "emergency", "urgent" → Emergency service response

## Step 7: Testing

### 7.1 Test Checklist
- [ ] Webhook verification works
- [ ] Incoming messages trigger auto-replies
- [ ] Contact form sends WhatsApp notifications
- [ ] Booking form sends confirmations
- [ ] Floating widget appears and functions
- [ ] Quick action buttons work
- [ ] Custom messages send correctly

### 7.2 Test Messages
Send these to your business number to test auto-replies:
- "I need laptop repair"
- "What are your rental prices?"
- "Emergency laptop service needed"

## Step 8: Production Deployment

### 8.1 Server Setup
1. Deploy webhook server to production (Heroku, AWS, etc.)
2. Ensure HTTPS is enabled
3. Update webhook URL in Meta Developers
4. Set production environment variables

### 8.2 Domain Configuration
1. Update webhook URL to production domain
2. Test webhook from production environment
3. Monitor logs for any issues

## Step 9: Monitoring and Maintenance

### 9.1 Monitoring
- Monitor webhook server logs
- Track message delivery rates
- Monitor API rate limits
- Set up error alerts

### 9.2 Rate Limits
WhatsApp Business API has rate limits:
- 1,000 messages per day (free tier)
- Higher limits available with paid plans
- Monitor usage in Meta Business Manager

## Troubleshooting

### Common Issues

1. **Webhook not receiving messages**
   - Check webhook URL is correct and accessible
   - Verify webhook token matches
   - Ensure HTTPS is enabled

2. **Messages not sending**
   - Check access token is valid
   - Verify phone number ID is correct
   - Check API rate limits

3. **Auto-replies not working**
   - Check webhook signature verification
   - Verify message processing logic
   - Check server logs for errors

### Support
- WhatsApp Business API Documentation: https://developers.facebook.com/docs/whatsapp
- Meta Business Support: https://business.facebook.com/help

## Security Best Practices

1. **Token Security**
   - Store tokens in environment variables
   - Use strong, unique verify tokens
   - Rotate tokens regularly

2. **Webhook Security**
   - Always verify webhook signatures
   - Use HTTPS for all webhook URLs
   - Implement rate limiting

3. **Data Privacy**
   - Follow WhatsApp Business Policy
   - Implement proper data handling
   - Respect user privacy preferences

## Next Steps

1. Set up your WhatsApp Business API credentials
2. Configure environment variables
3. Deploy webhook server
4. Test all functionality
5. Monitor and optimize performance

For technical support or questions, contact the development team.
