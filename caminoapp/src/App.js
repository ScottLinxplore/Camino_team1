// import Button from "./components/Button";
// import HeaderBanner from "./components/HeaderBanner";
import PlainingDate from "./components/P2_PlainingDate";
import PlainingPlane from "./components/P3_PlainingPlane";
import PlainingRoom from "./components/P5_PlainingRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 共用元件測試區

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/PlainingDate" element={<PlainingDate />} />
          <Route path="/PlainingPlane" element={<PlainingPlane />} />
          <Route path="/PlainingRoom" element={<PlainingRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
