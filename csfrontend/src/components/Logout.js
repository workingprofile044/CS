import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

function Logout({ onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            onLogout();
            navigate('/login');
        } else {
            axiosInstance
                .post('/api/users/logout/', { refresh_token: refreshToken })
                .then(() => {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    delete axiosInstance.defaults.headers['Authorization'];
                    onLogout();
                    navigate('/login');
                })
                .catch((err) => {
                    console.error('Logout failed:', err);
                    onLogout();
                    navigate('/login');
                });
        }
    }, [navigate, onLogout]);

    return <p>Logging out...</p>;
}

export default Logout;
