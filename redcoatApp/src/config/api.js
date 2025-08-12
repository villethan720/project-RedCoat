const API_CONFIG = {
    // Use relative URLs to hide the actual server address
    BASE_URL: process.env.REACT_APP_API_URL,
    ENDPOINTS: {
        // Contact endpoints
        GENERAL_CONTACT: '/contact/general',
        SPONSOR_CONTACT: '/contact/sponsor',
        ADMIN_CONTACTS: '/admin/contacts',
        
        // Auth endpoints
        LOGIN: '/login',
        //REGISTER: '/register',
        //VERIFY_EMAIL: '/verify-email',
        
        // active Clothing endpoints
        CLOTHING: '/clothing/active',

        // All clothing
        ALLCLOTHING: '/clothing/all',

        //add clothing 
        ADDCLOTHING: '/clothing',

        //update clothing
        UPDATECLOTHING: '/clothing',

        //soft delete clothing (make not active)
        SOFTDELETE: '/clothing',

        //restore clothing (make active)
        RESTORECLOTHING: '/clothing/restore',
        
        // Payment endpoints
        PAYMENT: '/payment',
        
        // Image upload endpoints
        UPLOAD: '/upload',
        
        // Health check
        HEALTH: '/health'

        
    }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint, path = '') => {
    return `${API_CONFIG.BASE_URL}${endpoint}${path}`;
};

export default API_CONFIG; 