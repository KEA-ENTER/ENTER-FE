import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const getDetail = async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${BASE_URL}/applies/detail`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

export default getDetail;
