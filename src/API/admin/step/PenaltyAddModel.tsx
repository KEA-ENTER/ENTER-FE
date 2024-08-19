import api, { setAuthorizationToken } from "../../AxiosInstance";

const PenaltyAddModel = async (id: number, reason: string, level: string, etc: string) => {
    setAuthorizationToken();

    let reasonEng = "ETC";
    switch (reason) {
        case "인수":
            reasonEng = "TAKE";
            break;
        case "반납":
            reasonEng = "RETURN";
            break;
        case "연료":
            reasonEng = "FUEL";
            break;
        case "파손":
            reasonEng = "BROKEN";
            break;
        case "기타":
            reasonEng = "ETC";
            break;
        default:
            break;        
    }
    let levelEng = "MINIMUM";
    switch (level) {
        case "매우 낮음":
            levelEng = "MINIMUM";
            break;
        case "낮음":
            levelEng = "LOW";
            break;
        case "보통":
            levelEng = "MEDIUM";
            break;
        case "높음":
            levelEng = "HIGH";
            break;
        case "블랙리스트":
            levelEng = "BLACKLIST";
            break;
        default:
            break;        
    }

    try {
        const response = await api.post(`${import.meta.env.VITE_SERVER_URL}/admin/penalties/members/${id}`, {
            reason: reasonEng,
            level: levelEng,
            etc: etc
        }
    );
        return response.data;
    } catch (error) {
        console.log('Error:' + error);
        return null;
    }
};

export default PenaltyAddModel;