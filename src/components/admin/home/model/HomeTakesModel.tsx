import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const HomeTakesModel = async () => {
    setAuthorizationToken();
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/takes`);
        return response.data
    } catch (error) {
        console.log('Error:' + error);
        return []; 
    }
}

export default HomeTakesModel;