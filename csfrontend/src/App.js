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

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + token;
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Remove token
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div>
                <Navigation isAuthenticated={isAuthenticated} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/upload" element={isAuthenticated ? <FileUpload /> : <Navigate to="/login" />} />
                    <Route path="/files" element={isAuthenticated ? <FileList /> : <Navigate to="/login" />} />
                    <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                    {isAuthenticated && <Route path="*" element={<Navigate to="/files" />} />} {/* Redirect if logged in */}
                    {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />} {/* Redirect if not logged in */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
