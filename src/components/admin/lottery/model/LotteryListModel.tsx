import axios from "axios";

const LotteryListModel = async (page: number, name: string, position: number) => {
    const response = await axios.get('/api/data', {
      params: {
        page: page,
        name: name,
        position: position,
      },
    })
  
    return response.data
}

export default LotteryListModel;