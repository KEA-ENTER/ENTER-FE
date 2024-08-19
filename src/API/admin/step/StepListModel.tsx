import api, { setAuthorizationToken } from "../../AxiosInstance";

const StepListModel = async (name: string, type: string, page: number) => {
    setAuthorizationToken();

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
        
        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return []; 
    }
};

export default StepListModel;