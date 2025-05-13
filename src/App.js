import Froute from "./Froute"
import { useState, Navigate } from "react"; //react 核心模組
import HomeRoute from "./homeRoute"
import Albergue from "./Albergue"
import Stamp from "./Stamp"
//景點+詳細介紹
import Location from "./Location"
import SightDetail1 from './sight_description/sight_des1'
import SightDetail2 from './sight_description/sight_des2'
import SightDetail3 from './sight_description/sight_des3'
import SightDetail4 from './sight_description/sight_des4'
import SightDetail5 from './sight_description/sight_des5'
import SightDetail6 from './sight_description/sight_des6'
import SightDetail7 from './sight_description/sight_des7'
import SightDetail8 from './sight_description/sight_des8'
import SightDetail9 from './sight_description/sight_des9'

//登入系統
import Login from '../src/login/App.jsx'
import LoginRegister from "../src/login/auth/LoginRegister.jsx"; //登入元件
import MemberCenter from "../src/login/pages/memberCenter/index.jsx"; //會員中心 ?
import VerifyPage from "../src/login/auth/VerifyPage.jsx"; //驗證


//滾動自動到頂部
import ScrollToTop from "./ScrollToTop"

import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });
  return (
    <BrowserRouter>
      <ScrollToTop />
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
              { }
            </div>
          }
        />
      </Routes>

      <Routes>
        {/*  */}
        <Route path="/login_1" element={<LoginRegister />} />
        <Route path="/login_2" element={<MemberCenter />} />
        <Route path="/login_3" element={<VerifyPage />} />



      
        <Route path="/" element={<Froute />} />
        <Route path="/homeRoute" element={<HomeRoute />} />
        <Route path="/Albergue" element={<Albergue />} />
        <Route path="/Stamp" element={<Stamp />} />
        <Route path="/login" element={<Login />} />



        {/* 景點首頁+9個分頁 */}
        <Route path="/Location" element={<Location />} />
        <Route path="/sight/1" element={<SightDetail1 />} />
        <Route path="/sight/2" element={<SightDetail2 />} />
        <Route path="/sight/3" element={<SightDetail3 />} />
        <Route path="/sight/4" element={<SightDetail4 />} />
        <Route path="/sight/5" element={<SightDetail5 />} />
        <Route path="/sight/6" element={<SightDetail6 />} />
        <Route path="/sight/7" element={<SightDetail7 />} />
        <Route path="/sight/8" element={<SightDetail8 />} />
        <Route path="/sight/9" element={<SightDetail9 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
