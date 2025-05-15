// import Button from "./components/Button";
// import HeaderBanner from "./components/HeaderBanner";
import PlainingDate from "./pages/plaining/P2_PlainingDate";
import PlainingPlane from "./pages/plaining/P3_PlainingPlane";
import PlainingRoom from "./pages/plaining/P5_PlainingRoom";
import RoutePage from "./pages/plaining/P1_PlainingRoute";
import DayChoosePage from "./pages/plaining/P4_PlainingDay";
import CheckPage from "./pages/plaining/P6_PlainingCheck";
import P_1_packageTour from "./pages/packageTour/Page1";
import P_2_package from "./pages/packageTour/Page2";
import P_3_package from "./pages/packageTour/Page3";
import P_4_package from "./pages/packageTour/Page4";
import P_5_package from "./pages/packageTour/Page5";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {" "}
          <Route path="/Route" element={<RoutePage />} />
          <Route path="/PlainingDate" element={<PlainingDate />} />
          <Route path="/PlainingPlane" element={<PlainingPlane />} />{" "}
          <Route path="/Day" element={<DayChoosePage />} />
          <Route path="/PlainingRoom" element={<PlainingRoom />} />
          <Route path="/check" element={<CheckPage />} />
          <Route path="/page1" element={<P_1_packageTour />} />
          <Route path="/page2" element={<P_2_package />} />
          <Route path="/page3" element={<P_3_package />} />
          <Route path="/page4" element={<P_4_package />} />
          <Route path="/page5" element={<P_5_package />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
