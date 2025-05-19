import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./Navbar2.module.css";

export default function Navbar2() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/" || location.pathname === "/Home";


  const toInfo = () => {
    navigate("/cards");
  };

  const toWeather = () => {
    navigate("/weather");
  };

  const toRoute = () => {
    navigate("/routeintro");
  };
  // HomeRoute
  const toHomeRoute = () => {
    navigate("/HomeRoute");
  };


  // Navbar滾動變色效果
  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  let fontColor;
  let backgroundColor;

  if (isHome) {
    fontColor = scrolled ? "black" : "white";
    backgroundColor = scrolled ? "white" : "transparent";
  } else {
    fontColor = "black";
    backgroundColor = "white";
  }

  return (
    <div className={style.navContainer}
      style={{ marginTop: isHome ? "-4%" : "0" }}>
      <nav
        className={style.navLinks}
        style={{ backgroundColor: backgroundColor }}
      >
        <div className={style.navItem} style={{ color: fontColor }}>
          套裝行程
        </div>

        <div className={style.navItemWithDropdown}>
          <div className={style.navItem} 
          style={{ color: fontColor }}
          onClick={toHomeRoute}>
            路線資訊
          </div>
          <div className={style.dropdownMenu}>
            <ul className={style.dropdownCol}>
              <li onClick={toRoute}>法國之路</li>
              <li onClick={toRoute}>銀之路</li>
              <li onClick={toRoute}>北方之路</li>
              <li onClick={toRoute}>原始之路</li>
              <li onClick={toRoute}>英國之路</li>
              <li onClick={toRoute}>葡萄牙之路</li>
            </ul>
          </div>
        </div>

        <div className={style.navItem} style={{ color: fontColor }}>
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
    </div>
  );
}
