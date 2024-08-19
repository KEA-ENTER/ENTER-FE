import { useNavigate } from 'react-router-dom';
import autoRouting from '../API/user/autoRouting';

const useAutoRouting = () => {
    const navigate = useNavigate();

    const autoRoutingFunc = async () => {
        const autoRoutingResponse = await autoRouting(); // 자동 라우팅 API 호출
        sessionStorage.setItem('autoRoutingPage', autoRoutingResponse.routingId.toString()); // 세션에 정보 저장
        switch (autoRoutingResponse.routingId) {
            case 1:
                navigate('/application'); // 차량 신청 페이지
                break;
            case 2:
                navigate('/detail'); // 신청서 조회 페이지
                break;
            case 3:
                navigate('/not-apply'); // 신청일자 경고 페이지
                break;
            case 4:
                navigate('/lottery-result'); // 추첨 결과 페이지
                break;
            default:
                console.error('알 수 없는 routingId:', autoRoutingResponse.routingId);
                break;
        }
    };

    return { autoRoutingFunc };
};

export default useAutoRouting;
