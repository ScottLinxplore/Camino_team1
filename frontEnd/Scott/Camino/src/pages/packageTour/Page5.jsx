import { useState } from "react";
import "./Page5.module.css";
import CheckoutSteps from "../../features/packageTour/page5/CheckoutSteps";
import PassengerForm from "../../features/packageTour/page5/PassengerForm";
import FlightInfo from "../../features/packageTour/page5/FlightInfo";
import AccommodationList from "../../features/packageTour/page5/AccommodationList";
import AmountSummary from "../../features/packageTour/page5/AmountSummary";
import { useNavigate } from "react-router-dom";
import styles from "./Page5.module.css";

function P_5_package() {
  const navigate = useNavigate();
  const goToPage1 = () => {
    navigate("/page1");
  };
  const goToPage4 = () => {
    navigate("/page4");
  };
  const [count, setCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(3);
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };
  // if()
  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          // margin: 40,
          // border: "2px solid palevioletred",
          width: "100%",
        }}
      >
        付款頁面
      </h2>
      <CheckoutSteps currentStep={currentStep} />
      {/* <button onClick={nextStep}>下一步</button> */}

      <div className={styles["booking-container"]}>
        {/* 左側：填寫資料區 */}
        <div className={styles["booking-left"]}>
          <PassengerForm />
          <AmountSummary totalAmount={25144} />
        </div>

        {/* 右側：摘要資訊區 */}
        {/* <div className={styles["booking-right"]}>
          <FlightInfo />
          <AccommodationList />
        </div> */}
      </div>
      <div>
        {/* <button onClick={goToPage4}>返回</button>
        <button onClick={goToPage1}>下一頁</button> */}
      </div>
    </div>
  );
}

export default P_5_package;
