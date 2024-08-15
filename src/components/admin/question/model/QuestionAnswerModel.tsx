import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

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
        window.alert('Error:' + error);
        return []; 
    }
};

export default QuestionAnswerModel;