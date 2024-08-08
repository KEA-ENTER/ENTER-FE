import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import UserRoutes from './pages/user/UserRoutes';
import AdminRoutes from './pages/admin/AdminRoutes';

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
                        <AdminRoutes />
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
