function Logout({ onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            onLogout();
            navigate('/login');
        } else {
            axiosInstance
                .post('/api/users/logout/', { refresh_token: refreshToken })
                .then(() => {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    delete axiosInstance.defaults.headers['Authorization'];
                    onLogout();
                    navigate('/login');
                })
                .catch((err) => {
                    console.error('Не удалось выйти:', err);
                    onLogout();
                    navigate('/login');
                });
        }
    }, [navigate, onLogout]);

    return <p>Выход...</p>;
}

export default Logout;
