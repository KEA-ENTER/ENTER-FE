import api, { setAuthorizationToken } from "../../../API/AxiosInstance";

const PercentageModel = async () => {
    setAuthorizationToken();
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/members/score`);
        return response.data
    } catch (error) {
        console.log('Error:' + error);
        return 100; 
    }
}

export default PercentageModel;