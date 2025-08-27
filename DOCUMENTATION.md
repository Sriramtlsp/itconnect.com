# ITConnect - Technical Documentation

## Project Structure

### Core Files
- `index.html` - Main landing page
- `login.html` - User authentication page
- `profile.html` - User profile management
- `ai-diagnostics.html` - AI-powered diagnostics tool
- `store.html` - E-commerce product listings
- `checkout.html` - Purchase completion
- `service-history.html` - User service records
- `support-tickets.html` - Technical support system
- `track-order.html` - Order tracking interface

### Assets

#### CSS
- `style.css` - Main stylesheet
- `whatsapp-styles.css` - WhatsApp integration styles

#### JavaScript
- `script.js` - Core functionality
- `login.js` - Authentication logic
- `database.js` - Data management
- `ai-diagnostics.js` - AI diagnostic tool logic
- `checkout.js` - Payment processing
- `live-chat.js` - Chat functionality
- `profile.js` - User profile management
- `service-history.js` - Service record display
- `store.js` - E-commerce functionality
- `support-tickets.js` - Ticket system
- `track-order.js` - Order tracking
- `whatsapp-manager.js` - WhatsApp integration

#### Images
- Logo and product images
- Blog post illustrations

### Blog
- `blog/improve-laptop-performance.html`
- `blog/laptop-overheating-solutions.html`

## Authentication System

### Regular Authentication
The system uses a client-side authentication mechanism with `database.js` handling user data storage and validation. User credentials are stored in the browser's local storage for session management.

### Social Login
- **Google OAuth**: Configured in `login.js` with client ID setup
- **Facebook SDK**: Integrated in `login.js` with app ID configuration

## Database Structure

The application uses a client-side database simulation through the `ITConnectDatabase` class in `database.js`. This includes:

- User accounts (email, password, name, role)
- Service history records
- Order tracking information
- Support tickets

## AI Diagnostics Tool

The AI diagnostics tool in `ai-diagnostics.html` provides automated troubleshooting for common IT issues. It uses a rule-based system to analyze user inputs and provide relevant solutions.

## E-commerce System

The store and checkout system allows users to:
- Browse products
- Add items to cart
- Complete purchases
- Track orders

## User Roles

- **Customer**: Regular users who can request services and make purchases
- **Technician**: IT professionals who can view and respond to service requests
- **Admin**: System administrators with full access to all features

## Development Guidelines

### Adding New Features
1. Create necessary HTML files
2. Add corresponding JavaScript in the `assets/js` directory
3. Update navigation links in relevant files
4. Test across different browsers

### Styling Conventions
- Follow existing CSS patterns in `style.css`
- Use responsive design principles
- Maintain consistent color scheme and typography

### JavaScript Practices
- Use modular approach with separate JS files for different features
- Follow existing patterns for database interactions
- Implement proper error handling

## Deployment

The application is designed to be deployed on any standard web server without special requirements. All dependencies are included in the repository.