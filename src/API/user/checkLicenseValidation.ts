import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const checkLicenseValidation = async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
<<<<<<< HEAD
        console.error('Access Token이 없습니다. 로그인하세요.');
=======
>>>>>>> 9a6bdd7f8d9d92b13bf11797d68d5def57636691
        return;
    }

    try {
        const response = await axios.patch(
<<<<<<< HEAD
            `${BASE_URL}/members/license`,
=======
            `${BASE_URL}/members/valid-license`,
>>>>>>> 9a6bdd7f8d9d92b13bf11797d68d5def57636691
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
