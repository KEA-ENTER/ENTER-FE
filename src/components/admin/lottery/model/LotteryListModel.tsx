import axios from "axios";

const LotteryListModel = async (page: number, name: string, position: number) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}`, {
      params: {
        page: page,
        name: name,
        position: position,
      },
    })
  
    return response.data
}

export default LotteryListModel;