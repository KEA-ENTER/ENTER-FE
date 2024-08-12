import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import UserRoutes from './pages/user/UserRoutes';
import AdminRoutes from './pages/admin/AdminRoutes';

export default function App() {
    const [role, setRole] = useState<string | null>(sessionStorage.getItem('role'));

    const handleLoginSuccess = (role: string) => {
        setRole(role);
        sessionStorage.setItem('role', role);
    };

    useEffect(() => {
        const savedRole = sessionStorage.getItem('role');
        if (savedRole) {
            setRole(savedRole);
        }
    }, []);

    const accessToken = sessionStorage.getItem('accessToken');

    return (
        <Router>
            <div>
                {role && accessToken ? ( //role이 정의되지 않았으면 로그인 페이지로 이동
                    role === 'USER' ? ( //role이 USRE 이면 <UserRoutes />, 아니면 <AdminRoutes /> 페이지로 이동
                        <UserRoutes />
                    ) : (
                        <AdminRoutes />
                    )
                ) : (
                    <Login onLoginSuccess={handleLoginSuccess} />
                )}
            </div>
        </Router>
    );
}
