import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ isAuthenticated }) {
    return (
        <nav>
            <Link to="/">Home</Link>
            {!isAuthenticated && <Link to="/register">Register</Link>}
            {!isAuthenticated && <Link to="/login">Login</Link>}
            {isAuthenticated && <Link to="/upload">Upload</Link>}
            {isAuthenticated && <Link to="/files">Files</Link>}
            {isAuthenticated && <Link to="/logout">Logout</Link>}
        </nav>
    );
}

export default Navigation;
