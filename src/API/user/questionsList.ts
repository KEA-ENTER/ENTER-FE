import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const questionsList = async (pages: number, type: string, userInput: string) => {
    const accessToken = sessionStorage.getItem('accessToken');

    let typeEng = "ALL";
    switch (type) {
        case "카테고리":
            typeEng = "CATEGORY";
            break;
        case "상태":
            typeEng = "STATE";
            break;
        case "작성자":
            typeEng = "WRITER";
            break;
        default:
            break;
    }

    try {
        const response = await axios.get(`${BASE_URL}/questions/list/${pages}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                keyword: userInput,
                searchType: typeEng,
            },
        });
        return response.data;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw error;
    }
};

export default questionsList;
