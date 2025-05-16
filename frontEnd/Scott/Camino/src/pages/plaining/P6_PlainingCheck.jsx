// import RouteCheck from "../../features/plaining/routeCheck";
// import TrafficCheck from "../../features/plaining/trafficCheck";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useEffect, useState } from "react";
// import Button from "../../features/plaining/Button";
// import { useLocation, useNavigate } from "react-router-dom";
// import styles from "./P6_PlainingCheck.module.css";

// function CheckPage() {
//   const {
//     startDate,
//     endDate,
//     departureFlight,
//     returnFlight,
//     routeId,
//     isStartTransfer,
//     isEndTransfer,
//     Days,
//     roomPlan,
//     selectedStartDate,
//     selectedEndDate,
//   } = useLocation().state || {};

//   const [route, setRoute] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!routeId) return;

//     fetch("http://localhost:3002/route")
//       .then((res) => res.json())
//       .then((routes) => {
//         const current = routes.find((r) => r.route_id === parseInt(routeId));
//         setRoute(current);
//       })
//       .catch((err) => console.error("抓 route 失敗", err));
//   }, [routeId]);
//   console.log(departureFlight);
//   console.log(returnFlight);
//   console.log(routeId);
//   console.log(startDate, endDate);
//   console.log(roomPlan);

//   return (
//     <>
//       <div className={styles.routeName}>
//         <h3>{route?.name}</h3>
//       </div>

//       <div className={styles.calendarContainer}>
//         <div className={styles.calendarGroup}>
//           <DatePicker
//             selected={startDate ? new Date(startDate) : null}
//             readOnly
//             onChange={() => {}}
//             dateFormat="M/d"
//             customInput={<CustomDateInput label="起始日期" />}
//           />
//         </div>
//         <div className={styles.calendarGroup}>
//           <DatePicker
//             selected={endDate ? new Date(endDate) : null}
//             readOnly
//             onChange={() => {}}
//             dateFormat="M/d"
//             customInput={<CustomDateInput label="結束日期" />}
//           />
//         </div>
//       </div>

//       {/* Timeline */}
//       <div className={styles.timelineContainer}>
//         {/* 去程出發 */}
//         <div className={styles.timelineStep}>
//           {departureFlight ? (
//             <div className={styles.planeOnDot}>✈️</div>
//           ) : (
//             <div className={styles.dot} />
//           )}
//           <div className={styles.label}>
//             {departureFlight
//               ? departureFlight.route.split("→")[0].trim()
//               : "出發機場"}
//           </div>
//         </div>

//         <div
//           className={`${styles.timelineLine} ${styles.long2} ${
//             departureFlight ? styles.blueLine : ""
//           }`}
//         />

//         {/* 去程抵達 */}
//         <div className={styles.timelineStep}>
//           <div className={styles.dot} />
//           <div className={styles.label}>
//             {departureFlight
//               ? departureFlight.route.split("→").slice(-1)[0].trim()
//               : "抵達機場"}
//           </div>
//         </div>

//         <div
//           className={`${styles.timelineLine} ${
//             isStartTransfer ? styles.blueLine : ""
//           }`}
//         />
//         <div className={styles.timelineStep}>
//           <div className={styles.dot} />
//           <div className={styles.label}>聖讓</div>
//         </div>

//         <div
//           className={`${styles.timelineLine} ${styles.completed} ${styles.long}`}
//         />
//         <div className={styles.timelineStep}>
//           <div className={styles.dot} />
//           <div className={styles.label}>聖地牙哥</div>
//         </div>

//         <div
//           className={`${styles.timelineLine} ${
//             isEndTransfer ? styles.blueLine : ""
//           }`}
//         />

//         {/* 回程出發 */}
//         <div className={styles.timelineStep}>
//           {returnFlight ? (
//             <div className={styles.planeOnDot}>✈️</div>
//           ) : (
//             <div className={styles.dot} />
//           )}
//           <div className={styles.label}>
//             {returnFlight
//               ? returnFlight.route.split("→")[0].trim()
//               : "出發機場"}
//           </div>
//         </div>

//         <div
//           className={`${styles.timelineLine} ${styles.long2} ${
//             returnFlight ? styles.blueLine : ""
//           }`}
//         />

//         {/* 回程抵達 */}
//         <div className={styles.timelineStep}>
//           <div className={styles.dot} />
//           <div className={styles.label}>
//             {returnFlight
//               ? returnFlight.route.split("→").slice(-1)[0].trim()
//               : "抵達機場"}
//           </div>
//         </div>
//       </div>

//       {/* 底下資訊 */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "20px",
//           margin: "0 auto",
//           width: "100%",
//         }}
//       >
//         <div style={{ display: "block" }}>
//           <TrafficCheck />
//         </div>
//         <div style={{ display: "block", marginTop: "-10px" }}>
//           <RouteCheck Days={Days} />
//         </div>
//       </div>

//       <div className={styles.buttonGroup}>
//         <Button
//           text="返回"
//           onClick={() => {
//             navigate("/PlainingRoom", {
//               state: {
//                 startDate,
//                 endDate,
//                 departureFlight,
//                 returnFlight,
//                 routeId,
//                 isStartTransfer,
//                 isEndTransfer,
//                 Days,
//                 roomPlan,
//                 selectedStartDate,
//                 selectedEndDate,
//               },
//             });
//           }}
//         />

//         <Button
//           text="下一步"
//           onClick={() => {
//             navigate("/page3", {
//               state: {
//                 startDate,
//                 endDate,
//                 departureFlight,
//                 returnFlight,
//                 routeId,
//                 isStartTransfer,
//                 isEndTransfer,
//                 Days,
//                 roomPlan,
//                 selectedStartDate,
//                 selectedEndDate,
//               },
//             });
//           }}
//         />
//       </div>
//     </>
//   );
// }

// // 日期選擇器客製樣式
// function CustomDateInput({ value, onClick, label }) {
//   return (
//     <div className={styles.calendarCard} onClick={onClick}>
//       <div className={styles.calendarHeader}>{label}</div>
//       <div className={styles.calendarBody}>{value || "/"}</div>
//     </div>
//   );
// }

// export default CheckPage;

// CheckPage.jsx
import RouteCheck from "../../features/plaining/routeCheck";
import TrafficCheck from "../../features/plaining/trafficCheck";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Button from "../../features/plaining/Button";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./P6_PlainingCheck.module.css";

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

function transformRoomPlan(roomPlan) {
  return Object.entries(roomPlan).map(([date, room]) => ({
    date,
    room,
    isCustom: room === "自行訂購",
  }));
}

function CheckPage() {
  const {
    startDate,
    endDate,
    departureFlight,
    returnFlight,
    routeId,
    isStartTransfer,
    isEndTransfer,
    Days,
    roomPlan,
    selectedStartDate,
    selectedEndDate,
    carCount,
  } = useLocation().state || {};

  const [route, setRoute] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!routeId) return;
    fetch("http://localhost:3002/route")
      .then((res) => res.json())
      .then((routes) => {
        const current = routes.find((r) => r.route_id === parseInt(routeId));
        setRoute(current);
      })
      .catch((err) => console.error("抓 route 失敗", err));
  }, [routeId]);

  const transformedDeparture = transformFlight(departureFlight);
  const transformedReturn = transformFlight(returnFlight);
  const transformedRooms = transformRoomPlan(roomPlan);
  console.log(carCount);

  return (
    <>
      <div className={styles.routeName}>
        <h3>{route?.name}</h3>
      </div>

      <div className={styles.calendarContainer}>
        <div className={styles.calendarGroup}>
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            readOnly
            onChange={() => {}}
            dateFormat="M/d"
            customInput={<CustomDateInput label="起始日期" />}
          />
        </div>
        <div className={styles.calendarGroup}>
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            readOnly
            onChange={() => {}}
            dateFormat="M/d"
            customInput={<CustomDateInput label="結束日期" />}
          />
        </div>
      </div>

      <div className={styles.timelineContainer}>
        <div className={styles.timelineStep}>
          {departureFlight ? (
            <div className={styles.planeOnDot}>✈️</div>
          ) : (
            <div className={styles.dot} />
          )}
          <div className={styles.label}>
            {departureFlight
              ? departureFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        <div
          className={`${styles.timelineLine} ${styles.long2} ${
            departureFlight ? styles.blueLine : ""
          }`}
        />

        <div className={styles.timelineStep}>
          <div className={styles.dot} />
          <div className={styles.label}>
            {departureFlight
              ? departureFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>

        <div
          className={`${styles.timelineLine} ${
            isStartTransfer ? styles.blueLine : ""
          }`}
        />
        <div className={styles.timelineStep}>
          <div className={styles.dot} />
          <div className={styles.label}>聖讓</div>
        </div>

        <div
          className={`${styles.timelineLine} ${styles.completed} ${styles.long}`}
        />
        <div className={styles.timelineStep}>
          <div className={styles.dot} />
          <div className={styles.label}>聖地牙哥</div>
        </div>

        <div
          className={`${styles.timelineLine} ${
            isEndTransfer ? styles.blueLine : ""
          }`}
        />

        <div className={styles.timelineStep}>
          {returnFlight ? (
            <div className={styles.planeOnDot}>✈️</div>
          ) : (
            <div className={styles.dot} />
          )}
          <div className={styles.label}>
            {returnFlight
              ? returnFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        <div
          className={`${styles.timelineLine} ${styles.long2} ${
            returnFlight ? styles.blueLine : ""
          }`}
        />

        <div className={styles.timelineStep}>
          <div className={styles.dot} />
          <div className={styles.label}>
            {returnFlight
              ? returnFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ display: "block" }}>
          <TrafficCheck />
        </div>
        <div style={{ display: "block", marginTop: "-10px" }}>
          <RouteCheck Days={Days} />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button
          text="返回"
          onClick={() => {
            navigate("/PlainingRoom", {
              state: {
                startDate,
                endDate,
                departureFlight,
                returnFlight,
                routeId,
                isStartTransfer,
                isEndTransfer,
                Days,
                roomPlan,
                selectedStartDate,
                selectedEndDate,
              },
            });
          }}
        />

        <Button
          text="下一步"
          onClick={() => {
            navigate("/page3", {
              state: {
                startDate,
                endDate,
                routeId,
                departure: transformedDeparture,
                returning: transformedReturn,
                rooms: transformedRooms,
                carCount,
              },
            });
          }}
        />
      </div>
    </>
  );
}

function CustomDateInput({ value, onClick, label }) {
  return (
    <div className={styles.calendarCard} onClick={onClick}>
      <div className={styles.calendarHeader}>{label}</div>
      <div className={styles.calendarBody}>{value || "/"}</div>
    </div>
  );
}

export default CheckPage;
