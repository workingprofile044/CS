import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to CS Application</h1>
            <p>This web application allows you to manage your files securely and efficiently.</p>
            <p>
                Please <Link to="/register">Register</Link> or <Link to="/login">Login</Link> to continue.
            </p>
        </div>
    );
}

export default Home;
