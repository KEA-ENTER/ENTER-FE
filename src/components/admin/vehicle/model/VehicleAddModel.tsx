import api, { setAuthorizationToken } from "../../../../API/AxiosInstance";

const VehicleAddModel = async (vehicleNo: string, company: string, model: string, seats: string, fuel: string, img: file, state: string) => {
    setAuthorizationToken();
    
    const formData = new FormData();
    formData.append('vehicleNo', vehicleNo);
    formData.append('company', company);
    formData.append('model', model);
    formData.append('seats', seats);
    formData.append('fuel', fuel);
    formData.append('state', state);
    
    if (img) {
        formData.append('multipartFile', img);
    }

    console.log(typeof img)
    console.log(formData)

    try {
        const response = await api.post(`${import.meta.env.VITE_SERVER_URL}/admin/vehicles`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data;
    } catch (error) {
        window.alert('Error: ' + error);
        return null; 
    }
};

export default VehicleAddModel;