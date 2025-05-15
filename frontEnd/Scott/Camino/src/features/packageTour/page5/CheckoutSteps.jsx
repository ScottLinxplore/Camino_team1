import styles from "./CheckoutSteps.module.css";

const steps = ["商品頁面", "訂單明細", "填寫資料", "付款頁面"];

export default function CheckoutSteps({ currentStep }) {
  return (
    <div className={styles["checkout-steps"]}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.step} ${index === currentStep ? styles.active : ""}`}
        >
          <span>{step}</span>
          <div className={styles.underline} />
        </div>
      ))}
    </div>
  );
}
