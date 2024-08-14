import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const HomeAppliesModel = async () => {
    setAuthorizationToken();
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/applies`);
        return response.data
    } catch (error) {
        window.alert('Error:' + error);
        console.log(error);
        return []; 
    }
}

export default HomeAppliesModel;