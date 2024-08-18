// 라이브러리
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// 페이지
import Layout from '../../components/user/Layout/Layout';
import AddLicensePage from './License/AddLicensePage';
import ApplicationFormPage from './Apply/ApplicationFormPage';
import CompletedApplicationForm from './Apply/CompletedApplicationFormPage';
import LotteryResultPage from './LotteryResult/LotteryResultPage';
import MyPage from './MyPage/MyPage';
import QuestionListPage from './Question/QuestionListPage';
import QuestionWritePage from './Question/QuestionWritePage';
import QuestionDetailPage from './Question/QuestionDetailPage';
import RentPage from './RentReturn/RentPage';
import ReturnPage from './RentReturn/ReturnPage';
import NotApplicationDatePage from './ApplicationDate/NotApplicationDatePage';
import ApplicationDateInfoPage from './ApplicationDate/ApplicationDateInfoPage';
import StatisticsPage from './Statistics/StatisticsPage';
import PenaltyDetailPage from './MyPage/PenaltyDetailPage';
import QuestionModifyPage from './Question/QuestionModifyPage';

// API
import checkUserStatus from '../../API/user/checkUserStatus';
import checkLicenseValidation from '../../API/user/checkLicenseValidation';

// Hook
import useAutoRouting from '../../utils/useAutoRouting';
import NotFoundPage from '../../components/common/NotFoundPage';

const UserRoutes = () => {
    const navigate = useNavigate();
    const { autoRoutingFunc } = useAutoRouting(); // 커스텀 훅 사용

    useEffect(() => {
        const autoRoutingPage = sessionStorage.getItem('autoRoutingPage');

        const fetchRouting = async () => {
            try {
                const userStatusResponse = await checkUserStatus();

                switch (userStatusResponse.code) {
                    case 'MEM-001':
                        if (!autoRoutingPage) {
                            sessionStorage.setItem('autoRoutingPage', '3');
                            navigate('/not-apply');
                        }
                        break;

                    case 'MEM-002':
                        navigate('/license');
                        break;

                    case 'MEM-003': {
                        const checkLicenseValidationResponse = await checkLicenseValidation();
                        if (checkLicenseValidationResponse !== 'SUCCESS') {
                            navigate('/license');
                        } else {
                            await autoRoutingFunc();
                        }
                        break;
                    }

                    case 'MEM-004':
                        if (!autoRoutingPage) {
                            await autoRoutingFunc();
                        }
                        break;
                    default:
                        console.error('알 수 없는 사용자 상태 코드:', userStatusResponse.code);
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
                <Route path="license" element={<AddLicensePage />} />
                <Route path="application" element={<ApplicationFormPage />} />
                <Route path="not-apply" element={<NotApplicationDatePage />} />
                <Route path="date-info" element={<ApplicationDateInfoPage />} />
                <Route path="detail" element={<CompletedApplicationForm />} />
                <Route path="lottery-result" element={<LotteryResultPage />} />
                <Route path="mypage" element={<MyPage />} />
                <Route path="penalty/:penaltyId" element={<PenaltyDetailPage />} />
                <Route path="question" element={<QuestionListPage />} />
                <Route path="write" element={<QuestionWritePage />} />
                <Route path="questiondetail/:id" element={<QuestionDetailPage />} />
                <Route path="questionModify/:id" element={<QuestionModifyPage />} />
                <Route path="rent/:page" element={<RentPage />} />
                <Route path="return/:page" element={<ReturnPage />} />
                <Route path="statistics" element={<StatisticsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
