import axios from "axios";

const HomeTakesModel = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/takes`);
        return response.data
    } catch (error) {
        window.alert('Error:' + error);
        return []; 
    }
}

export default HomeTakesModel;