import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import UserRoutes from './pages/user/UserRoutes';
import AdminRoutes from './pages/admin/AdminRoutes';

export default function App() {
    const [role, setRole] = useState<string | null>(sessionStorage.getItem('role'));
    const [accessToken, setAccessToken] = useState<string | null>(sessionStorage.getItem('accessToken'));

    const stateHandler = (role: string, accessToken:string) => {
        setRole(role);
        setAccessToken(accessToken);
    }

    return (
        <Router>
            <div>
                {role && accessToken ? ( // role과 accessToken이 정의된 경우
                    role === 'USER' ? (
                        <UserRoutes />
                    ) : (
                        <AdminRoutes />
                    )
                ) : (
                    <Login stateHandler={stateHandler}/>
                )}
            </div>
        </Router>
    );
}
