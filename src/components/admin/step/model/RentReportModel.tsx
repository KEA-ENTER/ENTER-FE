import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

// name: 검색 키워드, type: 검색 메뉴, page: 선택된 페이지
const RentReportModel = async (id: string) => {
    setAuthorizationToken();

    // api 불러오는 부분
    // import.meta.env.VITE_SERVER_URL: 우리 서버 url
    // api.get => api: 다현이가 작성한 axios 모듈(안에 디폴트로 토큰이 들어가 있음) / get: http 메소드 종류 - post, patch 등으로 변경 가능
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/takes/reports/take`, {
            params: {
                winningId: id
            },
        });
        
        console.log("데이터:", response.data);
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
};

export default RentReportModel;