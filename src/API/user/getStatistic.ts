import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const token = sessionStorage.getItem('accessToken');

export const fetchCompetitionData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/lotteries/competition-rate`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('경쟁률 데이터를 가져오는 데 실패했습니다:', error);
        throw error;
    }
};

export const fetchWaitingData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/lotteries/average-waiting-numbers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('대기 수 데이터를 가져오는 데 실패했습니다:', error);
        throw error;
    }
};

export const fetchPercentage = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/members/score`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return (response.data.scorePercentile * 100).toFixed(2);
    } catch (error) {
        console.error('확률 데이터를 가져오는 데 실패했습니다:', error);
        throw error;
    }
};
