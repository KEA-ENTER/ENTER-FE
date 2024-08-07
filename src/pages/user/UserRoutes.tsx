import { Route, Routes } from 'react-router-dom';
import Layout from '../../components/user/Layout/Layout';
import AddLicensePage from './License/AddLicensePage';
import ApplicationFormPage from './Apply/ApplicationFormPage';
import CompletedApplicationForm from './Apply/CompletedApplicationForm';
import LotteryResult from './LotteryResult/LotteryResult';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="license" element={<AddLicensePage />} />
                <Route path="application" element={<ApplicationFormPage />} />
                <Route path="detail" element={<CompletedApplicationForm />} />
                <Route path="lottery-result" element={<LotteryResult />} />

            </Route>
        </Routes>
    );
};

export default UserRoutes;
