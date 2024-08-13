import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const QuestionAnswerModel = async (questionId: number, contentData: string) => {
    setAuthorizationToken();

    // api 불러오는 부분
    try {
        console.log("테스트 데이터: ", contentData);
        const response = await api.post(`${import.meta.env.VITE_SERVER_URL}/admin/${questionId}/answers`, {
            content: contentData
        }
    );
        console.log("대답: ", response);
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response.data);  // 자세한 오류 로그를 출력
        window.alert('Error:' + error);
        return []; 
    }
};

export default QuestionAnswerModel;