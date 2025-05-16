import style from "./AmountSummary.module.css";

export default function AmountSummary({ totalAmount = 25144, onNext }) {
  return (
    <div className={style["amount-card"]}>
      <div className={style["amount-left"]}>金額明細</div>
      <div className={style["amount-right"]}>
        <div className={style["amount-total"]}>總計 NT${totalAmount}</div>
        <button className={style["amount-button"]} onClick={onNext}>
          下一步
        </button>
      </div>
    </div>
  );
}
