import api, { setAuthorizationToken } from "../../AxiosInstance";

const PenaltyDeleteModel = async (memberId: number, penaltyId: number | null) => {
    setAuthorizationToken();
    console.log(memberId, penaltyId)
    try {
        const response = await api.delete(`${import.meta.env.VITE_SERVER_URL}/admin/penalties/members/${memberId}/${penaltyId}`);
        
        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return []; 
    }
};

export default PenaltyDeleteModel;