# ITConnect Deployment Guide

This guide provides instructions for deploying the ITConnect application to various environments.

## Prerequisites

- Basic knowledge of web hosting and domain management
- A domain name (optional for production deployment)
- Web hosting service or server space

## Local Deployment

### Using a Simple HTTP Server

1. Install Node.js if you haven't already
2. Navigate to the project directory in your terminal
3. Run one of the following commands:
   - Using npx: `npx serve`
   - Using Node.js http-server: `npx http-server`
4. Access the application at `http://localhost:3000` (or the port specified by your server)

### Using Visual Studio Code Live Server

1. Install the Live Server extension in VS Code
2. Open the project in VS Code
3. Right-click on `index.html` and select "Open with Live Server"
4. The application will open in your default browser

## Production Deployment

### Shared Hosting

1. Obtain access to your web hosting account
2. Upload all project files to your hosting server using FTP or the hosting control panel
3. Ensure the files are placed in the appropriate directory (usually `public_html`, `www`, or `htdocs`)
4. Access your website using your domain name

### GitHub Pages

1. Create a GitHub repository for your project
2. Push your code to the repository
3. Go to the repository settings
4. Scroll down to the GitHub Pages section
5. Select the branch you want to deploy (usually `main` or `master`)
6. Click Save
7. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Click "New site from Git"
3. Connect to your GitHub repository
4. Configure build settings (not required for this project as it's static)
5. Click "Deploy site"
6. Your site will be available at a Netlify subdomain
7. You can configure a custom domain in the site settings

### Vercel

1. Create an account on [Vercel](https://vercel.com/)
2. Click "Import Project"
3. Connect to your GitHub repository
4. Configure project settings
5. Click "Deploy"
6. Your site will be available at a Vercel subdomain
7. You can configure a custom domain in the project settings

## Configuration for Production

### Social Login Configuration

Before deploying to production, update your social login configurations:

1. Update Google OAuth settings in Google Cloud Console:
   - Add your production domain to authorized JavaScript origins
   - Add your production redirect URI

2. Update Facebook App settings:
   - Add your production domain to app domains
   - Add your production redirect URI

3. Update the client IDs and app IDs in your code:
   - Update Google client ID in `login.js`
   - Update Facebook app ID in `login.html`

Refer to `SOCIAL_LOGIN_SETUP.md` for detailed instructions.

### Security Considerations

1. Use HTTPS for production deployments
2. Consider implementing environment variables for sensitive information
3. Regularly update dependencies and libraries
4. Implement proper error handling and logging

## Troubleshooting

### Common Issues

1. **Social Login Not Working**
   - Verify that your domain is properly configured in Google Cloud Console and Facebook Developers
   - Check browser console for specific error messages

2. **CSS or JavaScript Not Loading**
   - Ensure file paths are correct
   - Check for 404 errors in the browser console
   - Verify that your server is properly configured to serve static files

3. **Cross-Origin Resource Sharing (CORS) Issues**
   - If you're experiencing CORS issues, ensure your server is properly configured
   - For local development, use a local server instead of opening files directly

### Getting Help

If you encounter issues not covered in this guide, please:

1. Check the browser console for error messages
2. Review the documentation
3. Create an issue in the project repository with detailed information about the problem