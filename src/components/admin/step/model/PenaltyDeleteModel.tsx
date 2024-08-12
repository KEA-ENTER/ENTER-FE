import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const PenaltyDeleteModel = async (memberId: number, penaltyId: number | null) => {
    setAuthorizationToken();
    console.log(memberId, penaltyId)
    try {
        const response = await api.delete(`${import.meta.env.VITE_SERVER_URL}/admin/penalties/members/${memberId}/${penaltyId}`);
        
        console.log("데이터:", response.data);
        return response.data;
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
};

export default PenaltyDeleteModel;