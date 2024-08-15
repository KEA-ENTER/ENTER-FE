import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const ReturnReportModel = async (id: string) => {
    setAuthorizationToken();

    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/takes/reports/return`, {
            params: {
                winningId: id
            },
        });
        
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return null; 
    }
};

export default ReturnReportModel;