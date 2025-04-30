import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/P2_PlainingDate.css";

// 主元件
export default function PlainingDate() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="planingdate">
      <div className="route_name">
        <h3>法國之路</h3>
      </div>

      <div className="calendar-container">
        {/* 起始日期 */}
        <div className="calendar-group">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="M/d"
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
            minDate={startDate || new Date()} // 結束日不能早於起始日
            customInput={<CustomDateInput label="結束日期" />}
          />
          {!endDate && <div className="calendar-error">*請選擇結束日期</div>}
        </div>
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
