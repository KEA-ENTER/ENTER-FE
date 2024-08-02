import { Route, Routes } from 'react-router-dom';
import Layout from '../../components/user/Layout/Layout'; // 경로를 실제 경로에 맞게 수정
import License from './License/License';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="license" element={<License />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
