import api, { setAuthorizationToken } from "../../../API/AxiosInstance";

const CompetitionData = async () => {
    setAuthorizationToken();
    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/lotteries/competition-rate`);
        return response.data
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
}

export default CompetitionData;