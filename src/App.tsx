import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import VehicleStepPage from "./pages/admin/VehicleStepPage";
import AdminTest from "./components/admin/basic/AdminTest";
import RentReportPage from "./pages/admin/RentReportPage";
import ReturnReportPage from "./pages/admin/ReturnReportPage";

function App() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/admin-test' element={<AdminTest />} />
          <Route path='/vehicle-step' element={<VehicleStepPage />} />
          <Route path='/vehicle-step/rent/:id' element={<RentReportPage />} />
          <Route path='/vehicle-step/return/:id' element={<ReturnReportPage />} />
        </Routes>
      </Router>
    );
}

export default App;
