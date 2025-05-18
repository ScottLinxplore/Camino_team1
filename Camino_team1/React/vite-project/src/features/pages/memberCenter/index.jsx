import React, { useState } from "react"; //State //Hook
import Sidebar from "../../memberCenter/Sidebar.jsx"; //元件
import Account from "../../memberCenter/Account.jsx"; //元件
import Orders from "../../memberCenter/Orders.jsx"; //元件
import Favorites from "../../memberCenter/Favorites.jsx"; //元件
import History from "../../memberCenter/history.jsx";
import Records from "../../memberCenter/records.jsx";
import Scenery from "../../memberCenter/scenery.jsx";
//接收 userId的props
const MemberCenter = ({ userId }) => {
  const [currentSection, setCurrentSection] = useState("account"); //預設元件是 account 這個是可以變的 透過底下的 顯示對應元件

  return (
    <div
      style={{
        display: "flex",
        minHeight: "80vh", // ✅ 撐滿整個畫面高度
      }}
    >
      {/* 傳入控制函式 setCurrentSection 給 Sidebar  */}
      <Sidebar setCurrentSection={setCurrentSection} />
      <div style={{ flex: 1, padding: "1rem" }}>
        {/* 內容會根據 currentSection 顯示對應元件 */}
        {currentSection === "account" && <Account userId={userId} />}
        {currentSection === "orders" && <Orders />}
        {currentSection === "favorites" && <Favorites />}
        {currentSection === "history" && <History />}
        {currentSection === "records" && <Records />}
        {currentSection === "scenery" && <Scenery />}
      </div>
    </div>
  );
};

export default MemberCenter;
