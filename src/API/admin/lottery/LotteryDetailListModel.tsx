import api, { setAuthorizationToken } from "../../AxiosInstance";

const LotteryDetailListModel = async (name: string, type: string, page: number, applyRoundId: string | undefined) => {
    setAuthorizationToken();

    let typeEng = "ALL";
    switch (type) {
        case "아이디":
            typeEng = "ID";
            break;
        case "신청자명":
            typeEng = "NAME";
            break;
        default:
            break;
    }

    try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/admin/lotteries/${applyRoundId}`, {
            params: {
              keyword: name,
              searchType: typeEng,
              page: page,
              size: 8,
            },
        });
        
        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return null; 
    }
};

export default LotteryDetailListModel;