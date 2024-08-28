function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance
            .get('/api/users/admin-list/')
            .then((res) => {
                setUsers(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch users:', err);
                setErrorMessage('Не удалось загрузить список пользователей. Попробуйте позже.');
                setIsLoading(false);
            });
    }, []);

    const handleAdminToggle = useCallback((userId, isAdmin) => {
        axiosInstance
            .patch(`/api/users/${userId}/`, { is_admin: !isAdmin })
            .then((res) => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user.id === userId ? res.data : user))
                );
                setErrorMessage(''); // Clear any previous errors
            })
            .catch((err) => {
                console.error('Failed to toggle admin status:', err);
                setErrorMessage('Не удалось изменить статус администратора. Попробуйте еще раз.');
            });
    }, []);

    return (
        <div>
            <h2>Панель администратора</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {isLoading ? (
                <p>Загрузка пользователей...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.username} - {user.full_name} - {user.is_admin ? 'Администратор' : 'Пользователь'}
                            <button onClick={() => handleAdminToggle(user.id, user.is_admin)}>
                                {user.is_admin ? 'Лишить прав администратора' : 'Назначить администратором'}
                            </button>
                            <ul>
                                <li>Количество файлов: {user.file_count}</li>
                                <li>Используемое место: {user.storage_used} МБ</li>
                                <li><a href={`/admin/manage-files/${user.id}`}>Управление файлами</a></li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminDashboard;
