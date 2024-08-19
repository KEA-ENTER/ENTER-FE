import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const deleteApplication = async (applyId: number) => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.delete(`${BASE_URL}/applies/detail/${applyId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.error('Unauthorized: 인증되지 않은 사용자입니다.');
        }
        throw error;
    }
};

export default deleteApplication;
