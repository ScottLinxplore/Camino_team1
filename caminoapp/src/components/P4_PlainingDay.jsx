import DayChoose from "./dayChoose";
import TransferChoose from "./transferChoose";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

function DayChoosePage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [Days, setDays] = useState(null);
  const [CarFee, setCarFee] = useState(null);
  const [TransferTime, setTransferTime] = useState(null);
  const [isStartTransfer, setIsStartTransfer] = useState(false);
  const [isEndTransfer, setIsEndTransfer] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log("抓到資料：", json);
        console.log(data);
      })
      .catch((error) => {
        console.error("抓資料失敗", error);
      });
  }, []);

  const location = useLocation();
  const routeId = location.state?.routeId;
  const {
    startDate: rawStartDate,
    endDate: rawEndDate,
    departureFlight: selectedDepartureFlight,
    returnFlight: selectedReturnFlight,
  } = location.state || {};
  console.log(routeId);

  // ✅ 確保格式是 Date 物件
  const startDate = rawStartDate ? new Date(rawStartDate) : null;
  const endDate = rawEndDate ? new Date(rawEndDate) : null;

  console.log(data);
  const route = data?.find((item) => item.route_id === parseInt(routeId));

  return (
    <div>
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
      <div className="timeline-container" style={{ marginTop: "3rem" }}>
        {/* 出發機場 */}
        <div className="timeline-step">
          {selectedDepartureFlight ? (
            <div className="plane-on-dot">✈️</div>
          ) : (
            <div className="dot" />
          )}
          <div className="label">
            {selectedDepartureFlight
              ? selectedDepartureFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        {/* 第一段連接線 */}
        <div
          className={`timeline-line long2 ${
            selectedDepartureFlight ? "blue-line" : ""
          }`}
        />

        {/* 抵達機場 */}
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">
            {selectedDepartureFlight
              ? selectedDepartureFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>

        {/* 中間點 - 聖讓 */}
        <div
          className={`timeline-line ${isStartTransfer ? "blue-line" : ""}`}
        />
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">聖讓</div>
        </div>

        {/* 中間點 - 聖地牙哥 */}
        <div className="timeline-line completed long" />
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">聖地牙哥</div>
        </div>

        {/* 回程出發機場 */}
        <div className={`timeline-line ${isEndTransfer ? "blue-line" : ""}`} />
        <div className="timeline-step">
          {selectedReturnFlight ? (
            <div className="plane-on-dot">✈️</div>
          ) : (
            <div className="dot" />
          )}
          <div className="label">
            {selectedReturnFlight
              ? selectedReturnFlight.route.split("→")[0].trim()
              : "出發機場"}
          </div>
        </div>

        {/* 回程中間線 */}
        <div
          className={`timeline-line long2 ${
            selectedReturnFlight ? "blue-line" : ""
          }`}
        />

        {/* 回程抵達機場 */}
        <div className="timeline-step">
          <div className="dot" />
          <div className="label">
            {selectedReturnFlight
              ? selectedReturnFlight.route.split("→").slice(-1)[0].trim()
              : "抵達機場"}
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "40px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div style={{ display: "inline-block", position: "relative" }}>
            <DayChoose RID={routeId} onDaysChange={setDays} />
            {route && (
              <p>
                每日公里數：
                {(route.length / (Days ? Days : route.days - 5)).toFixed(1)}km
              </p>
            )}
            <p>
              接駁車花費：{CarFee}元 <br />
              接駁車耗時：{TransferTime}小時
            </p>
          </div>

          <div
            style={{
              display: "inline-block",
              position: "relative",
              top: "75px",
              height: "280px",
            }}
          >
            <TransferChoose
              RID={routeId}
              onCarFeeChange={setCarFee}
              onTransferTimeChange={setTransferTime}
              onStartTransferToggle={setIsStartTransfer}
              onEndTransferToggle={setIsEndTransfer}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          padding: "1rem 1.5rem",
          width: "94%", //
          boxSizing: "border-box",
        }}
      >
        <Button text={"返回"} />
        <Button
          text="下一步"
          onClick={() => {
            //  跳轉並傳送 state
            if (startDate && endDate) {
              navigate("/PlainingRoom", {
                state: {
                  startDate,
                  endDate,
                  departureFlight: selectedDepartureFlight, //冒號左邊是要給下一頁的東西 右邊是這一頁要傳的值
                  returnFlight: selectedReturnFlight,
                  routeId: routeId,
                  isStartTransfer,
                  isEndTransfer,
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

export default DayChoosePage;
