const API_CONFIG = {
    // Use relative URLs to hide the actual server address
    BASE_URL: process.env.REACT_APP_API_URL,
    ENDPOINTS: {
        // Contact endpoints
        CONTACT: '/contact',
        ADMIN_CONTACTS: '/admin/contacts',
        
        // Auth endpoints
        LOGIN: '/login',
        //REGISTER: '/register',
        //VERIFY_EMAIL: '/verify-email',
        
        // Clothing endpoints
        CLOTHING: '/clothing',
        
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