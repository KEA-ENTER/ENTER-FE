import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import UserPage from './pages/user/UserPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminTest from './components/admin/basic/AdminTest';
import VehicleStepPage from './pages/admin/VehicleStepPage';
import RentReportPage from './pages/admin/RentReportPage';
import ReturnReportPage from './pages/admin/ReturnReportPage';
import VehiclePage from './pages/admin/VehiclePage';
import VehicleCreatePage from './pages/admin/VehicleCreatePage';
import VehicleDetailPage from './pages/admin/VehicleDetailPage';

export default function App() {
    const [role, setRole] = useState<string | null>(null);
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
                                <Route path='admin-test' element={<AdminTest />} />
                                <Route path='vehicle-step' element={<VehicleStepPage />} />
                                <Route path='vehicle-step/rent' element={<RentReportPage />} />
                                <Route path='vehicle-step/return' element={<ReturnReportPage />} />
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
