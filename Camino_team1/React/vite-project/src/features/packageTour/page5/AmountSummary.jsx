import styles from "./AmountSummary.module.css";
import React from "react";
// ------------------totalAmount預設金額有改掉--------------------------
// ------------------totalAmount預設金額有改掉--------------------------
// ------------------totalAmount預設金額有改掉--------------------------
export default function AmountSummary({ totalAmount, onNext }) {
  return (
    <div className={styles["amount-card"]}>
      <div className={styles["amount-left"]}>金額明細</div>
      <div className={styles["amount-right"]}>
        <div className={styles["amount-total"]}>總計 NT${totalAmount}</div>
        <button className={styles["next-button"]} onClick={onNext}>
          前往付款
        </button>
      </div>
    </div>
  );
}
