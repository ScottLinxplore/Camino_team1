import React, { useState } from "react"; //react 核心模組
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";

import LoginRegister from "./auth/LoginRegister.jsx"; //登入元件
// import ExpandableCard from "./features/gearTips/ExpandableCard.jsx"; //card元件?
import MemberCenter from "./pages/memberCenter/index.jsx"; //會員中心 ?
// import WeatherMap from "./features/weather/weather.jsx"; // 天氣 ?
import VerifyPage from "./auth/VerifyPage.jsx"; //驗證

function App() {
  const navigate = useNavigate(); // React Router 提供的 Hook，用來跳轉頁面

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login"); //跳轉login
  };
  return (
    <>
      {/* 導覽列 */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between", // 左右分開
          alignItems: "center",
          padding: "1rem",
          background: "#eee",
          marginBottom: "1rem",
        }}
      >
        {/* Link 是 React Router 提供的元件
            React Router 會在背景中處理路由切換，不刷新整頁 */}
        {/* 這裡的/login 是user會改變網址 */}
        <div>
          <Link to="/cards" style={{ marginRight: "1rem" }}>
            裝備與提醒頁
          </Link>
          <Link to="/member" style={{ marginRight: "1rem" }}>
            會員中心
          </Link>
          <Link to="/weather" style={{ marginRight: "1rem" }}>
            天氣地圖
          </Link>
        </div>
        {isLoggedIn && (
          <button
            style={{
              padding: "0.5rem 1rem",
              background: "#9ca3af",
              color: "white",
              border: "none",
              borderRadius: "1rem",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            登出
          </button>
        )}
      </nav>
      {/* 路由設定 */}
      <Routes>
        {/* path = 對應到的路由網址  會顯示 LoginRegister 元素  */}
        <Route
          path="/login"
          element={<LoginRegister setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/verify" element={<VerifyPage />} />
        <Route
          path="/member"
          element={
            isLoggedIn && localStorage.getItem("userId") ? (
              <MemberCenter userId={Number(localStorage.getItem("userId"))} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* 天氣預報 element={<WeatherMap />} */}
        <Route path="/weather" />
        <Route
          path="/cards"
          //element不能更改，且裡面顯示的要是jsx元素  例如 div or 元件 都是可以
          element={
            <div className="card-wrapper">
              {}
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
