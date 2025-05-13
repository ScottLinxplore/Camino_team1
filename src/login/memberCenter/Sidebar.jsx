import React, { useState } from "react"; //useState
import { FaUser, FaBox, FaHeart } from "react-icons/fa"; // icon模組
import "./Sidebar.css";

//左側導覽列

const Sidebar = ({ setCurrentSection }) => {
  const [orderOpen, setOrderOpen] = useState(false); //控制 我的訂購 是否展開  預設 false
  const [favoriteOpen, setFavoriteOpen] = useState(false); //收藏  預設 false

  return (
    <div className="sidebar">
      <ul>
        {/* 我的帳戶 */}
        <li className="main" onClick={() => setCurrentSection("account")}>
          <FaUser className="icon" /> 我的帳戶
        </li>

        {/* 我的訂購（可折疊） */}
        <li className="main" onClick={() => setOrderOpen(!orderOpen)}>
          <FaBox className="icon" /> 我的訂購
        </li>
        {orderOpen && (
          <>
            <li onClick={() => setCurrentSection("orders")}>預定旅程</li>
            <li onClick={() => setCurrentSection("history")}>歷史訂單</li>
            <li onClick={() => setCurrentSection("records")}>旅程紀錄</li>
          </>
        )}

        {/* 我的收藏（可折疊） */}
        <li className="main" onClick={() => setFavoriteOpen(!favoriteOpen)}>
          <FaHeart className="icon" /> 我的收藏
        </li>
        {favoriteOpen && (
          <>
            <li onClick={() => setCurrentSection("favorites")}>套裝行程</li>
            <li onClick={() => setCurrentSection("scenery")}>景點</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
