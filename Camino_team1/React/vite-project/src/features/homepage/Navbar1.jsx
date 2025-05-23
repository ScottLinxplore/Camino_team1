import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import style from "./Navbar1.module.css";
import logoImgWhite from "./images/logoAndWord2.png";
import logoImgColor from "./images/logoAndWord.png";

export default function Navbar({ userId, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const [hoverLogin, setHoverLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    if (typeof setIsLoggedIn === "function") {
      setIsLoggedIn(false);
    }
    navigate("/Home");
  };

  // logo導到首頁
  const toHome = () => {
    navigate("/");
  };

  // 判斷位置變色
  const location = useLocation();
  const isHome = location.pathname === "/Home" || location.pathname === "/";
  
  let fontColor;
  if (isHome) {
    fontColor = scrolled ? "black" : "white";
  } else {
    fontColor = "black";
  }

  let logoImg;
  if (isHome) {
    logoImg = scrolled ? logoImgColor : logoImgWhite;
  } else {
    logoImg = logoImgColor;
  }


  return (
    <>
      <nav className={style.left} style={{ color: fontColor }}>
        {/* <Link to={"/Home"}> */}
          <img src={logoImg} alt="logo" onClick={toHome} />
        {/* </Link> */}
      </nav>

      <nav className={style.right}>
        {isLoggedIn ? (
          // 已登入顯示使用者圖示與登出
          <div className={style.userIconWrapper}>
            <span className={style.userIcon} style={{ color: fontColor }}>
              <Link to={"/member"}>
                <FaUser style={{ color: fontColor }}/>
              </Link>
            </span>
            <span
              className={style.link}
              style={{ color: fontColor, cursor: "pointer" }}
              onClick={handleLogout}
            >
              登出
            </span>
          </div>
        ) : (
          // 未登入只顯示登入按鈕
          <span
            className={style.link}
            onMouseEnter={() => setHoverLogin(true)}
            onMouseLeave={() => setHoverLogin(false)}
          >
            <Link
              to="/login"
              style={{ color: hoverLogin ? "gray" : fontColor }}
            >
              登入
            </Link>
          </span>
        )}
      </nav>
    </>
  );
}
