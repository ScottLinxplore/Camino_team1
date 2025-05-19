import { useState } from "react";
import React from "react";
import style from "./Page2.module.css";
import PhotoGrid from "../../packageTour/page2/PhotoGrid";
import CheckoutSteps from "../../packageTour/page2/CheckoutSteps";
import RouteCard from "../../packageTour/page2/RouteCard";
import CalendarExample from "../../packageTour/page2/CalendarExample";
import FlightCard from "../../packageTour/page2/FlightCard";
import TransferCard from "../../packageTour/page2/TransferCard";
import { useNavigate, useLocation } from "react-router-dom";

const images = [
  "../../../../public/img/01.jpg",
  "../../../../public/img/02.jpg",
  "../../../../public/img/03.jpg",
  "../../../../public/img/04.jpg",
  "../../../../public/img/05.jpg",
];

// 用來轉換 flight 資料為陣列格式
function transformFlight(flight) {
  if (!flight) return null;
  const result = {
    id: flight.id,
    route: flight.route,
    price: parseInt(flight.price.replace(/[^\d]/g, "")),
    durationHours: flight.durationHours,
    dayOffset: flight.dayOffset,
    costDays: flight.costDays,
    airlines: [],
    departures: [],
    arrivals: [],
    prices: [],
  };
  Object.entries(flight).forEach(([key, value]) => {
    if (key.startsWith("airline")) result.airlines.push(value);
    if (key.startsWith("departure")) result.departures.push(value);
    if (key.startsWith("arrival")) result.arrivals.push(value);
    if (key.startsWith("price") && key !== "price") result.prices.push(value);
  });
  return result;
}

function P_2_package() {
  const location = useLocation();
  const state = location.state || {};

  const startDate = state.startDate || new Date("2025-07-15");
  const endDate = state.endDate || new Date("2025-08-10");

  const departureRaw = state.departure || {
    id: 1,
    route: "TPE → BKK → ZRH → CDG",
    price: "NT$25,144",
    durationHours: "34hr",
    airline1: "中華航空 CI833",
    airline2: "中華航空 CI833",
    airline3: "中華航空 CI833",
    departure1: "清晨 7:00 台北 (TPE)",
    departure2: "中午 12:50 曼谷 (BKK)",
    departure3: "晚上 9:50 瑞士 (ZRH)",
    arrival1: "上午 9:45 曼谷 (BKK)",
    arrival2: "晚上 19:35 瑞士 (ZRH)",
    arrival3: "晚上 11:05 法國 (CDG)",
    price1: "5843",
    price2: "12751",
    price3: "6550",
  };

  const returningRaw = state.returning || {
    id: 2,
    route: "MAD → TPE",
    price: "NT$25,000",
    durationHours: "28hr",
    airline1: "中華航空 CI873",
    departure1: "清晨 7:00 馬德里 (MAD)",
    arrival1: "中午 11:00 台北 (TPE)",
    price1: "25000",
  };

  const departure = transformFlight(departureRaw);
  const returning = transformFlight(returningRaw);

  const rooms = state.rooms || [
    { date: "2025-07-16", room: "共用房", isCustom: true },
    { date: "2025-07-17", room: "共用房", isCustom: true },
    { date: "2025-07-18", room: "共用房", isCustom: true },
    { date: "2025-07-19", room: "共用房", isCustom: true },
    { date: "2025-07-20", room: "共用房", isCustom: true },
    { date: "2025-07-21", room: "共用房", isCustom: true },
    { date: "2025-07-22", room: "共用房", isCustom: true },
    { date: "2025-07-23", room: "共用房", isCustom: true },
    { date: "2025-07-24", room: "共用房", isCustom: true },
    { date: "2025-07-25", room: "共用房", isCustom: true },
    { date: "2025-07-26", room: "共用房", isCustom: true },
    { date: "2025-07-27", room: "共用房", isCustom: true },
    { date: "2025-07-28", room: "共用房", isCustom: true },
    { date: "2025-07-29", room: "共用房", isCustom: true },
    { date: "2025-07-30", room: "共用房", isCustom: true },
    { date: "2025-07-31", room: "共用房", isCustom: true },
    { date: "2025-08-01", room: "共用房", isCustom: true },
    { date: "2025-08-02", room: "共用房", isCustom: true },
    { date: "2025-08-03", room: "共用房", isCustom: true },
    { date: "2025-08-04", room: "共用房", isCustom: true },
    { date: "2025-08-05", room: "共用房", isCustom: true },
    { date: "2025-08-06", room: "共用房", isCustom: true },
    { date: "2025-08-07", room: "共用房", isCustom: true },
    { date: "2025-08-08", room: "共用房", isCustom: true },
    { date: "2025-08-09", room: "共用房", isCustom: true },
    { date: "2025-08-10", room: "共用房", isCustom: true },
  ];

  const carCount = state.carCount ?? 2;
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0));

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <h2 style={{ fontSize: "60px", fontWeight: "bold", margin: 40 }}>
        商品頁面
      </h2>
      <CheckoutSteps currentStep={currentStep} />
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
              route={departure.route}
              price={departure.price}
              duration={departure.durationHours}
            />
            <FlightCard
              title="回程班機："
              route={returning.route}
              price={returning.price}
              duration={returning.durationHours}
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
        <button
          onClick={() => navigate("/page1")}
          className={style["rebutton"]}
        >
          回訂購首頁
        </button>
        <button
          onClick={() => {
            if (startDate && endDate) {
              navigate("/page3", {
                state: {
                  startDate,
                  endDate,
                  routeId: "1",
                  departure,
                  returning,
                  rooms,
                  carCount,
                  showPrice: false,
                },
              });
            } else {
              alert("請選擇完整日期！");
            }
          }}
          className={style["nebutton"]}
        >
          下一步
        </button>
      </div>
    </div>
  );
}

export default P_2_package;
