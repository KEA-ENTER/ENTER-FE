import { NavigateFunction } from 'react-router-dom';

const navigateBasedOnRoutingId = (routingId: number, navigate: NavigateFunction) => {
    switch (routingId) {
        case 1:
            navigate('/application'); // 차량 신청 페이지
            break;
        case 2:
            navigate('/detail'); // 신청서 조회 페이지
            break;
        case 3:
            navigate('/detail'); // 신청서 조회 페이지
            break;
        case 4:
            navigate('/lottery-result'); // 추첨 결과 페이지
            break;
        default:
            console.error('알 수 없는 routingId:', routingId);
            break;
    }
};

export default navigateBasedOnRoutingId;
