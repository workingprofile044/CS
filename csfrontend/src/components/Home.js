import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Добро пожаловать в приложение CS</h1>
            <p>Это веб-приложение позволяет вам управлять своими файлами.</p>
            <p>
                Пожалуйста, <Link to="/register">Зарегистрируйтесь</Link> или <Link to="/login">Войдите</Link> для продолжения.
            </p>
            <p>
                Исходный код проекта доступен на <a href="https://github.com/workingprofile044/CS">GitHub</a>.
            </p>
        </div>
    );
}

export default Home;

