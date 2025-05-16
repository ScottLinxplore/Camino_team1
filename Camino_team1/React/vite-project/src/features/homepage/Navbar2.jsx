import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Navbar2.module.css";

export default function Navbar2() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const toInfo = () => {
    navigate("/cards");
  };

  const toWeather = () => {
    navigate("/weather");
  };
  // 路線資訊首頁
  const toRoute = () => {
    navigate("/routeintro");
  };

  const toRouteintro = () => {
    navigate("/routeintro");
  };

  const toPackage = () => {
    navigate("/page1");
  };

  const toRouteplanning = () => {
    navigate("/route");
  };

  // Navbar滾動變色效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fontColor = scrolled ? "black" : "white";
  const backgroundColor = scrolled ? "white" : "transparent";

  return (
    <nav
      className={style.navLinks}
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        className={style.navItem}
        style={{ color: fontColor }}
        onClick={toPackage}
      >
        套裝行程
      </div>

      <div className={style.navItemWithDropdown}>
        <div className={style.navItem} style={{ color: fontColor }}>
          路線資訊
        </div>
        <div className={style.dropdownMenu}>
          <ul className={style.dropdownCol} onClick={toRoute}>
            <li onClick={toRouteintro}>法國之路</li>
            <li onClick={toRouteintro}>銀之路</li>
            <li onClick={toRouteintro}>北方之路</li>
            <li onClick={toRouteintro}>原始之路</li>
            <li onClick={toRouteintro}>英國之路</li>
            <li onClick={toRouteintro}>葡萄牙之路</li>
          </ul>
        </div>
      </div>

      <div
        className={style.navItem}
        style={{ color: fontColor }}
        onClick={toRouteplanning}
      >
        路線規劃
      </div>
      <div className={style.navItemWithDropdown}>
        <div className={style.navItem} style={{ color: fontColor }}>
          相關資訊
        </div>
        <div className={style.dropdownMenu}>
          <ul className={style.dropdownCol}>
            <li onClick={toInfo}>蓋章教學</li>
            <li onClick={toInfo}>可能突發狀況</li>
            <li onClick={toInfo}>攜帶裝備建議</li>
            <li onClick={toWeather}>天氣預報</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
