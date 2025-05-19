import React from "react";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../LikeButton";


export default function Card({ route, userId }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate(); //點圖片會跳到第2頁
  const goToPage2 = () => {
    navigate("/page2");
  };


  // const toggleLike = async () => {
  //   const newLiked = !liked;
  //   setLiked(newLiked); // 更新畫面

  // };
  return (
    <div className={styles.card} onClick={goToPage2}>
      <div className={styles.imageWrapper}>
        {/* <FontAwesomeIcon
          icon={liked ? solidHeart : regularHeart}
          className={styles.faicon}
          onClick={(e) => {
            e.stopPropagation(); 
            toggleLike();}}/>*/}
        <img src={route.img} alt={route.name} /> 
        <div className={styles.heart}>
        <LikeButton data={route}/>
        </div>
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
