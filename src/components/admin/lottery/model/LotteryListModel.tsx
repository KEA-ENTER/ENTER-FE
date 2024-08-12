import axios from "axios";

const LotteryListModel = async (name: string, type: string, page: number) => {
    let typeEng = "ALL";
    switch (type) {
        case "회차":
            typeEng = "ROUND";
            break;
        case "차량정보":
            typeEng = "VEHICLE";
            break;
        default:
            break;
    }

    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/lotteries`, {
            params: {
              keyword: name,
              searchType: typeEng,
              page: page,
              size: 8,
            },
          });
        
          return response.data;
    } catch (error) {
        window.alert('Error:' + error);
    }
};

export default LotteryListModel;