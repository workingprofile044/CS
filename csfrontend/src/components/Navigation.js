import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ isAuthenticated }) {
    console.log('isAuthenticated:', isAuthenticated);
    return (
        <nav>
            <a href="/">Home</a>
            {!isAuthenticated && <a href="/register">Register</a>}
            {!isAuthenticated && <a href="/login">Login</a>}
            {isAuthenticated && <a href="/upload">Upload</a>}
            {isAuthenticated && <a href="/files">Files</a>}
            {isAuthenticated ? <a href="/logout">Logout</a> : <a href="/login">Login</a>}
        </nav>
    );
}

export default Navigation;
