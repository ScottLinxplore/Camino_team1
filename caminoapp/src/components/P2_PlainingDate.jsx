import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/P2_PlainingDate.css";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom"; //可以把這頁的值船去下一頁

// 主元件
export default function PlainingDate() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate(); //可以把這頁的值船去下一頁
  const [data, setData] = useState(null); //用來存放從後端抓到的資料
  const location = useLocation();
  const routeId = location.state?.routeId;
  const route = data?.find((item) => item.route_id === parseInt(routeId));
  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => console.log("抓到資料：", json) || setData(json))
      .catch((error) => console.error("抓資料失敗", error));
  }, []);
  return (
    <div className="planingdate">
      <div className="route_name">
        <h3>{route?.name && route.name}</h3>
      </div>

      <div className="calendar-container">
        {/* 起始日期 */}
        <div className="calendar-group">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)} //使用者每次選日期，就把選到的 date 存進 startDate 狀態裡
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="M/d"
            popperPlacement="left-start"
            minDate={new Date()} //不能選今天以前
            customInput={<CustomDateInput label="起始日期" />}
          />
          {!startDate && <div className="calendar-error">*請選擇出發日期</div>}
          {/* 條件 && <想要顯示的東西> */}
        </div>
        {/* 結束日期 */}
        <div className="calendar-group">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="M/d"
            popperPlacement="right-start"
            minDate={startDate || new Date()} // 結束日不能早於起始日
            customInput={<CustomDateInput label="結束日期" />}
          />
          {!endDate && <div className="calendar-error">*請選擇結束日期</div>}
        </div>
      </div>
      {/* {/* Timeline 時間軸 */}
      <div className="timeline-container">
        <div className="timeline-step ">
          <div className="dot" />
          <div className="label">出發機場</div>
        </div>
        <div className="timeline-line  long2" />

        <div className="timeline-step ">
          <div className="dot" />
          <div className="label">抵達機場</div>
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

        <div className="timeline-step">
          <div className="dot" />
          <div className="label">出發機場</div>
        </div>
        <div className="timeline-line long2" />

        <div className="timeline-step">
          <div className="dot" />
          <div className="label">抵達機場</div>
        </div>
      </div>
      <div className="button-group">
        <Button text="返回" onClick={() => console.log("點了返回！")} />
        <Button
          text="下一步"
          onClick={() => {
            //  跳轉並傳送 state
            if (startDate && endDate) {
              navigate("/PlainingPlane", {
                state: {
                  startDate,
                  endDate,
                  routeId,
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

// 自訂輸入元件
function CustomDateInput({ value, onClick, label }) {
  console.log(label);
  console.log(value); //value = 格式化後的 selected 日期字串 value = format(startDate, "M/d")
  // onclick是自己傳進來的 就是打開視窗
  return (
    <div className="calendar-card" onClick={onClick}>
      <div className="calendar-header">{label}</div>
      <div className="calendar-body">{value || "/"}</div>
    </div>
  );
}
