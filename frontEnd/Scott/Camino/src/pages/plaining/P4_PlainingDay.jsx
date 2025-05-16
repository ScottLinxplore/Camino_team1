import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DayChoose from "../../features/plaining/dayChoose";
import TransferChoose from "../../features/plaining/transferChoose";
import Button from "../../features/plaining/Button";
import styles from "./P4_PlainingDay.module.css";

function DayChoosePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [Days, setDays] = useState(null);
  const [CarFee, setCarFee] = useState(null);
  const [TransferTime, setTransferTime] = useState(null);
  const [isStartTransfer, setIsStartTransfer] = useState(false);
  const [isEndTransfer, setIsEndTransfer] = useState(false);
  const [carCount, setCarCount] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);

  const routeId = location.state?.routeId;

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.error("抓資料失敗", error);
      });
  }, []);

  useEffect(() => {
    const state = location.state;
    if (state?.startDate) setStartDate(new Date(state.startDate));
    if (state?.endDate) setEndDate(new Date(state.endDate));
    if (state?.departureFlight)
      setSelectedDepartureFlight(state.departureFlight);
    if (state?.returnFlight) setSelectedReturnFlight(state.returnFlight);
    if (state?.Days) setDays(state.Days);
  }, [location.state]);

  const totalDays =
    (selectedDepartureFlight?.costDays || 0) +
    (selectedReturnFlight?.costDays || 0);

  const trailMaxAvalableDays =
    startDate && endDate
      ? (endDate - startDate) / (1000 * 60 * 60 * 24) - totalDays
      : 0;

  const route = data?.find((item) => item.route_id === parseInt(routeId));
  console.log(selectedDepartureFlight);

  return (
    <div>
      <div className={styles.routeName}>
        <h3>{route?.name}</h3>
      </div>

      <div className={styles.calendarContainer}>
        <div className={styles.calendarGroup}>
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

        <div className={styles.calendarGroup}>
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

      <div className={styles.timelineContainer}>
        <div className={styles.timelineStep}>
          {selectedDepartureFlight ? (
            <div className={styles.planeOnDot}>✈️</div>
          ) : (
            <div className={styles.dot} />
          )}
          <div className={styles.label}>
            {selectedDepartureFlight
              ? selectedDepartureFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        <div
          className={`${styles.timelineLine} ${styles.long2} ${
            selectedDepartureFlight ? styles.blueLine : ""
          }`}
        />

        <div className={styles.timelineStep}>
          <div className={styles.dot} />
          <div className={styles.label}>
            {selectedDepartureFlight
              ? selectedDepartureFlight.route.split("→").slice(-1)[0].trim()
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
          {selectedReturnFlight ? (
            <div className={styles.planeOnDot}>✈️</div>
          ) : (
            <div className={styles.dot} />
          )}
          <div className={styles.label}>
            {selectedReturnFlight
              ? selectedReturnFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        <div
          className={`${styles.timelineLine} ${styles.long2} ${
            selectedReturnFlight ? styles.blueLine : ""
          }`}
        />
        <div className={styles.timelineStep}>
          <div className={styles.dot} />
          <div className={styles.label}>
            {selectedReturnFlight
              ? selectedReturnFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>
      </div>

      <div className={styles.dayChooseWrapper}>
        <div className={styles.leftCard}>
          <DayChoose
            RID={routeId}
            onDaysChange={setDays}
            maxDays={trailMaxAvalableDays}
          />
          {route && (
            <p>
              每日公里數：
              {(route.length / (Days || route.days - 5)).toFixed(1)}km
            </p>
          )}
          <p>
            接駁車花費：NT${CarFee}
            <br />
            接駁車耗時：{TransferTime}小時
          </p>
        </div>
        <div className={styles.rightCard}>
          <TransferChoose
            RID={routeId}
            onCarFeeChange={setCarFee}
            onTransferTimeChange={setTransferTime}
            onStartTransferToggle={setIsStartTransfer}
            onEndTransferToggle={setIsEndTransfer}
            onTransferCountChange={setCarCount}
          />
        </div>
      </div>

      <div className={styles.buttonArea}>
        <Button
          text="返回"
          onClick={() =>
            navigate("/PlainingPlane", {
              state: {
                startDate,
                endDate,
                selectedDepartureFlight,
                selectedReturnFlight,
                routeId,
                goCostDays: selectedDepartureFlight?.costDays || 0,
                backCostDays: selectedReturnFlight?.costDays || 0,
                isStartTransfer,
                isEndTransfer,
              },
            })
          }
        />
        <Button
          text="下一步"
          onClick={() => {
            if (startDate && endDate) {
              navigate("/PlainingRoom", {
                state: {
                  startDate,
                  endDate,
                  departureFlight: selectedDepartureFlight,
                  returnFlight: selectedReturnFlight,
                  routeId,
                  isStartTransfer,
                  isEndTransfer,
                  Days,
                  carCount,
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
    <div className={styles.calendarCard} onClick={onClick}>
      <div className={styles.calendarHeader}>{label}</div>
      <div className={styles.calendarBody}>{value || "/"}</div>
    </div>
  );
}

export default DayChoosePage;
