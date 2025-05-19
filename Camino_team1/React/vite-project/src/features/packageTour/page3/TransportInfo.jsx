import React from "react";
import style from "./TransportInfo.module.css";

export default function TransportInfo({
  departure,
  returning,
  dateGo = new Date(),
  dateBack = new Date(),
  shuttleCount = 0,
  shuttleTotal = 0,
  showPrice,
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
        {showPrice && <td>NT${flight.prices?.[index] || "-"}</td>}
        {/* {showPrice && (<div className={style["card-price"]}>總計 NT${price}</div>)} */}
        {/* ------------------------金額判斷有改-------------------------------- */}
        {/* ------------------------金額判斷有改-------------------------------- */}
        {/* ------------------------金額判斷有改-------------------------------- */}
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
            {showPrice && <th>金額</th>}
            {/* ------------------------金額判斷有改-------------------------------- */}
            {/* ------------------------金額判斷有改-------------------------------- */}
            {/* ------------------------金額判斷有改-------------------------------- */}
          </tr>
        </thead>
        <tbody>
          {renderFlightRows(departure, "去程", dateGo)}
          {renderFlightRows(returning, "回程", dateBack)}
          {shuttleCount > 0 && (
            <tr>
              <td colSpan="5">接駁車（共 {shuttleCount} 趟）</td>
              {showPrice && <td>NT${shuttleTotal}</td>}
              {/* ------------------------金額判斷有改-------------------------------- */}
              {/* ------------------------金額判斷有改-------------------------------- */}
              {/* ------------------------金額判斷有改-------------------------------- */}
            </tr>
          )}
        </tbody>
      </table>
      {showPrice && <div className={style["total-price"]}>總計 NT${total}</div>}
      {/* ------------------------金額判斷有改-------------------------------- */}
      {/* ------------------------金額判斷有改-------------------------------- */}
      {/* ------------------------金額判斷有改-------------------------------- */}
    </div>
  );
}
