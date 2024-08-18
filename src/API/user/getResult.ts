// src/api/lottery.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

interface Response {
    winning: boolean;
    waitingNumber: number | null;
}

const getResult = async (): Promise<Response> => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.get<Response>(`${BASE_URL}/lotteries/result`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching lottery result:', error);
        throw error;
    }
};

export default getResult;
