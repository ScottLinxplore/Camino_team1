import React from "react";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ route, userId }) {
  //  const levelToNumber = {
  //   1:"新手",
  //   2:"中等",
  //   3:"困難",
  // };
  const [liked, setLiked] = useState(false);
  // const toggleLike = () => setLiked(!liked);
  const navigate = useNavigate(); //點圖片會跳到第2頁

  const goToPage2 = () => {
    navigate("/page2");
  };

  // ⬇️ 初始時向後端查詢：這筆景點有沒有在「我的最愛」裡
  // useEffect(() => {
  //   fetch(`/api/likeroutes/check?userId=${userId}&routeId=${route.route_id}`)
  //     .then(async (res) => {
  //   const text = await res.text();
  //   try {
  //     return JSON.parse(text);
  //   } catch {
  //     throw new Error("Invalid JSON response: " + text);
  //   }
  // })
  // .then((data) => setLiked(data.isFavorite))
  // .catch((err) => console.error("檢查最愛失敗", err));
  // }, [userId, route]);

  // // ⬇️ 點擊愛心時，更新畫面並同步後端
  const toggleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked); // 更新畫面

    // try {
    //   await fetch("http://localhost:3003/api/likeroutes", {
    //     method: newLiked ? "POST" : "DELETE",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       userId: "2",
    //       routeId: route.route_id,
    //     }),
    //   });
    // } catch (error) {
    //   console.error("更新最愛失敗", error);
    //   setLiked(!newLiked); // 錯誤時還原狀態
    // }
  };
  return (
    <div className={styles.card} onClick={goToPage2}>
      <div className={styles.imageWrapper}>
        <FontAwesomeIcon
          icon={liked ? solidHeart : regularHeart}
          className={styles.faicon}
          onClick={(e) => {
            e.stopPropagation(); /*阻止冒泡事件,點擊愛心不會跳到下一頁*/
            toggleLike();
          }}
        />
        <img src={route.img} alt={route.name} />
      </div>
      <div className={styles.route}>
        <h2>{route.name}</h2>
        <p>總長：{route.distance} 公里</p>
        <p>難度：{route.difficulty}</p>
        <p>價格：NT${route.price} 起</p>
      </div>
    </div>
  );
}
