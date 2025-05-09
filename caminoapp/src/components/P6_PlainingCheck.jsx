import { useLocation } from "react-router-dom";
import RouteCheck from "./routeCheck";
import TrafficCheck from "./trafficCheck";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Button from "./Button";
function CheckPage() {
  const {
    startDate,
    endDate,
    departureFlight,
    returnFlight,
    routeId,
    selectedStartDate,
    selectedEndDate,
    roomPlan,
    isStartTransfer,
    isEndTransfer,
  } = useLocation().state || {};
  const [route, setRoute] = useState(null);
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

  return (
    <>
      <div className="route_name">
        <h3>{route?.name && route.name}</h3>
      </div>
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

        <div
          className={`timeline-line ${isStartTransfer ? "blue-line" : ""}`}
        />
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">聖讓</div>
        </div>

        <div className="timeline-line completed long" />
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">聖地牙哥</div>
        </div>

        <div className={`timeline-line ${isEndTransfer ? "blue-line" : ""}`} />

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

      {/* 底下資訊 */}
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
          <RouteCheck />
        </div>
      </div>
      <div className="button-group">
        <Button
          text="返回"
          onClick={() => {
            console.log("要連接到訂購頁面");
          }}
        />
        <Button
          text="下一步"
          onClick={() => {
            console.log("要連接到訂購頁面");
          }}
        />
      </div>
    </>
  );
}

// 日期選擇器客製樣式
function CustomDateInput({ value, onClick, label }) {
  return (
    <div className="calendar-card" onClick={onClick}>
      <div className="calendar-header">{label}</div>
      <div className="calendar-body">{value || "/"}</div>
    </div>
  );
}

export default CheckPage;
