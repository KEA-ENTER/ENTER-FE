import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const VehicleListModel = async (name: string, type: string, page: number) => {
    setAuthorizationToken();

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
        
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
};

export default VehicleListModel;