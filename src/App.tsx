import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import UserPage from './pages/user/UserPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminTest from './components/admin/basic/AdminTest';
import VehicleStepPage from './pages/admin/vehicle/VehicleStepPage';
import RentReportPage from './pages/admin/vehicle-step/RentReportPage';
import ReturnReportPage from './pages/admin/vehicle-step/ReturnReportPage';
import LotteryPage from './pages/admin/lottery/LotteryPage';
import LotteryDetailPage from './pages/admin/lottery/LotteryDetailPage';
import VehiclePage from './pages/admin/VehiclePage';
import VehicleCreatePage from './pages/admin/vehicle/VehicleCreatePage';
import VehicleDetailPage from './pages/admin/vehicle/VehicleDetailPage';
import AdminHomePage from './pages/admin/AdminHomePage';

export default function App() {
    const [role, setRole] = useState<string | null>('admin');
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
                                <Route path='vehicle-step/rent' element={<RentReportPage />} />
                                <Route path='vehicle-step/return' element={<ReturnReportPage />} />
                                <Route path='lottery' element={<LotteryPage />} />
                                <Route path='lottery/detail' element={<LotteryDetailPage />} />
                                <Route path='vehicle' element={<VehiclePage />} />
                                <Route path='vehicle/create' element={<VehicleCreatePage />} />
                                <Route path='vehicle/detail' element={<VehicleDetailPage />} />
                            </Route>
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/" element={<UserPage />} />
                        </Routes>
                    )
                ) : (
                    <Login onLoginSuccess={handleLoginSuccess} />
                )}
            </div>
        </Router>
    );
}
