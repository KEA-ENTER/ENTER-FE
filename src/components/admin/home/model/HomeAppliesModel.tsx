import axios from "axios";

const HomeAppliesModel = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/applies`);
        return response.data
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
}

export default HomeAppliesModel;