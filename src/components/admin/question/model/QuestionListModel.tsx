import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const QuestionListModel = async (name: string, type: string, page: number) => {
    setAuthorizationToken();

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
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/questions/list/${page}`, {
            params: {
              keyword: name,
              searchType: typeEng,
            },
        });
        
        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return null; 
    }
};

export default QuestionListModel;