# Social Login Setup Guide

## Google OAuth Configuration

### Step 1: Create a Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"

### Step 2: Configure OAuth Consent Screen
1. Click on "OAuth consent screen" tab
2. Select "External" user type (unless you have a Google Workspace)
3. Fill in the required application information:
   - App name: ITConnect
   - User support email: your-email@example.com
   - Developer contact information: your-email@example.com
4. Add the following scopes:
   - `./auth/userinfo.email`
   - `./auth/userinfo.profile`

### Step 3: Create OAuth Client ID
1. Click on "Credentials" tab
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Add a name for your OAuth client
5. Add authorized JavaScript origins:
   - For local development: `http://localhost:3000`
   - For production: Your website domain
6. Add authorized redirect URIs:
   - For local development: `http://localhost:3000/login.html`
   - For production: `https://yourdomain.com/login.html`
7. Click "Create"

### Step 4: Implement in ITConnect
1. Open `login.js`
2. Locate the `initializeGoogleOAuth` function
3. Replace the client ID with your own:

```javascript
function initializeGoogleOAuth() {
  try {
    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID_HERE',
      callback: handleGoogleCredentialResponse
    });
    console.log('Google OAuth initialized successfully');
  } catch (error) {
    console.error('Error initializing Google OAuth:', error);
    showNotification('Error initializing Google Sign-In. Please try again later.', 'error');
  }
}
```

## Facebook SDK Configuration

### Step 1: Create a Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" > "Create App"
3. Select "Consumer" as the app type
4. Enter your app name and contact email
5. Click "Create App"

### Step 2: Set Up Facebook Login
1. From your app dashboard, click "Add Product"
2. Select "Facebook Login" > "Web"
3. Enter your website URL in the "Site URL" field
4. Skip the quick start

### Step 3: Configure Settings
1. Go to "Settings" > "Basic"
2. Note your App ID
3. Add your domain to the "App Domains" field
4. Save changes

### Step 4: Configure Facebook Login Settings
1. Go to "Facebook Login" > "Settings"
2. Add the following OAuth Redirect URIs:
   - For local development: `http://localhost:3000/login.html`
   - For production: `https://yourdomain.com/login.html`
3. Enable "Login with the JavaScript SDK"
4. Save changes

### Step 5: Implement in ITConnect
1. Open `login.html`
2. Locate the Facebook SDK initialization code
3. Replace the app ID with your own:

```html
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : 'YOUR_FACEBOOK_APP_ID_HERE',
      cookie     : true,
      xfbml      : true,
      version    : 'v18.0'
    });
  };
</script>
```

4. Open `login.js`
5. Locate the `initializeFacebookSDK` function and ensure it's properly configured

## Testing Social Login

### Local Testing
1. Start a local server: `npx serve`
2. Open `http://localhost:3000/login.html`
3. Test both Google and Facebook login buttons

### Troubleshooting

#### Google OAuth Issues
- Ensure your authorized JavaScript origins and redirect URIs are correctly set
- Check browser console for specific error messages
- Verify that your Google Cloud project has the Google Identity Services API enabled

#### Facebook SDK Issues
- Ensure your app domains and redirect URIs are correctly set
- Check browser console for specific error messages
- Verify that your Facebook app is in development mode for testing

## Security Considerations

- Never commit your client IDs or app secrets to public repositories
- Consider using environment variables for production deployments
- Implement proper session management and token validation
- Use HTTPS in production environments