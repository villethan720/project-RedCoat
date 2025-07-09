import React from 'react';
import { Navigate } from 'react-router-dom';

// Get verification token and save it for session or direct to login
const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    return token ? children : <Navigate to="/admin-login"/>;
};

export default AdminRoute;