// frontend/src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to Our Application</h1>
            <p>This is a web application that allows you to manage your files securely and efficiently.</p>
            <p>Please <Link to="/register">Register</Link> or <Link to="/login">Login</Link> to continue.</p>
        </div>
    );
}

export default Home;
