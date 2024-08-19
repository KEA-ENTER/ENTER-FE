import api, { setAuthorizationToken } from "../../../API/AxiosInstance";

const StatisticsData = async () => {
    setAuthorizationToken();
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/lotteries/average-waiting-numbers`);
        return response.data
    } catch (error) {
        console.log('Error:' + error);
        return []; 
    }
}

export default StatisticsData;