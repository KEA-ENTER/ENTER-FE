import api, { setAuthorizationToken } from "../../AxiosInstance";


const HomeAppliesModel = async () => {
    setAuthorizationToken();
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/applies`);
        return response.data
    } catch (error) {
        console.log('Error:' + error);
        console.log(error);
        return []; 
    }
}

export default HomeAppliesModel;