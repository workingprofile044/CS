import React from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const refreshToken = localStorage.getItem('refresh_token');
        axiosInstance
            .post('/api/users/logout/', { refresh_token: refreshToken })
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
                navigate('/login');
            })
            .catch((err) => {
                console.error('Logout failed:', err);
            });
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
