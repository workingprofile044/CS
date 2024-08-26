import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://89.111.175.161:8000',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;