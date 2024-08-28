function Navigation({ isAuthenticated, isAdmin }) {
    console.log('isAuthenticated:', isAuthenticated);
    return (
        <nav>
            <Link to="/">Главная</Link>
            {!isAuthenticated && <Link to="/register">Регистрация</Link>}
            {!isAuthenticated && <Link to="/login">Вход</Link>}
            {isAuthenticated && <Link to="/upload">Загрузить файл</Link>}
            {isAuthenticated && <Link to="/files">Мои файлы</Link>}
            {isAdmin && <Link to="/admin">Панель администратора</Link>}
            {isAuthenticated ? <Link to="/logout">Выход</Link> : <Link to="/login">Вход</Link>}
        </nav>
    );
}

export default Navigation;

