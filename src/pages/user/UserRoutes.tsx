import { Route, Routes } from 'react-router-dom';
import Layout from '../../components/user/Layout/Layout';
import AddLicensePage from './License/AddLicensePage';
import ApplyFormPage from './Apply/ApplyFormPage';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="license" element={<AddLicensePage />} />
                <Route path="apply" element={<ApplyFormPage />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
