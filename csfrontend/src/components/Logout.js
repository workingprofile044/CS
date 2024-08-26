import React from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            alert('No refresh token found.');
            return;
        }

        axiosInstance
            .post('/api/users/logout/', { refresh: refreshToken }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
                onLogout();
                navigate('/login');
            })
            .catch((err) => {
                console.error('Logout failed:', err);
            });
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
