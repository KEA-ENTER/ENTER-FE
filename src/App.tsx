import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import UserRoutes from './pages/user/UserRoutes';
import AdminLayout from './pages/admin/AdminLayout';
import AdminTest from './components/admin/basic/AdminTest';
import VehicleStepPage from './pages/admin/vehicle/VehicleStepPage';
import RentReportPage from './pages/admin/vehicle-step/RentReportPage';
import ReturnReportPage from './pages/admin/vehicle-step/ReturnReportPage';
import LotteryPage from './pages/admin/lottery/LotteryPage';
import LotteryDetailPage from './pages/admin/lottery/LotteryDetailPage';
import VehiclePage from './pages/admin/VehiclePage';
import VehicleCreatePage from './pages/admin/vehicle/VehicleCreatePage';
import VehicleModifyPage from './pages/admin/vehicle/VehicleModify';
import VehicleDetailPage from './pages/admin/vehicle/VehicleDetailPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import QuestionPage from './pages/admin/question/QuestionPage';
import QuestionDetailPage from './pages/admin/question/QuestionDetailPage';

export default function App() {

    const [role, setRole] = useState<string | null>();

    const handleLoginSuccess = (role: string) => {
        setRole(role);
    };

    return (
        <Router>
            <div>
                {role ? (
                    role === 'admin' ? (
                        <Routes>
                            <Route path='/admin' element={<AdminLayout />}>
                                <Route path='' element={<AdminHomePage />} />
                                <Route path='admin-test' element={<AdminTest />} />
                                <Route path='vehicle-step' element={<VehicleStepPage />} />
                                <Route path='vehicle-step/rent/:id' element={<RentReportPage />} />
                                <Route path='vehicle-step/return/:id' element={<ReturnReportPage />} />
                                <Route path='lottery' element={<LotteryPage />} />
                                <Route path='lottery/detail/:round/:date/:id' element={<LotteryDetailPage />} />
                                <Route path='vehicle' element={<VehiclePage />} />
                                <Route path='vehicle/create' element={<VehicleCreatePage />} />
                                <Route path='vehicle/modify/:id' element={<VehicleModifyPage />} />
                                <Route path='vehicle/detail/:id' element={<VehicleDetailPage />} />
                                <Route path="question" element={<QuestionPage />} />
                                <Route path="question/detail/:id" element={<QuestionDetailPage />} />
                            </Route>
                        </Routes>
                    ) : (
                        <UserRoutes />
                    )
                ) : (
                    <Login onLoginSuccess={handleLoginSuccess} />
                )}
            </div>
        </Router>
    );
}
