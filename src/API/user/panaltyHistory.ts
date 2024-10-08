import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const panaltyHistory = async (page: number = 0) => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${BASE_URL}/penalties`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                page,
            },
        });

        return response.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};

export default panaltyHistory;
