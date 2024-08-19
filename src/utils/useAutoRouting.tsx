//API를 통해 사용자가 기본적으로 라우팅 되어야 되는 페이지를 받아오고, 해당 페이지로 이동시키는 훅 입니다.

import { useNavigate } from 'react-router-dom';
import autoRouting from '../API/user/autoRouting';
import navigateBasedOnRoutingId from './navigateOnRoutingId';

const useAutoRouting = () => {
    const navigate = useNavigate();

    const autoRoutingFunc = async () => {
        console.log('ON FUNC');
        const autoRoutingResponse = await autoRouting(); // 자동 라우팅 API 호출
        console.log('autoRoutingResponse', autoRoutingResponse);
        sessionStorage.setItem('autoRoutingPage', autoRoutingResponse.routingId.toString()); // 세션에 정보 저장
        navigateBasedOnRoutingId(autoRoutingResponse.routingId, navigate); // API 호출 결과를 바탕으로 라우팅
    };

    return { autoRoutingFunc };
};

export default useAutoRouting;
