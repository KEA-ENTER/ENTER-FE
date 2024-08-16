import { Navigate, Route, Routes } from 'react-router-dom';
import AdminHomePage from './AdminHomePage';
import AdminLayout from './AdminLayout';
import AdminTest from '../../components/admin/basic/AdminTest';
import VehicleStepPage from './vehicle/VehicleStepPage';
import RentReportPage from './vehicle-step/RentReportPage';
import ReturnReportPage from './vehicle-step/ReturnReportPage';
import LotteryPage from './lottery/LotteryPage';
import LotteryDetailPage from './lottery/LotteryDetailPage';
import VehiclePage from './VehiclePage';
import VehicleCreatePage from './vehicle/VehicleCreatePage';
import VehicleModifyPage from './vehicle/VehicleModify';
import VehicleDetailPage from './vehicle/VehicleDetailPage';
import QuestionPage from './question/QuestionPage';
import QuestionDetailPage from './question/QuestionDetailPage';

const AdminRoutes = () => {
    
    return (
        <Routes>
            <Route path='/' element={<AdminHomePage />} />
            <Route path="/user/*" element={<Navigate to="/" />} />
            <Route path='/admin/*' element={<AdminLayout />}>
                <Route path='admin-test' element={<AdminTest />} />
                <Route path='vehicle-step' element={<VehicleStepPage />} />
                <Route path='vehicle-step/rent/:id' element={<RentReportPage />} />
                <Route path='vehicle-step/return/:id' element={<ReturnReportPage />} />
                <Route path='lottery' element={<LotteryPage />} />
                <Route path='lottery/detail/:applyRound/:round/:date/:id' element={<LotteryDetailPage />} />
                <Route path='vehicle' element={<VehiclePage />} />
                <Route path='vehicle/create' element={<VehicleCreatePage />} />
                <Route path='vehicle/modify/:id' element={<VehicleModifyPage />} />
                <Route path='vehicle/detail/:id' element={<VehicleDetailPage />} />
                <Route path="question" element={<QuestionPage />} />
                <Route path="question/detail/:id" element={<QuestionDetailPage />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
