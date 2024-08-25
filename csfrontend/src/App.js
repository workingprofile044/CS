import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    {/* Navigation menu with conditional rendering based on authentication state */}
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
