import api, { setAuthorizationToken } from "../../AxiosInstance";

const PenaltyListModel = async (id: number) => {
    setAuthorizationToken();

    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/penalties/members/${id}`);
        
        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return []; 
    }
};

export default PenaltyListModel;