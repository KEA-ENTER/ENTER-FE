import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

// name: 검색 키워드, type: 검색 메뉴, page: 선택된 페이지
const QuestionDetailModel = async (questionId: number) => {
    setAuthorizationToken();

    // api 불러오는 부분
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/questions/${questionId}`);
        
        console.log("데이터:", response.data);
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
};

export default QuestionDetailModel;