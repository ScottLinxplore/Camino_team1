import style from "./AccommodationCard.module.css";

export default function AccommodationCard({
  name,
  roomType,
  date,
  day,
  price,
}) {
  return (
    <div className={style["accommodation-card"]}>
      <div className={style["card-header"]}>
        <div className={style["card-info"]}>
          <h4 className={style["card-name"]}>{name}</h4>
        </div>
      </div>
      <div className={style["card-body"]}>
        <p>{roomType}</p>
        <p>日期：{date}</p>
        <p>共計：{day}天</p>
        {price !== undefined && <p>總計：${price}</p>}
      </div>
    </div>
  );
}
