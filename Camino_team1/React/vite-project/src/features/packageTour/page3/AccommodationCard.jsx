import React from "react";
import style from "./AccommodationCard.module.css";

export default function AccommodationCard({
  name,
  date,
  day,
  price,
  showPrice,
}) {
  return (
    <div className={style["accommodation-card"]}>
      <div className={style["card-header"]}>
        <div className={style["card-info"]}>
          <h4 className={style["card-name"]}>{name}</h4>
        </div>
      </div>
      <div className={style["card-body"]}>
        <p>房型：{name}</p>
        <p>日期：{date}</p>
        <p>共計：{day}天</p>
        {showPrice && (
          <div className={style["card-price"]}>總計 NT${price}</div>
        )}
        {/* ------------------------金額判斷有改-------------------------------- */}
        {/* ------------------------金額判斷有改-------------------------------- */}
        {/* ------------------------金額判斷有改-------------------------------- */}
      </div>
    </div>
  );
}
