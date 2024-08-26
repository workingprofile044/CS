import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import Navigation from './components/Navigation';
import Logout from './components/Logout';

function App() {
    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <Router>
            <div>
                <Navigation isAuthenticated={isAuthenticated} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/upload" element={isAuthenticated ? <FileUpload /> : <Navigate to="/login" />} />
                    <Route path="/files" element={isAuthenticated ? <FileList /> : <Navigate to="/login" />} />
                    <Route path="/logout" element={isAuthenticated ? <Logout /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
