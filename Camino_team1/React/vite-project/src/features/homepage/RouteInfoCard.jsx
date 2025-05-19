import React, { useState } from "react";
import style from "./RouteInfoCard.module.css";
import LikeButton from "../LikeButton";

export default function RouteInfoCard({ sight }) {
  const [heart, setHeart] = useState(false);

  if (!sight) return null;

  //導去景點頁面
  const goToRouteInfo = (sightId) => {
    window.open(`/sight/${sightId}`, "_blank");
  };

  return (
    <>
      <div className={style.card} onClick={() => goToRouteInfo(sight.sight_id)}>
        <div className={style.upper}>
          <div
            className={style.heart}
            onClick={() => {
              setHeart(!heart);
            }}
          >
            {/* 愛心放這裡, 有css不要可以刪除 */}
            <LikeButton data={sight} />
          </div>

          <img src={sight.img_url} />

          <div className={style.corner}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M100,0 L50,0 Q100,10 100,50 Z" fill="#d9f85c" />
            </svg>
          </div>

          <div className={style.title}>{sight.cname}</div>
        </div>
      </div>
    </>
  );
}
