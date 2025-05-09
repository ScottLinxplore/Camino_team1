import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";

import "../css/P3_PlainingPlane.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function PlainingPlane() {
  const [data, setData] = useState(null); //用來存放從後端抓到的資料

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => console.log("抓到資料：", json) || setData(json))
      .catch((error) => console.error("抓資料失敗", error));
  }, []);
  const navigate = useNavigate();
  //接上一頁的
  const location = useLocation();
  const routeId = location.state?.routeId;
  const route = data?.find((item) => item.route_id === parseInt(routeId));
  console.log(location.state);
  const { startDate: initialStart, endDate: initialEnd } = location.state || {};
  //設定checkbox初始狀態
  const [showDepartureFlights, setShowDeparture] = useState(false);
  const [showReturnFlights, setShowReturn] = useState(false);
  //新增兩個航班選擇狀態
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);

  const [startDate, setStartDate] = useState(
    // 建立狀態變數 startDate
    initialStart ? new Date(initialStart) : null // 如果上一頁有傳來 startDate
  ); // 就轉成 Date 物件
  const [endDate, setEndDate] = useState(
    initialEnd ? new Date(initialEnd) : null // 否則設為 null（沒選日期）
  );
  //   加入去程班機
  const departureFlights = [
    {
      id: 1,
      route: "TPE → BKK → ZRH → CDG",
      price: "NTD 25,144",
      durationHours: "34hr",
      dayOffset: "2天",
    },
    {
      id: 2,
      route: "TPE → CDG → BIQ",
      price: "NTD 25,500",
      durationHours: "14hr",
      dayOffset: "1天",
    },
    {
      id: 3,
      route: "TPE → BIQ",
      price: "NTD 78,500",
      durationHours: "14hr",
      dayOffset: "1天",
    },
  ];
  //   加入回程班機
  const returnFlights = [
    {
      id: 1,
      route: "MAD → TPE",
      price: "NTD 25,000",
      durationHours: "28hr",
      dayOffset: "1天",
    },
    {
      id: 2,
      route: "MAD → CDG → TPE",
      price: "NTD 18,500",
      durationHours: "34hr",
      dayOffset: "2天",
    },
  ];
  // 將 "NTD 25,000" → 25000，移除文字轉成數字
  const getPriceNumber = (priceStr) =>
    parseInt(priceStr.replace(/[^0-9]/g, ""), 10);

  // 將 "14hr" → 14
  const getHoursNumber = (hourStr) =>
    parseInt(hourStr.replace(/[^0-9]/g, ""), 10);

  const totalDuration =
    (selectedDepartureFlight
      ? getHoursNumber(selectedDepartureFlight.durationHours)
      : 0) +
    (selectedReturnFlight
      ? getHoursNumber(selectedReturnFlight.durationHours)
      : 0);

  const totalPrice =
    (selectedDepartureFlight
      ? getPriceNumber(selectedDepartureFlight.price)
      : 0) +
    (selectedReturnFlight ? getPriceNumber(selectedReturnFlight.price) : 0);

  return (
    <div className="planing-plane">
      <div className="route_name">
        <h3>{route?.name && route.name}</h3>
      </div>

      <div className="calendar-container">
        <div className="calendar-group">
          <DatePicker
            selected={startDate}
            readOnly
            onChange={() => {}}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="M/d"
            popperPlacement="right-start"
            minDate={new Date()}
            customInput={<CustomDateInput label="起始日期" />}
          />
        </div>

        <div className="calendar-group">
          <DatePicker
            selected={endDate}
            readOnly
            onChange={() => {}}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="M/d"
            popperPlacement="left-start"
            minDate={startDate || new Date()}
            customInput={<CustomDateInput label="結束日期" />}
          />
        </div>
      </div>
      {/* {/* Timeline 時間軸 */}
      <div className="timeline-container" style={{ marginTop: "3rem" }}>
        <div className="timeline-step ">
          {showDepartureFlights && selectedDepartureFlight ? (
            <div className="plane-on-dot">✈️</div>
          ) : (
            <div className="dot" />
          )}
          <div className="label">
            {showDepartureFlights && selectedDepartureFlight
              ? selectedDepartureFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        {/* 第一段連接線 */}
        <div
          className={`timeline-line long2 ${
            showDepartureFlights && selectedDepartureFlight ? "blue-line" : ""
          }`}
        />
        {/* 抵達機場 */}
        <div className="timeline-step ">
          <div className="dot" />
          <div className="label">
            {showDepartureFlights && selectedDepartureFlight
              ? selectedDepartureFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>

        <div className="timeline-line" />

        <div className="timeline-step">
          <div className="dot" />
          <div className="label">聖讓</div>
        </div>
        <div className="timeline-line completed  long" />

        <div className="timeline-step ">
          <div className="dot" />
          <div className="label">聖地牙哥</div>
        </div>

        <div className="timeline-line " />

        {/* 回程出發機場 */}
        <div className="timeline-step">
          {showReturnFlights && selectedReturnFlight ? (
            <div className="plane-on-dot">✈️</div>
          ) : (
            <div className="dot" />
          )}
          <div className="label">
            {showReturnFlights && selectedReturnFlight
              ? selectedReturnFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        {/* 回程中間線 */}
        <div
          className={`timeline-line long2 ${
            showReturnFlights && selectedReturnFlight ? "blue-line" : ""
          }`}
        />

        {/* 回程抵達機場 */}
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">
            {showReturnFlights && selectedReturnFlight
              ? selectedReturnFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>
      </div>
      {/* Checkbox 航班選擇 */}
      <div className="checkbox-container">
        <label className="departurecheck">
          <input
            type="checkbox"
            checked={showDepartureFlights}
            onChange={() => {
              const newValue = !showDepartureFlights;
              setShowDeparture(newValue);
              if (!newValue) {
                setSelectedDepartureFlight(null); // 清除選擇
              }
            }}
          />
          去程班機:
        </label>

        <label className="returncheck">
          <input
            type="checkbox"
            checked={showReturnFlights}
            onChange={() => {
              const newValue = !showReturnFlights;
              setShowReturn(newValue);
              if (!newValue) {
                setSelectedReturnFlight(null); // 清除選擇
              }
            }}
          />
          回程班機:
        </label>
      </div>
      <div className="flight-list-container">
        <div className="departure-flight-list">
          {departureFlights.map((flight) => (
            <div
              key={flight.id}
              className={`flight-card 
        ${selectedDepartureFlight?.id === flight.id ? "selected" : ""} 
        ${!showDepartureFlights ? "disabled" : ""}
      `}
              onClick={() => {
                if (showDepartureFlights) setSelectedDepartureFlight(flight);
              }}
            >
              <div className="route">{flight.route}</div>
              <div className="price">{flight.price}</div>
              <div className="duration">總耗時：{flight.durationHours}</div>
            </div>
          ))}
        </div>

        <div className="Return-flight-list">
          {returnFlights.map((flight) => (
            <div
              key={flight.id}
              className={`flight-card 
        ${selectedReturnFlight?.id === flight.id ? "selected" : ""} 
        ${!showReturnFlights ? "disabled" : ""}
      `}
              onClick={() => {
                if (showReturnFlights) setSelectedReturnFlight(flight);
              }}
            >
              <div className="route">{flight.route}</div>
              <div className="price">{flight.price}</div>
              <div className="duration">總耗時：{flight.durationHours}</div>
            </div>
          ))}
        </div>
      </div>

      {(selectedDepartureFlight || selectedReturnFlight) && (
        <div className="fight-text" style={{ textAlign: "center" }}>
          <span className="flight-time" style={{ marginRight: "2rem" }}>
            飛行耗時: {totalDuration} 小時
          </span>
          <span className="ticket-money">總花費: {totalPrice} 元</span>
        </div>
      )}

      <div className="button-group">
        <Button text="返回" onClick={() => console.log("點了返回！")} />
        <Button
          text="下一步"
          onClick={() => {
            //  跳轉並傳送 state
            if (startDate && endDate) {
              navigate("/Day", {
                state: {
                  startDate,
                  endDate,
                  departureFlight: selectedDepartureFlight, //冒號左邊是要給下一頁的東西 右邊是這一頁要傳的值
                  returnFlight: selectedReturnFlight,
                  routeId: routeId,
                },
              });
            } else {
              alert("請選擇完整日期！");
            }
          }}
        />
      </div>
    </div>
  );
}
function CustomDateInput({ value, onClick, label }) {
  return (
    <div className="calendar-card" onClick={onClick}>
      <div className="calendar-header">{label}</div>
      <div className="calendar-body">{value || "/"}</div>
    </div>
  );
}
