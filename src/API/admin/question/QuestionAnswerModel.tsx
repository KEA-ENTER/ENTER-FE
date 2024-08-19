import api, { setAuthorizationToken } from "../../AxiosInstance";

const QuestionAnswerModel = async (questionId: number, contentData: string) => {
    setAuthorizationToken();
    try {
        const response = await api.post(`${import.meta.env.VITE_SERVER_URL}/admin/${questionId}/answers`, {
            content: contentData
        }
    );
        return response.data;
    } catch (error) {
        console.error('Error response:', error);
        console.log('Error:' + error);
        return null; 
    }
};

export default QuestionAnswerModel;