# API Configuration Setup

This guide explains how to set up the centralized API configuration system for your RedCoat application.

## Environment Variables Setup

### 1. Create a `.env` file in your `redcoatApp` directory:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3009
REACT_APP_API_URL=http://localhost:3009/api
```

### 2. Environment-Specific Configurations:

#### Development (default):
```env
REACT_APP_API_BASE_URL=http://localhost:3009
REACT_APP_API_URL=http://localhost:3009/api
```

#### Production:
```env
REACT_APP_API_BASE_URL=https://your-production-api.com
REACT_APP_API_URL=https://your-production-api.com/api
```

#### Staging:
```env
REACT_APP_API_BASE_URL=https://staging-api.yourapp.com
REACT_APP_API_URL=https://staging-api.yourapp.com/api
```

## ✅ **What's Been Implemented:**

### 1. **Centralized Configuration File** (`src/config/api.js`)
- Environment variable support for different deployment environments
- Helper functions for building API URLs
- Organized endpoint definitions

### 2. **Updated All API Calls** in:
- ✅ `ContactComponent.jsx` - Contact form submissions
- ✅ `ContactManagement.jsx` - Admin contact management
- ✅ `HomeComponent.jsx` - Clothing data fetching
- ✅ `CheckoutForm.jsx` - Payment processing
- ✅ `ImageDropZone.jsx` - Image uploads
- ✅ `api/login.js` - Authentication

### 3. **Environment Variable Support**
- Development, staging, and production configurations
- Easy switching between environments
- Secure API URL management

## Usage Examples

### Using the configuration:
```javascript
import { buildApiUrl, API_CONFIG } from '../config/api';

// Build a full API URL
const url = buildApiUrl(API_CONFIG.ENDPOINTS.CONTACT);

// Build with additional path
const url = buildApiUrl(API_CONFIG.ENDPOINTS.ADMIN_CONTACTS, '/all');
```

### Available Endpoints:
- `CONTACT` - Contact form submissions
- `ADMIN_CONTACTS` - Admin contact management
- `LOGIN` - User authentication
- `CLOTHING` - Clothing inventory
- `PAYMENT` - Payment processing
- `UPLOAD` - Image uploads

##  **Next Steps:**

1. **Create a `.env` file** in your `redcoatApp` directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3009
   REACT_APP_API_URL=http://localhost:3009/api
   ```

2. **Restart your React development server** to load the new environment variables

3. **Test all functionality** to ensure everything works correctly

##  **Benefits You Now Have:**

- **Easy Environment Switching**: Change from development to production with one file
- **Centralized Management**: All API endpoints in one place
- **Better Security**: No hardcoded URLs in your codebase
- **Professional Standards**: Industry best practices for API configuration
- **Easier Deployment**: Simple environment variable setup for different servers

Your API configuration is now production-ready and follows industry best practices! The system will automatically use the correct URLs based on your environment variables.

## Important Notes

- **React requires environment variables to start with `REACT_APP_`**
- **Environment variables are embedded at build time**
- **Changes to `.env` require restarting the development server**
- **Never commit your actual `.env` file to version control**

Your API configuration is now centralized and environment-aware! 🎉 