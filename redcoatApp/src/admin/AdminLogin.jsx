import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { buildApiUrl } from '../config/api';
import API_CONFIG from '../config/api';
import { useAuth } from '../components/AuthContext';

const AdminLogin = () => {
    //set variables for login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN), 
                { email, password }
            ); //API call

            login(res.data.token); // Use AuthContext to store token
            navigate('/admin-dashboard');
        } catch (err){
            alert('Login failed: ' + err.response.data.message);
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-md"> {/* Form for login */}
                <h2 className="text-2xl mb-4">Admin Login</h2>
                {/* Email */}
                <input
                    type="email"
                    placeholder="email"
                    className="block mb-2 p-2 w-full bg-gray-700 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    className="block mb-4 p-2 w-full bg-gray-700 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-red-600 px-4 py-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;