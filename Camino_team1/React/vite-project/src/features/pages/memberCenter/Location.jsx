import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topimg from "../../sight/location.png";
import SightCard from "../../sight/sightCard";
import styles from "./Location.module.css"; // 引入 CSS Module
// import "../../../features/sight/sightCard.css"

const Albergue = () => {
  const navigate = useNavigate();

  // 返回路線資訊按鈕的 function
  function Routes() {
    navigate("/routeintro");
  }

  // 抓資料庫的圖片
  const [sight1, setSight1] = useState([]);

  // 抓景點的各項資料
  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=sight")
      .then((res) => res.json())
      .then((data) => {
        // 依 sight_id 做升冪排序（1~9）
        const sorted = data.sort((a, b) => a.sight_id - b.sight_id);
        setSight1(sorted);
      })
  }, []);

  return (
    <>
      {/* 頁面上方圖片 */}
      <div className={styles.topSection}>
        <img src={Topimg} alt="上方" className={styles.topImage} />
      </div>

      {/* 返回按鈕 */}
      <div className={styles.backButton} onClick={Routes}>
        ←返回路線資訊
      </div>

      <hr />

      {/* 主體：三排卡片 */}
      {/* 第一排 1~3個 */}
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

      {/* 第二排 4~6 */}
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

      {/* 第三排 7~9 */}
      <div className={`${styles.cardRow} ${styles.lastRow}`}>
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
    </>
  );
};

export default Albergue;
// 5/17改改改改改改改動(重構module.css)