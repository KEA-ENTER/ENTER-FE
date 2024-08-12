import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

// name: 검색 키워드, type: 검색 메뉴, page: 선택된 페이지
const VehicleListModel = async (name: string, type: string, page: number) => {
    setAuthorizationToken();

    // 프론트에서 사용하는 한글로 된 검색 키워드를 서버용으로 변환
    let typeEng = "ALL";
    switch (type) {
        case "차량번호":
            typeEng = "VEHICLE";
            break;
        case "모델":
            typeEng = "MODEL";
            break;
        case "상태":
            typeEng = "STATE";
            break;
        default:
            break;
    }

    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/vehicles`, {
            params: {
              word: name,
              searchCategory: typeEng,
              page: page
            },
        });
        
        console.log("데이터:", response.data);
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
};

export default VehicleListModel;