import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const questionDetail = async (questionId: number) => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${BASE_URL}/questions/${questionId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};

export default questionDetail;
