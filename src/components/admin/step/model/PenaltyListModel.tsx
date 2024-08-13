import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const PenaltyListModel = async (id: number) => {
    setAuthorizationToken();

    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/penalties/members/${id}`);
        
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
};

export default PenaltyListModel;