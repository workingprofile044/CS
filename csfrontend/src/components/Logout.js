import React from 'react';
import axiosInstance from '../axiosConfig';
import { useHistory } from 'react-router-dom';

function Logout() {
    const history = useHistory();

    const handleLogout = () => {
        const refreshToken = localStorage.getItem('refresh_token');
        axiosInstance
            .post('/api/users/logout/', { refresh_token: refreshToken })
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
                history.push('/login');  // Redirect to login page
            })
            .catch((err) => {
                console.error('Logout failed:', err);
                // Optionally, provide user feedback here
            });
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;

