import styles from "./AmountSummary.module.css";

export default function AmountSummary({ totalAmount = 25144, onNext }) {
  return (
    <div className={styles["amount-card"]}>
      <div className={styles["amount-left"]}>金額明細</div>
      <div className={styles["amount-right"]}>
        <div className={styles["amount-total"]}>總計 ${totalAmount}</div>
        <button className={styles["next-button"]} onClick={onNext}>
          前往付款
        </button>
      </div>
    </div>
  );
}
