import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import UserRoutes from './pages/user/UserRoutes';
import AdminRoutes from './pages/admin/AdminRoutes';

export default function App() {
    const [role, setRole] = useState<string | null>(sessionStorage.getItem('role'));

    const stateHandler = (role: string) => {
        setRole(role);
    };

    return (
        <Router>
            <div>
                {role && sessionStorage.getItem('accessToken') ? ( // role과 accessToken이 정의된 경우
                    role === 'USER' ? (
                        <UserRoutes />
                    ) : (
                        <AdminRoutes />
                    )
                ) : (
                    <Login stateHandler={stateHandler} />
                )}
            </div>
        </Router>
    );
}
