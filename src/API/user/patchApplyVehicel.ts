import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const patchApplyVehicel = async (applyId: number, applyRoundId: number, purpose: string) => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
        const response = await axios.patch(
            `${BASE_URL}/applies/detail/${applyId}`,
            {
                applyRoundId: applyRoundId,
                purpose: purpose,
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

export default patchApplyVehicel;
