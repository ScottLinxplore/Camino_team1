import React from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/P2_PlainingDate.css";

export default function PlainingRoom() {
  const location = useLocation();
  const { startDate, endDate, departureFlight, returnFlight } =
    location.state || {};

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
    </div>
  );
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
