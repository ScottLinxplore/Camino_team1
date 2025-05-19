import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutSteps from "../../packageTour/page5/CheckoutSteps";
import PassengerForm from "../../packageTour/page5/PassengerForm";
import AmountSummary from "../../packageTour/page5/AmountSummary";
import styles from "./Page5.module.css";

function P_5_package() {
  const navigate = useNavigate();
  const location = useLocation();

  // 從前一頁傳來的資料
  const { routeId, totalAmount } = location.state || {};

  const [count, setCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(3);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  //綠界付款 API 呼叫
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:3002/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount }),
      });

      const html = await response.text();
      const newWindow = window.open(); // 在新視窗開啟綠界頁面
      newWindow.document.write(html);
    } catch (error) {
      console.error("❌ 發送付款請求失敗：", error);
      alert("付款請求失敗，請稍後再試");
    }
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        付款頁面
      </h2>

      <CheckoutSteps currentStep={currentStep} />

      <div className={styles["booking-container"]}>
        {/* 左側：填寫資料區 */}
        <div className={styles["booking-left"]}>
          <PassengerForm />
          <AmountSummary
            totalAmount={totalAmount}
            onNext={handlePayment} // ✅ 點擊觸發綠界付款流程
          />
        </div>
      </div>
    </div>
  );
}

export default P_5_package;
