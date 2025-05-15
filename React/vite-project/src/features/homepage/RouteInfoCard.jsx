import React, { useState } from "react";
import style from "./RouteInfoCard.module.css";

export default function RouteInfoCard({ route }) {
  const [heart, setHeart] = useState(false);

  //導去相關頁面
  const goToRouteInfo = (routeId) => {
    window.open(`/routeintro${routeId}`, "_blank");
  };

  return (
    <>
      <div className={style.card} onClick={() => goToRouteInfo(route.route_id)}>
        <div className={style.upper}>
          <div
            className={style.heart}
            onClick={() => {
              setHeart(!heart);
            }}
          >
            {/* 愛心放這裡, 有css不要可以刪除 */}
          </div>

          <img src={route.img} />

          <div className={style.corner}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M100,0 L50,0 Q100,10 100,50 Z" fill="#d9f85c" />
            </svg>
          </div>

          <div className={style.title}>{route.name}</div>
        </div>
      </div>
    </>
  );
}
