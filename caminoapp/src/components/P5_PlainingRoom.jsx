import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../css/P5_PlainingRoom.css";
import Button from "./Button";

export default function PlainingRoom() {
  const location = useLocation();
  const { startDate, endDate, departureFlight, returnFlight } =
    location.state || {};
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  //私人房

  const [peopleCount, setPeopleCount] = useState("2");
  const [roomType, setRoomType] = useState(""); //  "bunk"、"private"、"none"
  //日期選擇
  const dateOptions =
    startDate && endDate ? getDateOptions(startDate, endDate) : [];
  const filteredEndOptions = selectedStartDate //選開始日後 結束日要篩掉比開始日小的
    ? dateOptions.filter((d) => d.value > selectedStartDate)
    : dateOptions;
  //右邊區快
  const [roomSelections, setRoomSelections] = useState([]);
  const [roomPlan, setRoomPlan] = useState({});

  return (
    <div className="planing-Room">
      <div className="route_name">
        <h3>法國之路</h3>
      </div>
      {/* 日期 */}
      <div className="calendar-container">
        <div className="calendar-group">
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            readOnly
            onChange={() => {}}
            dateFormat="M/d"
            customInput={<CustomDateInput label="起始日期" />}
          />
        </div>
        <div className="calendar-group">
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            readOnly
            onChange={() => {}}
            dateFormat="M/d"
            customInput={<CustomDateInput label="結束日期" />}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-container" style={{ marginTop: "3rem" }}>
        {/* 去程出發 */}
        <div className="timeline-step">
          {departureFlight ? (
            <div className="plane-on-dot">✈️</div>
          ) : (
            <div className="dot" />
          )}
          <div className="label">
            {departureFlight
              ? departureFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        <div
          className={`timeline-line long2 ${
            departureFlight ? "blue-line" : ""
          }`}
        />

        {/* 去程抵達 */}
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">
            {departureFlight
              ? departureFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>

        <div className="timeline-line" />
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">聖讓</div>
        </div>

        <div className="timeline-line completed long" />
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">聖地牙哥</div>
        </div>

        <div className="timeline-line" />

        {/* 回程出發 */}
        <div className="timeline-step">
          {returnFlight ? (
            <div className="plane-on-dot">✈️</div>
          ) : (
            <div className="dot" />
          )}
          <div className="label">
            {returnFlight
              ? returnFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        <div
          className={`timeline-line long2 ${returnFlight ? "blue-line" : ""}`}
        />

        {/* 回程抵達 */}
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">
            {returnFlight
              ? returnFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>
      </div>
      <div className="room-type-text">
        <h3>
          選擇想要的房型
          {startDate &&
            endDate &&
            ` ${new Date(startDate).toLocaleDateString("zh-TW", {
              month: "numeric",
              day: "numeric",
            })} - ${new Date(endDate).toLocaleDateString("zh-TW", {
              month: "numeric",
              day: "numeric",
            })}`}
        </h3>
      </div>
      <div className="room-selection-container">
        <div className="room-selection-left">
          <div className="date-picker-container">
            <select
              value={selectedStartDate}
              onChange={(e) => {
                setSelectedStartDate(e.target.value);
                setSelectedEndDate(""); // 改起始日結束日要重設
              }}
            >
              <option value="">請選擇</option>
              {dateOptions.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            <span style={{ margin: "0 8px", fontSize: "1.5rem" }}>To</span>

            <select
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
            >
              <option value="">請選擇</option>
              {filteredEndOptions.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div className="room-options">
            {/* 共用房 */}
            <label>
              <input
                type="checkbox"
                checked={roomType === "bunk"}
                onChange={() => setRoomType("bunk")}
              />
              共用房
            </label>

            {/* 私人房 */}
            <label>
              <input
                type="checkbox"
                checked={roomType === "private"}
                onChange={() => setRoomType("private")}
              />
              私人房
            </label>

            {/* ✅ 如果選私人房，就顯示人數下拉 */}
            {roomType === "private" && (
              <select
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                style={{ marginLeft: "8px" }}
              >
                <option value="2">2人房</option>
                <option value="3">3人房</option>
                <option value="4">4人房</option>
              </select>
            )}

            {/* 不訂購 */}
            <label>
              <input
                type="checkbox"
                name="roomtype"
                checked={roomType === "none"} //那麼 roomType === "none" 就是 true 就打勾
                onChange={() => setRoomType("none")}
              />
              自行訂購
            </label>
          </div>

          <button className="submit-button" onClick={handleAddRoomSelection}>
            新增
          </button>
        </div>
        <div className="arrow-divider"></div>
        {/* 中間箭頭 */}
        <div className="room-selection-right">
          {Object.entries(roomPlan).map(([date, type]) => (
            //Object.entries(obj) 會把每個 key/value pair 變成一組 [key, value] 陣列。
            // 所以 entry[0] 一定是「key（也就是你的日期）」，entry[1] 一定是「value（也就是你的房型）」
            //不解構寫法
            // Object.entries(roomPlan).map((entry) => {
            //   const date = entry[0];  // 就是 key（日期）
            //   const type = entry[1];  // 就是 value（房型）
            // });
            <div className="room-row" key={date}>
              <span style={{ width: "60px" }}>{date}</span>
              <select
                value={type}
                onChange={(e) =>
                  setRoomPlan((prev) => ({
                    ...prev,
                    [date]: e.target.value,
                  }))
                } //
              >
                <option value="共用房">共用房</option>
                <option value="私人房 - 2人房">私人房 - 2人房</option>
                <option value="私人房 - 3人房">私人房 - 3人房</option>
                <option value="私人房 - 4人房">私人房 - 4人房</option>
                <option value="自行訂購">自行訂購</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      <div className="button-group">
        <Button text="返回" onClick={() => console.log("點了返回！")} />
        <Button text="下一步" onClick={() => console.log("點了下一步！")} />
      </div>
    </div>
  );
  function handleAddRoomSelection() {
    if (!selectedStartDate || !selectedEndDate || !roomType) return;

    const updatedPlan = {};

    const tripStart = new Date(startDate); // 整段旅程起始日
    const tripEnd = new Date(endDate); // 整段旅程結束日

    const selectedStart = new Date(selectedStartDate); // 使用者選的起始日
    const selectedEnd = new Date(selectedEndDate); // 使用者選的結束日

    // 先把所有日期都設為自行訂購
    for (
      let d = new Date(tripStart);
      d <= tripEnd;
      d.setDate(d.getDate() + 1)
    ) {
      const key = d.toLocaleDateString("zh-TW", {
        month: "numeric",
        day: "numeric",
      });
      updatedPlan[key] = "自行訂購";
    }

    // 再把選取區間的房型覆蓋上去
    for (
      let d = new Date(selectedStart);
      d <= selectedEnd;
      d.setDate(d.getDate() + 1) //設定日期（幾號）set跟get都是js方法
    ) {
      const key = d.toLocaleDateString("zh-TW", {
        month: "numeric",
        day: "numeric",
      });

      updatedPlan[key] =
        roomType === "bunk"
          ? "共用房"
          : roomType === "private"
          ? `私人房 - ${peopleCount}人房`
          : "自行訂購";
    }
    setRoomPlan(updatedPlan);
  }
}

// 自訂日期元件
function CustomDateInput({ value, onClick, label }) {
  return (
    <div className="calendar-card" onClick={onClick}>
      <div className="calendar-header">{label}</div>
      <div className="calendar-body">{value || "/"}</div>
    </div>
  );
}

function getDateOptions(startStr, endStr) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  const dates = [];

  while (start <= end) {
    const label = `${start.getMonth() + 1}/${start.getDate()}`;
    const value = start.toISOString().split("T")[0];
    dates.push({ label, value });
    start.setDate(start.getDate() + 1);
  }

  return dates;
}

function getDateRange(startStr, endStr) {
  const result = [];
  const start = new Date(startStr);
  const end = new Date(endStr);

  let current = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  while (current <= end) {
    const key = current.toLocaleDateString("zh-TW", {
      month: "numeric",
      day: "numeric",
    });
    result.push(key);

    // 每次創建新的 Date避免修改原始物件造成誤差
    current = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + 1
    );
  }

  return result;
}
