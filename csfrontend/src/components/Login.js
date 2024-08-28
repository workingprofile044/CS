function Login({ onLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axiosInstance
            .post('/api/users/login/', formData)
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.access;
                onLogin();  // Update the authenticated state
                navigate("/files");
            })
            .catch((err) => {
                console.error(err);
                alert("Не удалось войти. Проверьте свои данные и попробуйте еще раз.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Имя пользователя"
                onChange={handleChange}
                value={formData.username}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={handleChange}
                value={formData.password}
                required
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Вход...' : 'Войти'}
            </button>
        </form>
    );
}

export default Login;
