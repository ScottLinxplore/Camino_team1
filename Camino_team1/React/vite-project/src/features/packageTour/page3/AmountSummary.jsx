import style from "./AmountSummary.module.css";
import React from "react";
{
  /* ------------------------金額判斷有改-------------------------------- */
}
{
  /* ------------------------金額判斷有改-------------------------------- */
}
{
  /* ------------------------金額判斷有改-------------------------------- */
}
export default function AmountSummary({ totalAmount, onNext, showPrice }) {
  return (
    <div className={style["amount-card"]}>
      <div className={style["amount-left"]}>金額明細</div>
      <div className={style["amount-right"]}>
        {showPrice ? (
          <div className={style["amount-total"]}>總計 NT${totalAmount}</div>
        ) : (
          <div className={style["amount-total"]}>總計 NT$100,000</div>
        )}
        <button className={style["amount-button"]} onClick={onNext}>
          下一步
        </button>
      </div>
    </div>
  );
}
