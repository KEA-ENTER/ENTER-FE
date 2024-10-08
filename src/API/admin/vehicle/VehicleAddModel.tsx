import api, { setAuthorizationToken } from "../../AxiosInstance";

const VehicleAddModel = async (vehicleNo: string, company: string, model: string, seats: string, fuel: string, img: File | null, state: string) => {
    setAuthorizationToken();

    const jsonData = {
        vehicleNo: vehicleNo,
        company: company,
        model: model,
        seats: seats,
        fuel: fuel,
        state: state,
    };

    const formData = new FormData();
    const json = JSON.stringify(jsonData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("data", blob);
    if (img) { formData.append('image', img, img.name); }

    try {
        const response = await api.post(`${import.meta.env.VITE_SERVER_URL}/admin/vehicles`, formData);
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

export default VehicleAddModel;
