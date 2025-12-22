import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashLayout from "./components/layouts/DashLayout.jsx";
import HomeLayout from "./components/layouts/HomeLayout.jsx";
import ArmyLayout from "./components/layouts/military/ArmyLayout.jsx";
import NavyLayout from "./components/layouts/military/NavyLayout.jsx";
import AirForceLayout from "./components/layouts/military/AirForceLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./lenis.js";
import ContactUs from "./pages/ContactUs.jsx";
import MockInterview from "./components/MockInterview.jsx";
import DefenseSuite from "./components/DefenseSuite.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashLayout />}>
          <Route index element={<HomeLayout />} />
          <Route path="army" element={<ArmyLayout />} />
          <Route path="navy" element={<NavyLayout />} />
          <Route path="air-force" element={<AirForceLayout />} />
          <Route path="mock" element={<MockInterview />} />
          <Route path="defense" element={<DefenseSuite />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
