function Register() {
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear errors for the field being updated
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        axiosInstance
            .post('/api/users/register/', formData)
            .then((res) => {
                console.log(res.data);
                navigate('/login');
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    setErrors(err.response.data);
                } else {
                    console.error(err);
                    alert("Не удалось зарегистрироваться. Попробуйте еще раз.");
                }
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
            {errors.username && <p className="error">{errors.username}</p>}
            <input
                type="text"
                name="full_name"
                placeholder="Полное имя"
                onChange={handleChange}
                value={formData.full_name}
                required
            />
            {errors.full_name && <p className="error">{errors.full_name}</p>}
            <input
                type="email"
                name="email"
                placeholder="Электронная почта"
                onChange={handleChange}
                value={formData.email}
                required
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <input
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={handleChange}
                value={formData.password}
                required
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}

export default Register;
