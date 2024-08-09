import axios from "axios";

const LotteryListModel = async (name: string, type: string, page: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/lotteries`, {
            params: {
              keyword: name,
              searchType: type,
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
