import React, { useEffect, useState } from "react";
import styles from "./HoverCard.module.css";
import hover from "./image/hoverEL.png";
function HoverCard({ id, style }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => {
        console.log("抓到資料：", json);
        setData(json);
      })
      .catch((error) => {
        console.error("抓資料失敗", error);
      });
  }, []);

  const route = data?.find((item) => item.route_id === parseInt(id));
  if (!route) return null;

  const difficultyText =
    route.difficulty === 1 ? "簡單" : route.difficulty === 2 ? "中等" : "困難";

  return (
    <div className={styles.container} style={style}>
      <img src={hover} alt="hoverCard" className={styles.image} />
      <div className={styles.textBox}>
        <p className={styles.text}>路線名稱: {route.name}</p>
        <p className={styles.text}>起點: {route.start_city}</p>
        <p className={styles.text}>總長: {route.length}公里</p>
        <p className={styles.text}>建議天數: {route.days}天</p>
        <p className={styles.text}>難易度: {difficultyText}</p>
      </div>
    </div>
  );
}

export default HoverCard;
