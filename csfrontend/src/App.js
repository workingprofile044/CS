import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

function App() {
    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <Router>
            <div>
                <nav>
                    <a href="/">Home</a>
                    {!isAuthenticated && <a href="/register">Register</a>}
                    {!isAuthenticated && <a href="/login">Login</a>}
                    {isAuthenticated && <a href="/upload">Upload</a>}
                    {isAuthenticated && <a href="/files">Files</a>}
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/upload" element={<FileUpload />} />
                    <Route path="/files" element={<FileList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

