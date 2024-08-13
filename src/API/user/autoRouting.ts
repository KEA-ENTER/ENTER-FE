import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

interface AutoRoutingResponse {
    routingId: number;
    userState: string;
}

const autoRouting = async (): Promise<AutoRoutingResponse> => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.get<AutoRoutingResponse>(`${BASE_URL}/members/routing`, {
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

export default autoRouting;
