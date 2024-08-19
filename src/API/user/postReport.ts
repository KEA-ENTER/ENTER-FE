import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const postReport = async (
    frontImg: File,
    rightImg: File,
    backImg: File,
    leftImg: File,
    dashboardImg: File,
    note: string,
    parkingLoc: string,
    type: 'TAKE' | 'RETURN',
) => {
    const accessToken = sessionStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('front_img', frontImg);
    formData.append('right_img', rightImg);
    formData.append('back_img', backImg);
    formData.append('left_img', leftImg);
    formData.append('dashboard_img', dashboardImg);
    formData.append('note', note);
    formData.append('parking_loc', parkingLoc);

    try {
        const response = await axios.post(`${BASE_URL}/vehicles/reports`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
            params: {
                type: type,
            },
        });

        return response.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};

export default postReport;
