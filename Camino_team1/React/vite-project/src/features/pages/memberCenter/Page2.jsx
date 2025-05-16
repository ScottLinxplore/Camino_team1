import { useState } from "react";
import React from "react";
// ./Page2.module.css
import style from "./Page2.module.css";
import PhotoGrid from "../../packageTour/page2/PhotoGrid";
import CheckoutSteps from "../../packageTour/page2/CheckoutSteps";
import RouteCard from "../../packageTour/page2/RouteCard";
import CalendarExample from "../../packageTour/page2/CalendarExample";
import FlightCard from "../../packageTour/page2/FlightCard";
import TransferCard from "../../packageTour/page2/TransferCard";
import { useNavigate } from "react-router-dom";

const images = [
  "../../../../public/img/01.jpg",
  "../../../../public/img/02.jpg",
  "../../../../public/img/03.jpg",
  "../../../../public/img/04.jpg",
  "../../../../public/img/05.jpg",
];

function P_2_package() {
  const navigate = useNavigate();

  const goToPage3 = () => {
    navigate("/page3");
  };
  const goToPage1 = () => {
    navigate("/page1");
  };

  const [count, setCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };
  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <h2 style={{ fontSize: "60px", fontWeight: "bold", margin: 40 }}>
        商品頁面
      </h2>
      <CheckoutSteps currentStep={currentStep} />
      {/* <button style={{ margin: "10px" }} onClick={nextStep}>
        下一步
      </button> */}
      <PhotoGrid images={images} />
      <RouteCard />
      <div style={{ display: "flex" }}>
        <CalendarExample />
      </div>
      <div>
        <div className={style.app}>
          <h1>預定航班</h1>
          <div className={style["flight-wrapper"]}>
            <FlightCard
              title="去程班機："
              route="TPE → BKK → ZRH → CDG"
              price={25144}
              duration="34 hr"
            />
            <FlightCard
              title="回程班機："
              route="TPE → BKK → ZRH → CDG"
              price={25144}
              duration="34 hr"
            />
          </div>
        </div>
        <div className={style.app}>
          <h1>預定機場接駁車</h1>
          <div className={style["transfer-wrapper"]}>
            <TransferCard
              title="去程機場接送："
              img="../../../../public/img/10.jpg"
              route="法國戴高樂機場CDG → 聖讓皮耶德波爾"
              time="17 小時"
              date="2025 / 07 / 15"
              model="MPV-5"
              price={2500}
            />
            <TransferCard
              title="回程機場接送："
              img="../../../../public/img/12.jpg"
              route="里昂 → 西班牙馬德里機場MAD"
              time="6 小時"
              date="2025 / 08 / 10"
              model="MPV-5"
              price={2500}
            />
          </div>
        </div>
      </div>
      <div className={style["button-box"]}>
        <button onClick={goToPage1} className={style["rebutton"]}>
          回訂購首頁
        </button>
        <button onClick={goToPage3} className={style["nebutton"]}>
          下一步
        </button>
      </div>
    </div>
  );
}

export default P_2_package;
