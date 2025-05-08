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
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          margin: "0 auto",
          position: "relative",
          left: "680px",
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
