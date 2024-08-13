import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const checkLicenseValidation = async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
        console.error('Access Token이 없습니다. 로그인하세요.');
        return;
    }

    try {
        const response = await axios.patch(
            `${BASE_URL}/members/license`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};

export default checkLicenseValidation;
