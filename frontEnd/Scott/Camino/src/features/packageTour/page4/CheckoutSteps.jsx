import style from"./CheckoutSteps.module.css";

const steps = ["商品頁面", "訂單明細", "填寫資料", "付款頁面"];

export default function CheckoutSteps({ currentStep }) {
  return (
    <div className={style["checkout-steps"]}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${style.step} ${index === currentStep ? style.active : ""}`}
        >
          <span>{step}</span>
          <div className={style.underline}/>
        </div>
      ))}
    </div>
  );
}
