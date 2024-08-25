// frontend/src/components/Logout.js

import React from 'react';
import axiosInstance from '../axiosConfig';

function Logout() {
    const handleLogout = () => {
        const refreshToken = localStorage.getItem('refresh_token');
        axiosInstance
            .post('users/logout/', { refresh_token: refreshToken })
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
