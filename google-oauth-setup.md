# Google OAuth Setup Guide

## Overview
This guide will help you set up Google OAuth authentication for the IT Connect website.

## Prerequisites
- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "IT Connect Website"
4. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in required fields:
     - App name: "IT Connect"
     - User support email: your email
     - Developer contact information: your email
   - Add scopes: email, profile, openid
4. For Application type, select "Web application"
5. Add authorized JavaScript origins:
   - `http://localhost:3000` (for local development)
   - `https://yourdomain.com` (for production)
6. Add authorized redirect URIs:
   - `http://localhost:3000/login.html`
   - `https://yourdomain.com/login.html`
7. Click "Create"

## Step 4: Configure the Website

1. Copy the Client ID from the credentials page
2. Open `assets/js/login.js`
3. Replace the placeholder in line 12:
   ```javascript
   const GOOGLE_CLIENT_ID = 'your-actual-client-id.apps.googleusercontent.com';
   ```

## Step 5: Test the Integration

1. Open your website in a browser
2. Navigate to the login page
3. Click the "Google" button
4. You should see the Google sign-in popup

## Troubleshooting

### Common Issues:

1. **"This app isn't verified" warning**
   - This is normal during development
   - Click "Advanced" → "Go to IT Connect (unsafe)" to proceed
   - For production, submit your app for verification

2. **"redirect_uri_mismatch" error**
   - Ensure your domain is added to authorized JavaScript origins
   - Check that the redirect URI matches exactly

3. **Google API not loading**
   - Check your internet connection
   - Ensure the Google API script is loaded before your login script

### Security Notes:

- Never commit your actual Client ID to public repositories
- Use environment variables for production deployments
- Regularly rotate your OAuth credentials
- Monitor usage in Google Cloud Console

## Production Deployment

For production deployment:

1. Update the Client ID in your build process
2. Add your production domain to authorized origins
3. Submit your app for OAuth verification if needed
4. Enable additional security features in Google Cloud Console

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Cloud Console configuration
3. Ensure all required APIs are enabled
4. Test with different browsers and devices