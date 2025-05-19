import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Banner.module.css";
import road from "./images/banner_backgrondRemoved_8.png";
import rightfoot from "./images/rightFoot5.png";
import curve from "./images/curve3.png";

export default function Banner() {
  const [allQuotes, setAllQuotes] = useState([]);
  const [visibleQuote, setVisibleQuote] = useState([]);

  // to top
  useEffect(() => {
    const sky = document.getElementById("sky");
    if (sky) {
      sky.scrollIntoView({ behavior: "smooth" });
    }
  }, [])

  // 旋轉功能
  useEffect(() => {
    const sky = document.getElementById("sky");
    let totalRotation = 0;
    let scrollingAllowed = false;

    const rotateBy = (deltaAngle) => {
      totalRotation += deltaAngle;
      if (totalRotation > 180) totalRotation = 180;
      if (totalRotation < -180) totalRotation = -180;

      if (sky) {
        sky.style.transform = `translate(-50%, -50%) rotate(${totalRotation}deg)`;
      }

      if (Math.abs(totalRotation) >= 180) {
        document.body.style.overflow = "auto";
        scrollingAllowed = true;
      }
    };

    const handleWheel = (e) => {
      if (scrollingAllowed) return;
      e.preventDefault();
      const delta = e.deltaY;
      rotateBy(delta * 0.3);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // 載入名言
  useEffect(() => {
    fetch("http://localhost:3001/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setAllQuotes(data);
        setVisibleQuote(getRandom(data));
      })
      .catch((err) => console.error("載入資料錯誤:", err));
  }, []);

  //5秒換一組
  useEffect(() => {
    if (allQuotes.length === 0) return;

    const timeout = setTimeout(() => {
      setVisibleQuote(getRandom(allQuotes));
    }, 3001);

    return () => clearTimeout(timeout);
  }, [visibleQuote, allQuotes]);

  const getRandom = (arr) => {
    return arr[Math.floor(Math.random() * 7)];
  };


  // 不再首頁就不要出現banner
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/Home";

  if (!isHome) {
    return
  } else {
    return (
      <div className={style.bannerWrapper}>
        <div className={style.sky} id="sky" />
        <img className={style.road} src={road} alt="road" />
        <img className={style.curve} src={curve} alt="" />
        <img className={style.rightfoot} src={rightfoot} alt="road" />
        <h1 className={style.camino}>朝聖之路</h1>
        <div className={style.content}>
          <p className={style.contentTitle}>{visibleQuote.slogan}</p>
          <p className={style.contentText}>
            {visibleQuote.quotes} <br /> <span>— {visibleQuote.by}</span>
          </p>
          <Link to={`/routeintro`}>路線資訊</Link>
        </div>
      </div>
    );
  }

}
