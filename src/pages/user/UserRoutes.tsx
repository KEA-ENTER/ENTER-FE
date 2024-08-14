//라이브러리
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
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
import checkUserStatus from '../../API/user/checkUserStatus';
import checkLicenseValidation from '../../API/user/checkLicenseValidation';
import autoRouting from '../../API/user/autoRouting';
import navigateBasedOnRoutingId from '../../utils/navigateOnRoutingId';

const UserRoutes = () => {
    const navigate = useNavigate();

    const { name } = useUserStore((state) => ({
        name: state.name,
    }));
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        const fetchRouting = async () => {
            try {
                const userStatusResponse = await checkUserStatus(); //사용자 서비스 이용 가능여부 확인

                //분기 1. 신청기간이 아닐 경우
                if (userStatusResponse.message === '1') {
                    navigate('/'); //신청일자 안내 페이지 이동(아직 구현 안함)

                    //분기 2. 면허 데이터가 존재하지 않을 경우
                } else if (userStatusResponse.message === '2') {
                    navigate('/license'); //면허증 등록 이동

                    //분기 3. DB에 해당 사용자 면허 데이터는 등록되어 있으나, 면허증이 유효한지 확인해야 하는 경우
                } else if (userStatusResponse.message === '3') {
                    const checkLicenseValidationResponse = await checkLicenseValidation(); //실제 면허증 유효성 API
                    console.log('checkLicenseValidationResponse: ');
                    console.log(checkLicenseValidationResponse);
                    //면허증 유효하지 않을 때
                    if (checkLicenseValidationResponse != 'SUCCESS') {
                        navigate('/license'); //면허증 등록 페이지
                    }

                    //분기 4. 사용자 서비스 이용 가능할 경우
                } else if (userStatusResponse) {
                    const autoRoutingPage = sessionStorage.getItem('autoRoutingPage');
                    if (autoRoutingPage === null) {
                        const autoRoutingResponse = await autoRouting();
                        console.log(autoRoutingResponse);
                        setUser(name, autoRoutingResponse.userState);
                        sessionStorage.setItem('autoRoutingPage', autoRoutingResponse.routingId.toString());
                        navigateBasedOnRoutingId(autoRoutingResponse.routingId, navigate);
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
                <Route path="detail" element={<CompletedApplicationForm />} /> {/*차량 신청 내역*/}
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
