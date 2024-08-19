import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const VehicleDetailtModel = async (vehicleId: string | undefined) => {
    setAuthorizationToken();

    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/vehicles/${vehicleId}`, {
            params: {
              vehicleId: vehicleId
            },
        });

        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return null; 
    }
};

export default VehicleDetailtModel;