import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import UserPage from './pages/user/UserPage';
import AdminPage from './pages/admin/AdminPage';

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
                            <Route path="/" element={<AdminPage />} />
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
