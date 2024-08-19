import api, { setAuthorizationToken } from "../../AxiosInstance";

const RentReportModel = async (id: string) => {
    setAuthorizationToken();

    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/takes/reports/take`, {
            params: {
                winningId: id
            },
        });
        
        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return null; 
    }
};

export default RentReportModel;