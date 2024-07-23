import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import VehicleStepPage from "./pages/admin/VehicleStepPage";
import AdminTest from "./components/admin/basic/AdminTest";

function App() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/admin-test' element={<AdminTest />} />
          <Route path='/vehicle-step' element={<VehicleStepPage />} />
        </Routes>
      </Router>
    );
}

export default App;
