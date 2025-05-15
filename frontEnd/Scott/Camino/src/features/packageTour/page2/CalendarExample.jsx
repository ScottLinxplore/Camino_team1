import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import zhTW from "date-fns/locale/zh-TW";
import "react-datepicker/dist/react-datepicker.css";
import style from "./CalendarStyles.module.css"; // 你自訂的樣式

registerLocale("zh-TW", zhTW);

export default function CalendarRange() {
  const [startDate, setStartDate] = useState(new Date("2025-07-22"));
  const [endDate, setEndDate] = useState(null);

  return (
    <div className={style.datepicker}>
      {/* 日曆本體 */}
      <DatePicker
        selected={startDate}
        onChange={(dates) => {
          const [start, end] = dates;
          setStartDate(start);
          setEndDate(end);
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        locale="zh-TW"
        monthsShown={2} // 顯示兩個月
        dateFormat="yyyy/MM/dd"
      />

      {/* 顯示選擇結果 */}

      <div className={style["se-container"]}>
        <div className={style["se-date"]}>
          <span className={style["text-date"]}>日期 </span>
          {startDate
            ? `${startDate.toLocaleDateString()}-`
            : "尚未選擇開始日期"}
          {endDate ? `${endDate.toLocaleDateString()}` : "尚未選擇結束日期"}
          <p>
            <span className={style["text-date"]}>國家 </span>
            <span>法國</span>
          </p>
          <p>
            <span className={style["text-date"]}>城市 </span>
            <span>聖讓-皮耶-德波爾</span>
          </p>
          <p>
            <span className={style["text-date"]}>機場 </span>
            <span>戴高樂機場</span>
          </p>

          {/* <p>
        <span>日期</span>
          {startDate
            ? `${startDate.toLocaleDateString()}-`
            : "尚未選擇開始日期"}
          {endDate
            ? `${endDate.toLocaleDateString()}`
            : "尚未選擇結束日期"}
        </p>
        <p><span>國家</span>法國</p>
        <p><span>城市</span>聖讓-皮耶-德波爾</p>
        <p><span>出發機場</span>戴高樂機場</p> */}
        </div>
        <div className={style["se-cash"]}>
          <span className={style["text-date"]}>金額 </span>
          <span>100000 NTD</span>
        </div>
      </div>
    </div>
  );
}
