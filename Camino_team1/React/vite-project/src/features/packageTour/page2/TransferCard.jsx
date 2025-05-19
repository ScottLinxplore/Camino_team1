import React from "react";
import style from "./TransferCard.module.css";

export default function TransferCard({
  title,
  img,
  route,
  time,
  date,
  model,
  price,
}) {
  return (
    <div className={style["transfer-card"]}>
      <h3 className={style["transfer-title"]}>{title}</h3>
      <div className={style["transfer-box"]}>
        <img src={img} alt="transfer" className={style["transfer-img"]} />
        <div className={style["transfer-info"]}>
          <p className={style.route}>{route}</p>
          <p>接駁車行程約 {time}</p>
          <p>{date}</p>
          <p>車型：{model}</p>
        </div>
        {/*  ------------------------金額改調----------------------------------------  */}
        {/*  ------------------------金額改調----------------------------------------  */}
        {/*  ------------------------金額改調----------------------------------------  */}
        {/* <div className={style["transfer-price"]}>
          NT$ {price.toLocaleString()}
        </div> */}
      </div>
    </div>
  );
}
