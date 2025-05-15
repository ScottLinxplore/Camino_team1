import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";

import styles from "./P3_PlainingPlane.module.css";
import Button from "../../features/plaining/Button";
import { useNavigate } from "react-router-dom";

export default function PlainingPlane() {
  const [data, setData] = useState(null); //用來存放從後端抓到的資料

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => console.log("抓到資料：", json) || setData(json))
      .catch((error) => console.error("抓資料失敗", error));
  }, []);
  useEffect(() => {
    const state = location.state;
    if (state?.selectedDepartureFlight) {
      setSelectedDepartureFlight(state.selectedDepartureFlight);
      setShowDeparture(true);
      setGoCostDays(state.goCostDays || 0);
    }

    if (state?.selectedReturnFlight) {
      setSelectedReturnFlight(state.selectedReturnFlight);
      setShowReturn(true);
      setBackCostDays(state.backCostDays || 0);
    }

    if (state?.startDate) setStartDate(new Date(state.startDate));
    if (state?.endDate) setEndDate(new Date(state.endDate));
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
  const [goCostDays, setGoCostDays] = useState();
  const [backCostDays, setBackCostDays] = useState();

  //   加入去程班機
  const departureFlights = [
    {
      id: 1,
      route: "TPE → BKK → ZRH → CDG",
      price: "NTD 25,144",
      durationHours: "34hr",
      dayOffset: "2天",
      costDays: 2,
      airline1: "中華航空 CI833",
      airline2: "瑞士航空 LX181",
      airline3: "瑞士航空 LX646",
      departure1: "清晨 7:00 台北 (TPE)",
      departure2: "中午 12:50 曼谷 (BKK)",
      departure3: "晚上 9:50 瑞士 (ZRH)",
      arrival1: "上午 9:45 曼谷 (BKK)",
      arrival2: "晚上 19:35 瑞士 (ZRH)",
      arrival3: "晚上 11:05 法國 (CDG)",
      price1: 5843,
      price2: 12751,
      price3: 6550,
    },
    {
      id: 2,
      route: "TPE → CDG → BIQ",
      price: "NTD 25,500",
      durationHours: "14hr",
      dayOffset: "1天",
      costDays: 1,
      airline1: "中華航空 CI833",
      airline2: "法國航空 AF599",
      departure1: "清晨 7:00 台北 (TPE)",
      departure2: "晚上 21:50 巴黎 (CDG)",
      arrival1: "晚上 19:45 巴黎 (CDG)",
      arrival2: "晚上 23:15 比亞里茲 (BIQ)",
      price1: 19000,
      price2: 6500,
    },
    {
      id: 3,
      route: "TPE → BIQ",
      price: "NTD 78,500",
      durationHours: "14hr",
      dayOffset: "1天",
      costDays: 1,
      airline1: "中華航空 CI833",
      departure1: "清晨 7:00 台北 (TPE)",
      arrival1: "晚上 21:45 比亞里茲 (BIQ)",
      price1: 78500,
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
      costDays: 2,
      airline1: "中華航空 CI873",
      departure1: "清晨 7:00 馬德里 (MAD)",
      arrival1: "中午 11:00 台北 (TPE)",
      price1: 25000,
    },
    {
      id: 2,
      route: "MAD → CDG → TPE",
      price: "NTD 18,500",
      durationHours: "34hr",
      dayOffset: "2天",
      costDays: 2,
      airline1: "法國航空 AF873",
      airline2: "中華航空 CI833",
      departure1: "清晨 7:00 馬德里 (MAD)",
      departure2: "晚上 21:50 巴黎 (CDG)",
      arrival1: "晚上 19:45 巴黎 (CDG)",
      arrival2: "晚上 23:15 台北 (TPE)",
      price1: 12000,
      price2: 6500,
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
    <div className={styles["planing-plane"]}>
      <div className={styles.route_name}>
        <h3>{route?.name && route.name}</h3>
      </div>

      <div className={styles["calendar-container"]}>
        <div className={styles["calendar-group"]}>
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

        <div className={styles["calendar-group"]}>
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
      <div
        className={styles["timeline-container"]}
        style={{ marginTop: "3rem" }}
      >
        <div className={styles["timeline-step"]}>
          {showDepartureFlights && selectedDepartureFlight ? (
            <div className={styles["plane-on-dot"]}>✈️</div>
          ) : (
            <div className={styles.dot} />
          )}
          <div className={styles.label}>
            {showDepartureFlights && selectedDepartureFlight
              ? selectedDepartureFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        <div
          className={`${styles["timeline-line"]} ${styles.long2} ${
            showDepartureFlights && selectedDepartureFlight
              ? styles["blue-line"]
              : ""
          }`}
        />

        <div className={styles["timeline-step"]}>
          <div className={styles.dot} />
          <div className={styles.label}>
            {showDepartureFlights && selectedDepartureFlight
              ? selectedDepartureFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>

        <div className={styles["timeline-line"]} />

        <div className={styles["timeline-step"]}>
          <div className={styles.dot} />
          <div className={styles.label}>聖讓</div>
        </div>

        <div
          className={`${styles["timeline-line"]} ${styles.completed} ${styles.long}`}
        />

        <div className={styles["timeline-step"]}>
          <div className={styles.dot} />
          <div className={styles.label}>聖地牙哥</div>
        </div>

        <div className={styles["timeline-line"]} />

        <div className={styles["timeline-step"]}>
          {showReturnFlights && selectedReturnFlight ? (
            <div className={styles["plane-on-dot"]}>✈️</div>
          ) : (
            <div className={styles.dot} />
          )}
          <div className={styles.label}>
            {showReturnFlights && selectedReturnFlight
              ? selectedReturnFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        <div
          className={`${styles["timeline-line"]} ${styles.long2} ${
            showReturnFlights && selectedReturnFlight ? styles["blue-line"] : ""
          }`}
        />

        <div className={styles["timeline-step"]}>
          <div className={styles.dot} />
          <div className={styles.label}>
            {showReturnFlights && selectedReturnFlight
              ? selectedReturnFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>
      </div>

      <div className={styles["checkbox-container"]}>
        <label className={styles.departurecheck}>
          <input
            type="checkbox"
            checked={showDepartureFlights}
            onChange={() => {
              const newValue = !showDepartureFlights;
              setShowDeparture(newValue);
              if (!newValue) {
                setSelectedDepartureFlight(null);
              }
            }}
          />
          去程班機:
        </label>

        <label className={styles.returncheck}>
          <input
            type="checkbox"
            checked={showReturnFlights}
            onChange={() => {
              const newValue = !showReturnFlights;
              setShowReturn(newValue);
              if (!newValue) {
                setSelectedReturnFlight(null);
              }
            }}
          />
          回程班機:
        </label>
      </div>

      <div className={styles["flight-list-container"]}>
        <div className={styles["departure-flight-list"]}>
          {departureFlights.map((flight) => (
            <div
              key={flight.id}
              className={`${styles["flight-card"]} ${
                selectedDepartureFlight?.id === flight.id ? styles.selected : ""
              } ${!showDepartureFlights ? styles.disabled : ""}`}
              onClick={() => {
                if (showDepartureFlights) {
                  setSelectedDepartureFlight(flight);
                  setGoCostDays(flight.costDays);
                }
              }}
            >
              <div className={styles.route}>{flight.route}</div>
              <div className={styles.price}>{flight.price}</div>
              <div className={styles.duration}>
                總耗時：{flight.durationHours}
              </div>
            </div>
          ))}
        </div>

        <div className={styles["Return-flight-list"]}>
          {returnFlights.map((flight) => (
            <div
              key={flight.id}
              className={`${styles["flight-card"]} ${
                selectedReturnFlight?.id === flight.id ? styles.selected : ""
              } ${!showReturnFlights ? styles.disabled : ""}`}
              onClick={() => {
                if (showReturnFlights) {
                  setSelectedReturnFlight(flight);
                  setBackCostDays(flight.costDays);
                }
              }}
            >
              <div className={styles.route}>{flight.route}</div>
              <div className={styles.price}>{flight.price}</div>
              <div className={styles.duration}>
                總耗時：{flight.durationHours}
              </div>
            </div>
          ))}
        </div>
      </div>

      {(selectedDepartureFlight || selectedReturnFlight) && (
        <div className={styles["fight-text"]} style={{ textAlign: "center" }}>
          <span
            className={styles["flight-time"]}
            style={{ marginRight: "2rem" }}
          >
            飛行耗時: {totalDuration} 小時
          </span>
          <span className={styles["ticket-money"]}>
            總花費: {totalPrice} 元
          </span>
        </div>
      )}

      <div className={styles["button-group"]}>
        <Button
          text="返回"
          onClick={() =>
            navigate("/PlainingDate", {
              state: {
                startDate,
                endDate,
                routeId,
                selectedDepartureFlight,
                selectedReturnFlight,
                goCostDays,
                backCostDays,
              },
            })
          }
        />
        <Button
          text="下一步"
          onClick={() => {
            const totalDays = (goCostDays || 0) + (backCostDays || 0);
            if (startDate && endDate) {
              navigate("/Day", {
                state: {
                  startDate,
                  endDate,
                  departureFlight: selectedDepartureFlight,
                  returnFlight: selectedReturnFlight,
                  routeId: routeId,
                  flightTotalCostDays: totalDays,
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
    <div className={styles["calendar-card"]} onClick={onClick}>
      <div className={styles["calendar-header"]}>{label}</div>
      <div className={styles["calendar-body"]}>{value || "/"}</div>
    </div>
  );
}
