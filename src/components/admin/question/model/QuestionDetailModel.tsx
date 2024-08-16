import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const QuestionDetailModel = async (questionId: number) => {
    setAuthorizationToken();
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/questions/${questionId}`);
        
        console.log("데이터:", response.data);
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return null; 
    }
};

export default QuestionDetailModel;