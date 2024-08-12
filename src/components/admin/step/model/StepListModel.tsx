import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

// name: 검색 키워드, type: 검색 메뉴, page: 선택된 페이지
const LotteryDetailListModel = async (name: string, type: string, page: number) => {
    setAuthorizationToken();

    // 프론트에서 사용하는 한글로 된 검색 키워드를 서버용으로 변환
    let typeEng = "ALL";
    switch (type) {
        case "차량정보":
            typeEng = "VEHICLE";
            break;
        case "인수자명":
            typeEng = "MEMBER";
            break;
        default:
            break;
    }

    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/takes/reports`, {
            params: {
              keyword: name,
              searchType: typeEng,
              page: page,
              size: 8,
            },
        });
        
        console.log("데이터:", response.data);
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
};

export default LotteryDetailListModel;