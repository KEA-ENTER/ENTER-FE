import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000,
});

export const setAuthorizationToken = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    console.log(accessToken)
    if (accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;
