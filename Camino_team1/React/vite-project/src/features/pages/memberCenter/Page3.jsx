import { useState } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../packageTour/page3/CheckoutSteps";
import TripDetails from "../../packageTour/page3/TripDetails";
import TransportInfo from "../../packageTour/page3/TransportInfo";
import AccommodationCard from "../../packageTour/page3/AccommodationCard";
import AmountSummary from "../../packageTour/page3/AmountSummary";
import "./Page3.module.css";

function P_3_Package() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    routeId,
    startDate,
    endDate,
    departure,
    returning,
    rooms,
    carCount,
    showPrice = true,
  } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const calcRoomPrice = (roomName) => {
    if (roomName.includes("自行訂購")) return 0;
    if (roomName.includes("私人房") || roomName.includes("Private"))
      return 1000;
    if (roomName.includes("共用房") || roomName.includes("Bunk")) return 500;
    return 0;
  };

  // ✅ 統整相同房型的所有日期
  const groupedRoomsMap = {};
  if (rooms && rooms.length > 0) {
    rooms.forEach((r) => {
      const roomName = r.room;
      if (!groupedRoomsMap[roomName]) {
        groupedRoomsMap[roomName] = {
          name: roomName,
          dates: [],
          price: showPrice ? calcRoomPrice(roomName) : null,
          // showPrice ? group.price * group.dates.length : null
        };
      }
      groupedRoomsMap[roomName].dates.push(r.date);
    });

    // ✅ 可選：日期排序
    Object.values(groupedRoomsMap).forEach((group) => {
      group.dates.sort((a, b) => new Date(a) - new Date(b));
    });
  }

  const groupedRooms = Object.values(groupedRoomsMap);

  const roomTotal = rooms.reduce((acc, r) => acc + calcRoomPrice(r.room), 0);
  const shuttleTotal = showPrice ? (carCount || 0) * 2500 : null;
  const totalAmount =
    (departure?.price || 0) +
    (returning?.price || 0) +
    roomTotal +
    shuttleTotal;

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <h2 style={{ fontSize: "60px", fontWeight: "bold", width: "100%" }}>
        訂單明細
      </h2>

      <CheckoutSteps currentStep={currentStep} />
      {/* 改改改 */}
      {/* <button onClick={nextStep}>下一步</button> */}

      <TripDetails routeId={routeId} startDate={startDate} endDate={endDate} />
      <TransportInfo
        departure={departure}
        returning={returning}
        dateGo={new Date(startDate)}
        dateBack={new Date(endDate)}
        shuttleCount={carCount}
        shuttleTotal={shuttleTotal}
        showPrice={showPrice}
        // showPrice ? calcRoomPrice(roomName) : null
      />

      <div>
        <h3 style={{ fontWeight: "bold" }}>住宿資訊</h3>
        {groupedRooms.map((group, index) => {
          // ✅ 日期格式標準化 + 排序
          const dateObjs = group.dates
            .map((d) => new Date(d))
            .sort((a, b) => a - b);

          const ranges = [];
          let start = dateObjs[0];
          let end = dateObjs[0];

          for (let i = 1; i <= dateObjs.length; i++) {
            const curr = dateObjs[i];
            const prev = dateObjs[i - 1];
            const nextDay = new Date(prev);
            nextDay.setDate(prev.getDate() + 1);

            if (curr && curr.toDateString() === nextDay.toDateString()) {
              end = curr;
            } else {
              ranges.push({ start, end });
              start = curr;
              end = curr;
            }
          }

          const formatDate = (d) => `${d.getMonth() + 1}/${d.getDate()}`;
          const rangeText = ranges
            .map(({ start, end }) =>
              start.getTime() === end.getTime()
                ? formatDate(start)
                : `${formatDate(start)}～${formatDate(end)}`
            )
            .join("、");

          return (
            <AccommodationCard
              key={index}
              name={group.name}
              date={rangeText}
              day={group.dates.length}
              price={showPrice ? group.price * group.dates.length : null}
              showPrice={showPrice}
              // showPrice ? calcRoomPrice(roomName) : null
            />
          );
        })}
      </div>

      <AmountSummary
        showPrice={showPrice}
        totalAmount={totalAmount}
        onNext={() =>
          navigate("/page4", {
            state: {
              routeId,
              startDate,
              endDate,
              departure,
              returning,
              rooms,
              carCount,
            },
          })
        }
      />
    </div>
  );
}

export default P_3_Package;
