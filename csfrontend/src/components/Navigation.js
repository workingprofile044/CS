import React from 'react';

function Navigation({ isAuthenticated }) {
    return (
        <nav>
            <a href="/">Home</a>
            {!isAuthenticated && <a href="/register">Register</a>}
            {!isAuthenticated && <a href="/login">Login</a>}
            {isAuthenticated && <a href="/upload">Upload</a>}
            {isAuthenticated && <a href="/files">Files</a>}
            {isAuthenticated && <a href="/logout">Logout</a>}
        </nav>
    );
}

export default Navigation;
