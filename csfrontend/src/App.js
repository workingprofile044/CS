import axiosInstance from './axiosConfig';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import Logout from './components/Logout';
import AdminDashboard from './components/AdminDashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + token;
            setIsAuthenticated(true);
            // Check if the user is an admin
            axiosInstance.get('/api/users/admin-list/')
                .then(response => {
                    setIsAdmin(true);
                })
                .catch(() => {
                    setIsAdmin(false);
                });
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div>
                <Navigation isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/upload" element={isAuthenticated ? <FileUpload /> : <Navigate to="/login" />} />
                    <Route path="/files" element={isAuthenticated ? <FileList /> : <Navigate to="/login" />} />
                    <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                    <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} /> {/* Admin Route */}
                    {isAuthenticated && <Route path="*" element={<Navigate to="/files" />} />}
                    {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
