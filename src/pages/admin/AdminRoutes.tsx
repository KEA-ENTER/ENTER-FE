import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminHomePage from './AdminHomePage';
import AdminLayout from './AdminLayout';
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
import NotFoundPage from './../../components/common/NotFoundPage';
import { useEffect } from 'react';

const AdminRoutes = () => {
    const navigate = useNavigate();
    const RedirectAdminHome = () => {
        useEffect(() => {
            {(sessionStorage.getItem('role') && sessionStorage.getItem('accessToken')) && 
                navigate('/admin');
            }
        });
        return null; 
    }

    return (
        <Routes>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/" element={<RedirectAdminHome />} />
            <Route path="/admin/*" element={<AdminLayout />}>
                <Route path="vehicle-step" element={<VehicleStepPage />} />
                <Route path="vehicle-step/rent/:id" element={<RentReportPage />} />
                <Route path="vehicle-step/return/:id" element={<ReturnReportPage />} />
                <Route path="lottery" element={<LotteryPage />} />
                <Route path="lottery/detail/:applyRound" element={<LotteryDetailPage />} />
                <Route path="vehicle" element={<VehiclePage />} />
                <Route path="vehicle/create" element={<VehicleCreatePage />} />
                <Route path="vehicle/modify/:id" element={<VehicleModifyPage />} />
                <Route path="vehicle/detail/:id" element={<VehicleDetailPage />} />
                <Route path="question" element={<QuestionPage />} />
                <Route path="question/detail/:id" element={<QuestionDetailPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AdminRoutes;
