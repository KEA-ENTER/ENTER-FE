import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

// name: 검색 키워드, type: 검색 메뉴, page: 선택된 페이지
const QuestionListModel = async (name: string, type: string, page: number) => {
    setAuthorizationToken();

    // 프론트에서 사용하는 한글로 된 검색 키워드를 서버용으로 변환
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

    // api 불러오는 부분
    // import.meta.env.VITE_SERVER_URL: 우리 서버 url
    // api.get => api: 다현이가 작성한 axios 모듈(안에 디폴트로 토큰이 들어가 있음) / get: http 메소드 종류 - post, patch 등으로 변경 가능
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/questions/list/${page}`, {
            params: {
              keyword: name,
              searchType: typeEng,
            },
        });
        
        console.log("데이터:", response.data);
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
};

export default QuestionListModel;