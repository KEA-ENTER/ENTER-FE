//라이브러리
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore'; //zustand 전역 state
//페이지
import Layout from '../../components/user/Layout/Layout';
import AddLicensePage from './License/AddLicensePage';
import ApplicationFormPage from './Apply/ApplicationFormPage';
import CompletedApplicationForm from './Apply/CompletedApplicationForm';
import LotteryResultPage from './LotteryResult/LotteryResultPage';
import MyPage from './MyPage/MyPage';
import QuestionListPage from './Question/QuestionListPage';
import QuestionWritePage from './Question/QuestionWritePage';
import QuestionDetailPage from './Question/QuestionDetailPage';
import RentPage from './RentReturn/RentPage';
import ReturnPage from './RentReturn/ReturnPage';
//API
import checkUserStatus from '../../API/user/checkUserStatus';
import checkLicenseValidation from '../../API/user/checkLicenseValidation';
import autoRouting from '../../API/user/autoRouting';

const UserRoutes = () => {
    const navigate = useNavigate(); //라우팅 초기 설정

    const { name, role, accessToken } = useUserStore((state) => ({
        name: state.name,
        role: state.role,
        accessToken: state.accessToken,
    }));
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        const fetchRouting = async () => {
            try {
                const userStatusResponse = await checkUserStatus();

                if (userStatusResponse.message === '1') {
                    navigate('/'); //신청일자 이동(아직 구현 안함)
                } else if (userStatusResponse.message === '2') {
                    navigate('/license'); //면허증 등록 이동
                } else if (userStatusResponse.message === '3') {
                    console.log('면허증 진위여부 판독');
                    const checkLicenseValidationResponse = await checkLicenseValidation();
                    if (checkLicenseValidationResponse != 'SUCCESS') {
                        //면허증 진위여부 확인 안되는 경우
                        navigate('/license');
                    }
                } else if (userStatusResponse) {
                    const autoRoutingResponse = await autoRouting();
                    setUser(name, role, accessToken, autoRoutingResponse.userState);
                    console.log(autoRoutingResponse.routingId);
                    console.log(autoRoutingResponse.userState);
                    if (autoRoutingResponse.routingId === 1) {
                        navigate('/application');
                    } else if (autoRoutingResponse.routingId === 2) {
                        navigate('/detail');
                    } else if (autoRoutingResponse.routingId === 3) {
                        navigate('/detail');
                    } else if (autoRoutingResponse.routingId === 4) {
                        navigate('/lottery-result');
                    }
                }
            } catch (error) {
                console.error('API 요청 중 오류가 발생했습니다:', error);
            }
        };

        fetchRouting();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="license" element={<AddLicensePage />} /> {/*면허증 등록*/}
                <Route path="application" element={<ApplicationFormPage />} /> {/*차량 신청*/}
                <Route path="detail" element={<CompletedApplicationForm />} /> {/*면허증 등록*/}
                <Route path="lottery-result" element={<LotteryResultPage />} /> {/*추첨 결과*/}
                <Route path="mypage" element={<MyPage />} /> {/*내 정보*/}
                <Route path="question" element={<QuestionListPage />} /> {/*문의*/}
                <Route path="write" element={<QuestionWritePage />} /> {/*문의 작성*/}
                <Route path="questiondetail" element={<QuestionDetailPage />} /> {/*문의 세부*/}
                <Route path="rent/:page" element={<RentPage />} /> {/*차량 인수*/}
                <Route path="return/:page" element={<ReturnPage />} /> {/*차량 반납*/}
            </Route>
        </Routes>
    );
};

export default UserRoutes;
