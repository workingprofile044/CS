// frontend/src/components/Register.js

import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post('users/register/', formData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" onChange={handleChange} required />
            <input type="text" name="full_name" onChange={handleChange} required />
            <input type="email" name="email" onChange={handleChange} required />
            <input type="password" name="password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
