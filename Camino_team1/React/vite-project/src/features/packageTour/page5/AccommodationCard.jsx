import styles from "./AccommodationCard.module.css";
import React from "react";

export default function AccommodationCard({
  image,
  name,
  address,
  roomType,
  date,
  guests,
  price,
}) {
  return (
    <div className={styles["accommodation-card"]}>
      <div className={styles["card-header"]}>
        <img src={image} alt={name} className={styles["card-image"]} />
        <div className={styles["card-info"]}>
          <h4 className={styles["card-name"]}>{name}</h4>
          <p className={styles["card-address"]}>📍 {address}</p>
        </div>
      </div>

      <div className={styles["card-body"]}>
        <p>{roomType}</p>
        <p>日期：{date}</p>
        <p>人數：{guests}</p>
        <div className={styles["card-price"]}>總計 NT${price}</div>
      </div>
    </div>
  );
}
