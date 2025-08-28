# Google OAuth Authorization Error Fix

## Problem
You're encountering the error: "Missing required parameter: client_id" when trying to use Google Sign-In.

## Root Cause
The Google OAuth client ID is not properly configured for your domain and application.

## Solution Steps

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it "IT Connect Website" or similar

### Step 2: Enable Required APIs
1. Go to "APIs & Services" → "Library"
2. Search and enable:
   - **Google+ API** (for user profile data)
   - **Google Identity Services API** (for OAuth)

### Step 3: Configure OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Fill required information:
   - **App name**: IT Connect
   - **User support email**: your email
   - **Developer contact**: your email
4. Add scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `openid`
5. Save and continue

### Step 4: Create OAuth 2.0 Client ID
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Configure:
   - **Name**: IT Connect Website
   - **Authorized JavaScript origins**:
     - `http://localhost:5500` (for local testing)
     - `http://127.0.0.1:5500` (for local testing)
     - `https://yourdomain.com` (your actual domain)
   - **Authorized redirect URIs**:
     - `http://localhost:5500/login.html`
     - `https://yourdomain.com/login.html`

### Step 5: Update Your Code
1. Copy the Client ID from Google Cloud Console
2. Open `assets/js/login.js`
3. Replace line 12:
   ```javascript
   const GOOGLE_CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID_HERE.apps.googleusercontent.com';
   ```

### Step 6: Test Configuration
1. Open your website in browser
2. Navigate to login page
3. Click Google sign-in button
4. Should work without authorization errors

## Current Workaround
Since Google OAuth is not configured, the system will:
- Show a warning notification
- Fall back to demo mode
- Allow you to use demo credentials:
  - Email: `demo@itconnect.com`
  - Password: `demo123`

## Demo Credentials Available
- **Regular User**: demo@itconnect.com / demo123
- **Admin User**: admin@itconnect.com / admin123
- **Technician**: tech@itconnect.com / tech123

## Quick Demo Access
Press `Ctrl+Shift+D` on the login page to auto-fill demo credentials.

## Security Notes
- Never commit real client IDs to public repositories
- Use environment variables in production
- Regularly rotate OAuth credentials
- Monitor usage in Google Cloud Console

## Testing Locally
For local development, you can:
1. Use `http://localhost:3000` or `http://127.0.0.1:5500`
2. Add these to authorized origins in Google Cloud Console
3. Test with a simple HTTP server

## Production Deployment
When deploying to production:
1. Add your production domain to authorized origins
2. Update client ID in your deployment process
3. Consider OAuth app verification for public use

## Support
If you continue having issues:
1. Check browser console for detailed error messages
2. Verify all URLs match exactly in Google Cloud Console
3. Ensure APIs are enabled
4. Test with incognito/private browsing mode

## Alternative: Use Demo Mode
For now, you can continue using the demo mode which provides:
- Full login functionality
- User session management
- Role-based access (admin, user, technician)
- All features except actual Google authentication