// import style from "./TransportInfo.module.css";

// export default function TransportInfo() {
//   return (
//     <div className={style["transport-card"]}>
//       <h4 className={style["transport-title"]}>交通資訊</h4>
//       <table className={style["transport-table"]}>
//         <thead>
//           <tr>
//             <th>方向</th>
//             <th>航空公司</th>
//             <th>日期</th>
//             <th>起飛</th>
//             <th>抵達</th>
//             <th>金額</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td rowSpan="3">去程</td>
//             <td>中華航空 CI833</td>
//             <td>2025/7/15（二）</td>
//             <td>清晨 7:00 台北 (TPE)</td>
//             <td>上午 9:45 曼谷 (BKK)</td>
//             <td>$5843</td>
//           </tr>
//           <tr>
//             <td>瑞士航空 LX181</td>
//             <td>2025/7/15（二）</td>
//             <td>中午 12:50 曼谷 (BKK)</td>
//             <td>晚上 7:35 瑞士 (ZRH)</td>
//             <td>$12751</td>
//           </tr>
//           <tr>
//             <td>瑞士航空 LX646</td>
//             <td>2025/7/15（二）</td>
//             <td>晚上 9:50 瑞士 (ZRH)</td>
//             <td>晚上 11:05 法國 (CDG)</td>
//             <td>$6550</td>
//           </tr>
//           <tr>
//             <td>回程</td>
//             <td colSpan="5">自行選擇</td>
//           </tr>
//         </tbody>
//       </table>
//       <div className={style["total-price"]}>總計 $25144</div>
//     </div>
//   );
// }
import React from "react";
import style from "./TransportInfo.module.css";

export default function TransportInfo({
  departure,
  returning,
  dateGo = new Date(),
  dateBack = new Date(),
  shuttleCount = 0,
  shuttleTotal = 0,
}) {
  // 日期格式化：轉為 yyyy/mm/dd（週幾）
  function formatDate(date) {
    return date instanceof Date
      ? date.toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          weekday: "short",
        })
      : date;
  }

  // 渲染航班資料列
  const renderFlightRows = (flight, direction, date) => {
    if (!flight) {
      return (
        <tr>
          <td>{direction}</td>
          <td colSpan="5">自行選擇</td>
        </tr>
      );
    }

    return flight.airlines.map((airline, index) => (
      <tr key={index}>
        {index === 0 && <td rowSpan={flight.airlines.length}>{direction}</td>}
        <td>{airline}</td>
        <td>{formatDate(date)}</td>
        <td>{flight.departures[index]}</td>
        <td>{flight.arrivals[index]}</td>
        <td>NT${flight.prices?.[index] || "-"}</td>
      </tr>
    ));
  };

  const total =
    (departure?.price || 0) + (returning?.price || 0) + shuttleTotal;

  return (
    <div className={style["transport-card"]}>
      <h4 className={style["transport-title"]}>交通資訊</h4>
      <table className={style["transport-table"]}>
        <thead>
          <tr>
            <th>方向</th>
            <th>航空公司</th>
            <th>日期</th>
            <th>起飛</th>
            <th>抵達</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>
          {renderFlightRows(departure, "去程", dateGo)}
          {renderFlightRows(returning, "回程", dateBack)}
          {shuttleCount > 0 && (
            <tr>
              <td colSpan="5">接駁車（共 {shuttleCount} 趟）</td>
              <td>NT${shuttleTotal}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={style["total-price"]}>總計 NT${total}</div>
    </div>
  );
}
