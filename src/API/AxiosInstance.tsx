import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000,
});

export const setAuthorizationToken = () => {
    // 세션에 저장되어 있는 토큰을 가져온다.
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) { // 토큰이 존재하면 헤더에 토큰을 넣는다.
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;
