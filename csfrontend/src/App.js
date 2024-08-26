import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
                    <Route path="/upload" element={<FileUpload />} />
                    <Route path="/files" element={<FileList />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
