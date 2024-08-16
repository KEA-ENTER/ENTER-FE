import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const VehicleDeleteModel = async (id: string | undefined) => {
    setAuthorizationToken();
    console.log('삭제', id);
    try {
        const response = await api.delete(`${import.meta.env.VITE_SERVER_URL}/admin/vehicles/${id}` );
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        return null;
    }
};

export default VehicleDeleteModel;
