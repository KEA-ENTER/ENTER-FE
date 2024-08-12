import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const addLicense = async (licenseCode: string, licensePassword: string) => {
    const accessToken = sessionStorage.getItem('accessToken');
    console.log('licenseCode: ' + licenseCode);
    console.log('licensePassword: ' + licensePassword);

    try {
        const response = await axios.post(
            `${BASE_URL}/members/license`,
            {
                memberId: 0,
                licenseId: licenseCode,
                licensePassword: licensePassword,
                isAgreeTerms: true,
            },
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

export default addLicense;
