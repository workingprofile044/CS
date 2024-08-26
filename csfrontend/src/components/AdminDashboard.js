import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../axiosConfig';

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosInstance
            .get('/api/users/admin-list/')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.error('Failed to fetch users:', err);
            });
    }, []);

    const handleAdminToggle = useCallback((userId, isAdmin) => {
        axiosInstance
            .patch(`/api/users/${userId}/`, { is_admin: !isAdmin })
            .then((res) => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user.id === userId ? res.data : user))
                );
            })
            .catch((err) => {
                console.error('Failed to toggle admin status:', err);
            });
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
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
        </div>
    );
}

export default AdminDashboard;
