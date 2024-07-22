import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import VehicleStepPage from "./pages/admin/VehicleStepPage";

function App() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/vehicle-step' element={<VehicleStepPage />} />
        </Routes>
      </Router>
    );
}

export default App;
