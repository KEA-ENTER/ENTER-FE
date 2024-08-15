import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const getDetail = async (page: number = 0, size: number = 1, sort: string = 'createdAt') => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${BASE_URL}/penalties`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                page,
                size,
                sort,
            },
        });
        return response.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};

export default getDetail;
