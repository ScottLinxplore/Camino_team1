import React, { useState } from "react";
import style from "./PackageCard.module.css";

export default function PackageCard({ route }) {
  const [heart, setHeart] = useState(false);

  // 導去相關頁面
  const goToRoute = (routeId) => {
    window.open(`/routeintro${routeId}`, "_blank");
  };

  return (
    <>
      <div
        className={style.card}
        onClick={() => {
          goToRoute(route.route_id);
        }}
      >
        <div className={style.upper}>
          {/* 愛心放這裡, 有css不要可以刪除 */}
          <div
            className={style.heart}
            onClick={() => {
              setHeart(!heart);
            }}
          ></div>

          <img src={route.img} />

          <div className={style.corner}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M100,100 L50,100 Q100,90 100,50 Z" fill="#d9f85c" />
            </svg>
          </div>

          <div className={style.title}>{route.name}</div>
        </div>

        <div className={style.content}>
          <div className={style.info}>
            <span>{route.length} km</span>
            <span>|</span>
            <span>{route.days}日</span>
            <span>|</span>
            <span>
              {{
                1: "簡單",
                2: "中等",
                3: "困難",
              }[route.difficulty] || ""}
            </span>
          </div>

          <div className={style.cost}>${route.pricing} 起</div>
        </div>
      </div>
    </>
  );
}
