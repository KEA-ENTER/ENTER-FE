import { Route, Routes } from 'react-router-dom';
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

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="license" element={<AddLicensePage />} />
                <Route path="application" element={<ApplicationFormPage />} />
                <Route path="detail" element={<CompletedApplicationForm />} />
                <Route path="lottery-result" element={<LotteryResultPage />} />
                <Route path="mypage" element={<MyPage />} />
                <Route path="question" element={<QuestionListPage />} />
                <Route path="write" element={<QuestionWritePage />} />
                <Route path="questiondetail" element={<QuestionDetailPage />} />
                <Route path="rent/:page" element={<RentPage />} /> {/* 동적 경로 설정 */}
            </Route>
        </Routes>
    );
};

export default UserRoutes;
