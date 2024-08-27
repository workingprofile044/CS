import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../axiosConfig';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance
            .get('users/admin-list/')
            .then((res) => {
                setUsers(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch users:', err);
                setErrorMessage('Failed to fetch users. Please try again later.');
                setIsLoading(false);
            });
    }, []);

    const handleAdminToggle = useCallback((userId, isAdmin) => {
        axiosInstance
            .patch(`api/users/${userId}/`, { is_admin: !isAdmin })
            .then((res) => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user.id === userId ? res.data : user))
                );
                setErrorMessage(''); // Clear any previous errors
            })
            .catch((err) => {
                console.error('Failed to toggle admin status:', err);
                setErrorMessage('Failed to toggle admin status. Please try again.');
            });
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {isLoading ? (
                <p>Loading users...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.username} - {user.full_name} - {user.is_admin ? 'Admin' : 'User'}
                            <button onClick={() => handleAdminToggle(user.id, user.is_admin)}>
                                {user.is_admin ? 'Revoke Admin' : 'Make Admin'}
                            </button>
                            <ul>
                                <li>Number of Files: {user.file_count}</li>
                                <li>Total Storage Used: {user.storage_used} MB</li>
                                <li><a href={`/admin/manage-files/${user.id}`}>Manage Files</a></li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminDashboard;
