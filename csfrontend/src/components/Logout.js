import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

function Logout({ onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            navigate('/login');
            return;
        }

        axiosInstance
            .post('/api/users/logout/', { refresh: refreshToken })
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
                onLogout();
                navigate('/login');
            })
            .catch((err) => {
                console.error('Logout failed:', err);
                navigate('/login');
            });
    }, [navigate, onLogout]);

    return <p>Logging out...</p>;
}

export default Logout;
