import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const getAppliesDate = async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${BASE_URL}/applies`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        return [];
    }
};

export default getAppliesDate;
