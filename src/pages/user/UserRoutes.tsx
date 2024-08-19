// 라이브러리
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

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
import Loading from '../../components/user/Loading';

// API
import checkUserStatus from '../../API/user/checkUserStatus';
import checkLicenseValidation from '../../API/user/checkLicenseValidation';

// Hook
import useAutoRouting from '../../utils/useAutoRouting';
import NotFoundPage from '../../components/common/NotFoundPage';

const UserRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { autoRoutingFunc } = useAutoRouting();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const autoRoutingPage = sessionStorage.getItem('autoRoutingPage');

        const fetchRouting = async () => {
            setIsLoading(true);
            try {
                const userStatusResponse = await checkUserStatus();

                switch (userStatusResponse.code) {
                    case 'MEM-001':
                        //신청기간이 아닐 때
                        if (!autoRoutingPage) {
                            sessionStorage.setItem('autoRoutingPage', '3');
                            navigate('/not-apply');
                        }
                        break;

                    case 'MEM-002':
                        //DB에 사용자 면허증 데이터가 없을 때
                        navigate('/license');
                        break;

                    case 'MEM-003': {
                        //DB에 사용자 면허증 데이터는 있으나, 유효성 검사가 필요할 때
                        try {
                            const checkLicenseValidationResponse = await checkLicenseValidation();
                            console.log('checkLicenseValidationResponse: ', checkLicenseValidationResponse);
                            await autoRoutingFunc();
                        } catch {
                            navigate('/license');
                        }
                        break;
                    }

                    case 'MEM-004':
                        //정상적으로 사용 가능할 때
                        if (!autoRoutingPage) {
                            await autoRoutingFunc();
                        }
                        break;
                    default:
                        console.error('알 수 없는 사용자 상태 코드:', userStatusResponse.code);
                }
            } catch (error) {
                console.error('API 요청 중 오류가 발생했습니다:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRouting();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (location.pathname === '/') {
        autoRoutingFunc();
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="license" element={<AddLicensePage />} /> {/* 면허증 등록 페이지 */}
                <Route path="application" element={<ApplicationFormPage />} /> {/* 차량 신청 페이지 */}
                <Route path="not-apply" element={<NotApplicationDatePage />} /> {/* 차량신청 기간 경고 페이지 */}
                <Route path="date-info" element={<ApplicationDateInfoPage />} /> {/* 차량신청 기간 안내 페이지 */}
                <Route path="detail" element={<CompletedApplicationForm />} /> {/* 차량신청 내역 확인 페이지 */}
                <Route path="lottery-result" element={<LotteryResultPage />} /> {/* 추첨 결과 확인 페이지 */}
                <Route path="mypage" element={<MyPage />} /> {/* 마이 페이지*/}
                <Route path="penalty/:penaltyId" element={<PenaltyDetailPage />} /> {/* 페널티 상세보기*/}
                <Route path="question" element={<QuestionListPage />} /> {/* 문의사항 리스트 페이지*/}
                <Route path="write" element={<QuestionWritePage />} /> {/* 문의사항 작성 페이지*/}
                <Route path="questiondetail/:id" element={<QuestionDetailPage />} /> {/* 문의사항 상세보기 페이지*/}
                <Route path="questionModify/:id" element={<QuestionModifyPage />} /> {/* 문의사항 수정 페이지*/}
                <Route path="rent/:page" element={<RentPage />} /> {/* 인수 보고서 작성 페이지*/}
                <Route path="return/:page" element={<ReturnPage />} /> {/* 반납 보고서 작성 페이지*/}
                <Route path="statistics" element={<StatisticsPage />} /> {/* 통계 페이지*/}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
