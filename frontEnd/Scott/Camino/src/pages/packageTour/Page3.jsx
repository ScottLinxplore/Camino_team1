// import { useState } from "react";
// import CheckoutSteps from "../../features/packageTour/page3/CheckoutSteps";
// import "./Page3.module.css";
// import TripDetails from "../../features/packageTour/page3/TripDetails";
// import TransportInfo from "../../features/packageTour/page3/TransportInfo";
// import AccommodationCard from "../../features/packageTour/page3/AccommodationCard";
// import AmountSummary from "../../features/packageTour/page3/AmountSummary";
// import { useNavigate } from "react-router-dom";

// function P_3_Package() {
//   const navigate = useNavigate();

//   const goToPage4 = () => {
//     navigate("/page4");
//   };
//   const goToPage2 = () => {
//     navigate("/page2");
//   };
//   // const [count, setCount] = useState(0);
//   const [currentStep, setCurrentStep] = useState(1);

//   const nextStep = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       setCurrentStep(0);
//     }
//   };

//   return (
//     <div style={{ width: "90%", margin: "0 auto" }}>
//       <h2
//         style={{
//           fontSize: "60px",
//           fontWeight: "bold",
//           // margin: 40,
//           // border: "2px solid palevioletred",
//           width: "100%",
//         }}
//       >
//         訂單明細
//       </h2>
//       <CheckoutSteps currentStep={currentStep} />
//       <button onClick={nextStep}>下一步</button>
//       <div>
//         <TripDetails />
//       </div>
//       <div>
//         <TransportInfo />
//       </div>
//       <div>
//         <h3 style={{ fontWeight: "bold" }}>住宿資訊</h3>

//         <AccommodationCard
//           name="Bunk Room"
//           date="2025/7/15 - 2025/8/9"
//           day="24"
//           price="0"
//         />

//         <AccommodationCard
//           name="Private Room"
//           date="2025/8/9 - 2025/8/11"
//           day="2"
//           price="1000"
//         />
//       </div>
//       <div>
//         <AmountSummary totalAmount={25144} onNext={goToPage4} />
//       </div>
//       {/* <div>
//         <button onClick={goToPage2}>返回</button>
//         <button onClick={goToPage4}>下一頁</button>
//       </div> */}
//     </div>
//   );
// }

// export default P_3_Package;

// P_3_Package.jsx
// P_3_Package.jsx
// P_3_Package.jsx
// P_3_Package.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../features/packageTour/page3/CheckoutSteps";
import TripDetails from "../../features/packageTour/page3/TripDetails";
import TransportInfo from "../../features/packageTour/page3/TransportInfo";
import AccommodationCard from "../../features/packageTour/page3/AccommodationCard";
import AmountSummary from "../../features/packageTour/page3/AmountSummary";
import "./Page3.module.css";

function P_3_Package() {
  const location = useLocation();
  const navigate = useNavigate();
  const { routeId, startDate, endDate, departure, returning, rooms, carCount } =
    location.state || {};

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

  // 分段住宿統計
  const groupedRooms = [];
  if (rooms && rooms.length > 0) {
    let currentGroup = {
      name: rooms[0].room,
      dates: [rooms[0].date],
      price: calcRoomPrice(rooms[0].room),
    };
    for (let i = 1; i < rooms.length; i++) {
      if (rooms[i].room === currentGroup.name) {
        currentGroup.dates.push(rooms[i].date);
      } else {
        groupedRooms.push(currentGroup);
        currentGroup = {
          name: rooms[i].room,
          dates: [rooms[i].date],
          price: calcRoomPrice(rooms[i].room),
        };
      }
    }
    groupedRooms.push(currentGroup);
  }

  const roomTotal = rooms.reduce((acc, r) => acc + calcRoomPrice(r.room), 0);
  const shuttleTotal = (carCount || 0) * 2500;
  const totalAmount =
    (departure?.price || 0) +
    (returning?.price || 0) +
    roomTotal +
    shuttleTotal;
  console.log(rooms);

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <h2 style={{ fontSize: "60px", fontWeight: "bold", width: "100%" }}>
        訂單明細
      </h2>
      <CheckoutSteps currentStep={currentStep} />
      <button onClick={nextStep}>下一步</button>

      <TripDetails routeId={routeId} startDate={startDate} endDate={endDate} />
      <TransportInfo
        departure={departure}
        returning={returning}
        dateGo={new Date(startDate)}
        dateBack={new Date(endDate)}
        shuttleCount={carCount}
        shuttleTotal={shuttleTotal}
      />

      <div>
        <h3 style={{ fontWeight: "bold" }}>住宿資訊</h3>
        {groupedRooms.map((group, index) => {
          const start = group.dates[0];
          const end = group.dates[group.dates.length - 1];
          return (
            <AccommodationCard
              key={index}
              name={group.name}
              date={`${start} - ${end}`}
              day={group.dates.length}
              price={group.price * group.dates.length}
            />
          );
        })}
      </div>

      <AmountSummary
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
