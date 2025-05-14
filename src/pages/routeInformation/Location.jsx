import React, { useEffect, useState } from "react";
import Navbar from "../../features/navbar/Navbar1";
import Footer from "../../features/footer/Footer";
import { useNavigate } from "react-router-dom";
import Topimg from "../../features/sight/location.png";
import SightCard from "../../features/sight/sightCard";
import styles from "./Location.module.css"; // ⭐ 引入 CSS module

const Sight = () => {
  // 返回路線資訊按鈕的 function
  const navigate = useNavigate();
  function Routes() {
    navigate("/");
  }

  // 抓景點資料
  const [sight1, setSight1] = useState([]);

  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=sight")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.sight_id - b.sight_id);
        setSight1(sortedData);
      });
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        <nav><Navbar /></nav>
        <img src={Topimg} alt="上方" className={styles.topImage} />
      </div>

      <div className={styles.backButton} onClick={Routes}>
        ←返回路線資訊
      </div>

      <hr />

      {/* 主體區塊：三排卡片 */}
      <div className={styles.cardRow}>
        {sight1.slice(0, 3).map((item, index) => (
          <SightCard
            key={index}
            sight_id={item.sight_id}
            cname={item.cname}
            ename={item.ename}
            feature={item.feature}
            img_url={item.img_url}
          />
        ))}
      </div>

      <div className={styles.cardRow}>
        {sight1.slice(3, 6).map((item, index) => (
          <SightCard
            key={index}
            sight_id={item.sight_id}
            cname={item.cname}
            ename={item.ename}
            feature={item.feature}
            img_url={item.img_url}
          />
        ))}
      </div>

      <div className={`${styles.cardRow} ${styles.cardRowLast}`}>
        {sight1.slice(6, 9).map((item, index) => (
          <SightCard
            key={index}
            sight_id={item.sight_id}
            cname={item.cname}
            ename={item.ename}
            feature={item.feature}
            img_url={item.img_url}
          />
        ))}
      </div>

      <footer><Footer /></footer>
    </>
  );
};

export default Sight;
