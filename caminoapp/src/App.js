// import Button from "./components/Button";
// import HeaderBanner from "./components/HeaderBanner";
import PlainingDate from "./components/P2_PlainingDate";
import PlainingPlane from "./components/P3_PlainingPlane";
import PlainingRoom from "./components/P5_PlainingRoom";
import RoutePage from "./components/P1_PlainingRoute";
import DayChoosePage from "./components/P4_PlainingDay";
import CheckPage from "./components/P6_PlainingCheck";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
