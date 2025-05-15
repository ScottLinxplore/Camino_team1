import React from "react";
import style from "./FlightCard.module.css";

export default function FlightCard({ title, route, price, duration }) {
  return (
    <div className={style["flight-card"]}>
      <h3 className={style["flight-title"]}>{title}</h3>
      <div className={style["flight-box"]}>
        <div className={style["flight-info"]}>
          <p>{route}</p>
          <p>NTD {price.toLocaleString()}</p>
          <p>
            總耗時：<span className={style.duration}>{duration}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
