import { Route, Routes } from 'react-router-dom';
import Layout from '../../components/user/Layout/Layout';
import AddLicensePage from './License/AddLicensePage';
import ApplicationFormPage from './Apply/ApplicationFormPage';
import CompletedApplicationForm from './Apply/CompletedApplicationForm';
import LotteryResultPage from './LotteryResult/LotteryResultPage';
import MyPage from './MyPage/MyPage';
import QuestionListPage from './Question/QuestionListPage';

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
            </Route>
        </Routes>
    );
};

export default UserRoutes;
