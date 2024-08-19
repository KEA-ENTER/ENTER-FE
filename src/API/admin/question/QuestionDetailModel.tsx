import api, { setAuthorizationToken } from "../../AxiosInstance";

const QuestionDetailModel = async (questionId: number) => {
    setAuthorizationToken();
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/questions/${questionId}`);
        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return null; 
    }
};

export default QuestionDetailModel;