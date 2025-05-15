import React, { useState, useEffect } from "react"; //react 核心模組
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
//匯入 React Router 元件（Routes, Route, Link）用來做頁面切換。 具名匯入 (named imports)
//Routes用來包住所有 <Route /> 的元件
//Route 則是每個路由的定義，告訴它「哪個 path 要對應哪個元件」
//Link 則是超連結，讓你點擊切換頁面而不會重新整理（單頁應用 SPA）。
import LoginRegister from "./features/auth/LoginRegister.jsx"; //登入元件
import ExpandableCard from "./features/gearTips/ExpandableCard.jsx"; //card元件
import MemberCenter from "./features/pages/memberCenter/index.jsx"; //會員中心
import WeatherMap from "./features/weather/Weather.jsx"; // 天氣
import VerifyPage from "./features/auth/VerifyPage"; //驗證
import Location from "./features/pages/memberCenter/Location.jsx"; //新
import Froute from "../src/features/pages/memberCenter/Froute.jsx"; //路線資訊
import HomeRoute from "../src/features/pages/memberCenter/homeRoute.jsx"; //所有路線總覽
import Albergue from "../src/features/pages/memberCenter/Albergue.jsx"; //庇護所資訊
import Stamp from "../src/features/pages/memberCenter/Stamp.jsx"; //庇護所資訊
import Description_1 from "../src/features/sight_description/sight_des1.jsx";
import Description_2 from "../src/features/sight_description/sight_des2.jsx";
import Description_3 from "../src/features/sight_description/sight_des3.jsx";
import Description_4 from "../src/features/sight_description/sight_des4.jsx";
import Description_5 from "../src/features/sight_description/sight_des5.jsx";
import Description_6 from "../src/features/sight_description/sight_des6.jsx";
import Description_7 from "../src/features/sight_description/sight_des7.jsx";
import Description_8 from "../src/features/sight_description/sight_des8.jsx";
import Description_9 from "../src/features/sight_description/sight_des9.jsx";

import Homepage from "./features/pages/memberCenter/Homepage.jsx"; //首頁
import Navbar1 from "./features/homepage/Navbar1.jsx";
import Banner from "./features/homepage/Banner.jsx";
import Navbar2 from "./features/homepage/Navbar2.jsx";
import Footer from "./features/homepage/Footer.jsx";

function App() {
  const [routes, setRoutes] = useState([]); //Homepage  載入路線用
  const [expandedIndex, setExpandedIndex] = useState(null); // 控制展開的卡片 index，null 表示全部收合
  const navigate = useNavigate(); // React Router 提供的 Hook，用來跳轉頁 面

  // 初始化判斷使用者是否已登入
  //判斷使用者是否登入 //從本機裡面的userid判斷有沒有登入
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });

  // 使用者登出後會導進login;
  // const handleLogout = () => {
  //   localStorage.removeItem("userId");
  //   setIsLoggedIn(false);
  //   navigate("/login"); //跳轉login
  // };

  //判斷卡片是否展開  收起 = null  展開 就會更新index的索引
  const handleCardClick = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  // 載入路線
  useEffect(() => {
    fetch("http://localhost:3001/api/routes")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.route_id - b.route_id);
        setRoutes(sorted);
      })
      .catch((err) => console.error("路線讀取失敗", err));
  }, []);

  return (
    <>
      {/* 導覽列 */}
      {/* <nav> */}
      {/* Link 是 React Router 提供的元件
            React Router 會在背景中處理路由切換，不刷新整頁 */}
      {/* 這裡的/login 是user會改變網址 */}
      <div>
        {/* <Link to="/" style={{ marginRight: "1rem" }}>
            首頁
          </Link> */}
        {/* <Link to="/cards" style={{ marginRight: "1rem" }}>
            裝備與提醒頁
          </Link>
          <Link to="/member" style={{ marginRight: "1rem" }}>
            會員中心
          </Link>
          <Link to="/weather" style={{ marginRight: "1rem" }}>
            天氣地圖
          </Link>
          <Link to="/Location" style={{ marginRight: "1rem" }}>
            景點
          </Link> */}
      </div>
      {/* {isLoggedIn && (
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
        )} */}
      <Navbar1
        userId={localStorage.getItem("userId")}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Banner />
      <Navbar2 />
      {/* </nav> */}
      {/* 路由設定 */}
      <Routes>
        {/* path = 對應到的路由網址  會顯示 LoginRegister 元素  */}
        <Route path="/" element={<Homepage routes={routes} />} />
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
        {/* 景點資訊 */}
        <Route path="/Location" element={<Location />} />
        <Route path="/sight/1" element={<Description_1 />} />
        <Route path="/sight/2" element={<Description_2 />} />
        <Route path="/sight/3" element={<Description_3 />} />
        <Route path="/sight/4" element={<Description_4 />} />
        <Route path="/sight/5" element={<Description_5 />} />
        <Route path="/sight/6" element={<Description_6 />} />
        <Route path="/sight/7" element={<Description_7 />} />
        <Route path="/sight/8" element={<Description_8 />} />
        <Route path="/sight/9" element={<Description_9 />} />

        {/* 路線資訊-法國之路 */}
        <Route path="/routeintro" element={<Froute />} />
        {/* 路線總覽 */}
        <Route path="/HomeRoute" element={<HomeRoute />} />
        {/* 庇護所資訊 */}
        <Route path="/Albergue" element={<Albergue />} />
        {/* 蓋章地點 */}
        <Route path="/Stamp" element={<Stamp />} />

        <Route path="/Home" element={<Homepage routes={routes} />} />
        {/* 天氣預報 */}
        <Route path="/weather" element={<WeatherMap />} />
        <Route
          path="/cards"
          //element不能更改，且裡面顯示的要是jsx元素  例如 div or 元件 都是可以
          element={
            <div className="card-wrapper">
              <ExpandableCard
                index={0}
                expanded={expandedIndex === 0}
                onClick={() => handleCardClick(0)}
                imageSrc="https://i.imgur.com/OdPLipn.png"
                shortText="攜帶裝備建議"
                fullSections={[
                  {
                    title: "衣物類",
                    items: ["速乾短袖上衣", "登山褲", "內衣褲", "防風防水外套"],
                  },
                  {
                    title: "鞋襪類",
                    items: ["登山鞋或健行鞋", "登山襪"],
                  },
                  {
                    title: "個人醫療與清潔",
                    items: ["小型急救包", "抗水泡貼布", "防曬乳、護唇膏"],
                  },
                  {
                    title: "文件與證件",
                    items: [
                      "朝聖者護照",
                      "身分證明文件",
                      "旅行保險文件",
                      "歐盟健保卡",
                      "現金與提款卡",
                    ],
                  },
                ]}
              />
              <ExpandableCard
                index={1} //索引
                expanded={expandedIndex === 1} //索引 = 0 展開
                onClick={() => handleCardClick(1)} //點卡片會呼叫 handleCardClick //手動key 索引值進去
                imageSrc="https://i.imgur.com/fU67TVF.png"
                shortText="可能突發狀況 "
                fullSections={[
                  {
                    title: "",
                    items: [
                      "野生動物出沒：保持警覺並勿接觸。",
                      "身體不適或受傷：建議隨身攜帶急救用品。",
                      "天氣變化劇烈：請攜帶防風、防雨裝備。",
                      "路況不明：建議使用離線地圖。",
                      "補給不易：攜帶充足食水。",
                    ],
                  },
                ]}
              />

              <ExpandableCard
                index={2}
                expanded={expandedIndex === 2}
                onClick={() => handleCardClick(2)}
                imageSrc="https://i.imgur.com/vSgWQES.jpeg"
                shortText="蓋章教學"
                fullSections={[
                  {
                    title: "護照樣式",
                    items: [
                      "折頁本形式，方便攜帶與展開查看。",
                      "每一格用來蓋章，記錄每天經過的地點。",
                      "標示各條朝聖路線與沿途經過的小鎮名稱，方便規劃與核對行程。",
                    ],
                  },
                  {
                    title: "蓋章地點",
                    items: [
                      "庇護所、旅館、民宿",
                      "餐廳、咖啡廳",
                      "紀念品店、小超市",
                      "教堂、朝聖資訊站",
                      "郵局或當地市政設施",
                    ],
                  },
                  {
                    title: "蓋章規則",
                    items: ["每天至少蓋兩個章。"],
                  },
                  {
                    title: "小提醒",
                    items: [
                      "攜帶塑膠袋保護護照，避免雨天浸濕模糊印章。",
                      "有趣的印章可順便拍照留念，也能幫助之後整理旅程記錄。",
                    ],
                  },
                ]}
              />
            </div>
          }
        />
      </Routes>
      <Footer />
    {/* </Banner > */}
  </>
  );
}

export default App;
