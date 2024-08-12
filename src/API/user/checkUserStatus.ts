import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

interface userStatus {
    code: string;
    message: string;
}

const checkUserStatus = async (): Promise<userStatus> => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.get<userStatus>(`${BASE_URL}/members/license`, {
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

export default checkUserStatus;
