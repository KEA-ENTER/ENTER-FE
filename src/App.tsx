import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import VehicleStepPage from "./pages/admin/VehicleStepPage";
import AdminTest from "./components/admin/basic/AdminTest";
import RentReportPage from "./pages/admin/RentReportPage";
import ReturnReportPage from "./pages/admin/ReturnReportPage";
import VehiclePage from "./pages/admin/VehiclePage";
import VehicleCreatePage from "./pages/admin/VehicleCreatePage";
import VehicleDetailPage from "./pages/admin/VehicleDetailPage";

function App() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/admin-test' element={<AdminTest />} />
          <Route path='/vehicle-step' element={<VehicleStepPage />} />
          <Route path='/vehicle-step/rent' element={<RentReportPage />} />
          <Route path='/vehicle-step/return' element={<ReturnReportPage />} />
          <Route path='/vehicle' element={<VehiclePage />} />
          <Route path='/vehicle/create' element={<VehicleCreatePage />} />
          <Route path='/vehicle/detail' element={<VehicleDetailPage />} />
        </Routes>
      </Router>
    );
}

export default App;
