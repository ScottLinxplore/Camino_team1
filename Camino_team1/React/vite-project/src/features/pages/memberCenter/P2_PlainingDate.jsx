import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./P2_PlainingDate.module.css";
import Button from "../../plaining/Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function PlainingDate() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const routeId = location.state?.routeId;
  const route = data?.find((item) => item.route_id === parseInt(routeId));
  const suggestDays = route?.days;

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("抓資料失敗", err));
  }, []);

  useEffect(() => {
    const state = location.state;
    if (state?.startDate) setStartDate(new Date(state.startDate));
    if (state?.endDate) setEndDate(new Date(state.endDate));
  }, [location.state]);

  return (
    <div className={styles.planingdate}>
      <div className={styles.route_name}>
        <h3>{route?.name}</h3>
      </div>

      <div className={styles["calendar-container"]}>
        <div className={styles["calendar-group"]}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="M/d"
            popperPlacement="left-start"
            minDate={new Date()}
            customInput={<CustomDateInput label="起始日期" />}
          />
          {!startDate && (
            <div className={styles["calendar-error"]}>*請選擇出發日期</div>
          )}
        </div>

        <div className={styles["calendar-group"]}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="M/d"
            disabled={!startDate}
            popperPlacement="right-start"
            minDate={
              startDate
                ? new Date(
                    startDate.getTime() +
                      (suggestDays - 1) * 24 * 60 * 60 * 1000
                  )
                : null
            }
            customInput={<CustomDateInput label="結束日期" />}
          />
          {!endDate && (
            <div className={styles["calendar-error"]}>
              *請選擇結束日期
              <br />
              包含交通時間與健行最少共計{suggestDays - 1}天
            </div>
          )}
        </div>
      </div>

      {/* Timeline 時間軸（保持原來順序） */}
      <div className={styles["timeline-container"]}>
        <div className={styles["timeline-step"]}>
          <div className={styles.dot} />
          <div className={styles.label}>出發機場</div>
        </div>
        <div className={`${styles["timeline-line"]} ${styles.long2}`} />

        <div className={styles["timeline-step"]}>
          <div className={styles.dot} />
          <div className={styles.label}>抵達機場</div>
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
          <div className={styles.dot} />
          <div className={styles.label}>出發機場</div>
        </div>
        <div className={`${styles["timeline-line"]} ${styles.long2}`} />

        <div className={styles["timeline-step"]}>
          <div className={styles.dot} />
          <div className={styles.label}>抵達機場</div>
        </div>
      </div>

      <div className={styles["button-group"]}>
        <Button text="返回" onClick={() => navigate("/route")} />
        <Button
          text="下一步"
          onClick={() => {
            if (startDate && endDate) {
              navigate("/PlainingPlane", {
                state: { startDate, endDate, routeId },
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
