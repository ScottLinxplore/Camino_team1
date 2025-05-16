import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../plaining/Button";
import styles from "./P5_PlainingRoom.module.css";

export default function PlainingRoom() {
  const [data, setData] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [peopleCount, setPeopleCount] = useState("2");
  const [roomType, setRoomType] = useState(""); //  "bunk"、"private"、"none"
  const [roomPlan, setRoomPlan] = useState({});
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    startDate,
    endDate,
    departureFlight,
    returnFlight,
    departureFlight: selectedDepartureFlight,
    returnFlight: selectedReturnFlight,
    isStartTransfer,
    isEndTransfer,
    routeId,
    Days,
    carCount,
  } = location.state || {};

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => {
        console.log("抓到資料：", json);
        setData(json);
      })
      .catch((error) => {
        console.error("抓資料失敗", error);
      });
  }, []);

  useEffect(() => {
    const state = location.state;
    if (state?.roomPlan) setRoomPlan(state.roomPlan);
    if (state?.selectedStartDate) setSelectedStartDate(state.selectedStartDate);
    if (state?.selectedEndDate) setSelectedEndDate(state.selectedEndDate);
    if (state?.roomType) setRoomType(state.roomType);
    if (state?.peopleCount) setPeopleCount(state.peopleCount);
  }, []);

  const route = data?.find((item) => item.route_id === parseInt(routeId));
  const dateOptions =
    startDate && endDate ? getDateOptions(startDate, endDate) : [];
  const filteredEndOptions = selectedStartDate
    ? dateOptions.filter((d) => d.value > selectedStartDate)
    : dateOptions;

  useEffect(() => {
    if (!startDate || !endDate) return;
    const updatedPlan = {};
    const tripStart = new Date(startDate);
    const tripEnd = new Date(endDate);
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
    setRoomPlan((prev) => ({ ...updatedPlan, ...prev }));
  }, [startDate, endDate]);

  function handleAddRoomSelection() {
    if (!selectedStartDate || !selectedEndDate || !roomType) return;
    const selectedStart = new Date(selectedStartDate);
    const selectedEnd = new Date(selectedEndDate);
    const updatedPlan = { ...roomPlan };
    for (
      let d = new Date(selectedStart);
      d <= selectedEnd;
      d.setDate(d.getDate() + 1)
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

  function handleNextStep() {
    const stats = calculateRoomStats(roomPlan);
    setModalData(stats);
    setShowModal(true);
  }
  console.log(departureFlight);
  // console.log(roomPlan);

  return (
    <>
      <div className={styles.planingRoom}>
        <div className={styles.routeName}>
          <h3>{route?.name && route.name}</h3>
        </div>

        <div className={styles.calendarContainer}>
          <div className={styles.calendarGroup}>
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              readOnly
              onChange={() => {}}
              dateFormat="M/d"
              customInput={<CustomDateInput label="起始日期" />}
            />
          </div>
          <div className={styles.calendarGroup}>
            <DatePicker
              selected={endDate ? new Date(endDate) : null}
              readOnly
              onChange={() => {}}
              dateFormat="M/d"
              customInput={<CustomDateInput label="結束日期" />}
            />
          </div>
        </div>

        {/* timeline */}
        <div className={styles.timelineContainer}>
          {/* 出發機場 */}
          <div className={styles.timelineStep}>
            {departureFlight ? (
              <div className={styles.planeOnDot}>✈️</div>
            ) : (
              <div className={styles.dot} />
            )}
            <div className={styles.label}>
              {departureFlight
                ? departureFlight.route.split("→")[0].trim()
                : "出發機場"}
            </div>
          </div>

          {/* 出發→抵達線 */}
          <div
            className={`${styles.timelineLine} ${styles.long2} ${
              departureFlight ? styles.blueLine : ""
            }`}
          />

          {/* 抵達機場 */}
          <div className={styles.timelineStep}>
            <div className={styles.dot} />
            <div className={styles.label}>
              {departureFlight
                ? departureFlight.route.split("→").slice(-1)[0].trim()
                : "抵達機場"}
            </div>
          </div>

          {/* 接送線（CDG→聖讓） */}
          <div
            className={`${styles.timelineLine} ${styles.short}${styles.long2} ${
              isStartTransfer ? styles.blueLine : ""
            }`}
          />

          {/* 聖讓 */}
          <div className={styles.timelineStep}>
            <div className={styles.dot} />
            <div className={styles.label}>聖讓</div>
          </div>

          {/* 徒步段（綠線） */}
          <div
            className={`${styles.timelineLine} ${styles.completed} ${styles.long}`}
          />

          {/* 聖地牙哥 */}
          <div className={styles.timelineStep}>
            <div className={styles.dot} />
            <div className={styles.label}>聖地牙哥</div>
          </div>

          {/* 回程接送線 */}
          <div
            className={`${styles.timelineLine} ${styles.short}${styles.long2} ${
              isEndTransfer ? styles.blueLine : ""
            }`}
          />

          {/* 回程出發機場 */}
          <div className={styles.timelineStep}>
            {returnFlight ? (
              <div className={styles.planeOnDot}>✈️</div>
            ) : (
              <div className={styles.dot} />
            )}
            <div className={styles.label}>
              {returnFlight
                ? returnFlight.route.split("→")[0].trim()
                : "出發機場"}
            </div>
          </div>

          {/* 回程→抵達線 */}
          <div
            className={`${styles.timelineLine} ${styles.long2} ${
              returnFlight ? styles.blueLine : ""
            }`}
          />

          {/* 回程抵達 */}
          <div className={styles.timelineStep}>
            <div className={styles.dot} />
            <div className={styles.label}>
              {returnFlight
                ? returnFlight.route.split("→").slice(-1)[0].trim()
                : "抵達機場"}
            </div>
          </div>
        </div>

        <div className={styles.roomTypeText}>
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

        <div className={styles.roomSelectionContainer}>
          <div className={styles.roomSelectionLeft}>
            <div className={styles.datePickerContainer}>
              <select
                value={selectedStartDate}
                onChange={(e) => {
                  setSelectedStartDate(e.target.value);
                  setSelectedEndDate("");
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
            {selectedStartDate && selectedEndDate && (
              <p style={{ color: "steelblue", fontSize: "0.9rem" }}>
                *已選{" "}
                {new Date(selectedStartDate).toLocaleDateString("zh-TW", {
                  month: "numeric",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(selectedEndDate).toLocaleDateString("zh-TW", {
                  month: "numeric",
                  day: "numeric",
                })}{" "}
                住宿區段，請確認房型
              </p>
            )}
            <div className={styles.roomOptions}>
              <label>
                <input
                  type="checkbox"
                  checked={roomType === "bunk"}
                  onChange={() => setRoomType("bunk")}
                />
                共用房
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={roomType === "private"}
                  onChange={() => setRoomType("private")}
                />
                私人房
              </label>
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
              <label>
                <input
                  type="checkbox"
                  name="roomtype"
                  checked={roomType === "none"}
                  onChange={() => setRoomType("none")}
                />
                自行訂購
              </label>
            </div>
            <button
              className={styles.submitButton}
              onClick={handleAddRoomSelection}
            >
              新增
            </button>
          </div>
          <div className={styles.arrowDivider}></div>
          <div className={styles.roomSelectionRight}>
            {Object.entries(roomPlan).map(([date, type]) => (
              <div className={styles.roomRow} key={date}>
                <span>{date}</span>
                <select
                  value={type}
                  onChange={(e) =>
                    setRoomPlan((prev) => ({
                      ...prev,
                      [date]: e.target.value,
                    }))
                  }
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

        {Object.values(roomPlan).some((type) => type.includes("私人房")) && (
          <p
            style={{
              color: "darkred",
              fontSize: "0.9rem",
              marginTop: "8px",
              textAlign: "center",
            }}
          >
            選擇私人房一間 +NT$500 ， 您共選擇{" "}
            {
              Object.values(roomPlan).filter((type) => type.includes("私人房"))
                .length
            }{" "}
            天，共加 NT${" "}
            {Object.values(roomPlan).filter((type) => type.includes("私人房"))
              .length * 500}{" "}
          </p>
        )}

        <div className={styles.buttonGroup}>
          <Button
            text="返回"
            onClick={() =>
              navigate("/Day", {
                state: {
                  startDate,
                  endDate,
                  departureFlight: selectedDepartureFlight,
                  returnFlight: selectedReturnFlight,
                  routeId,
                  Days,
                },
              })
            }
          />
          <Button text="下一步" onClick={handleNextStep} />
        </div>
      </div>

      {showModal && modalData && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>訂單確認資訊</h3>
            <hr />
            <p>Hello ! 你將會在這裡待上 {modalData.totalDays} 天！</p>
            <ul>
              <li>私人房：{modalData.privateCount} 天</li>
              <li>共用房：{modalData.bunkCount} 天</li>
              <li>未訂購：{modalData.noneCount} 天</li>
            </ul>
            <div className={styles.calculateButton}>
              <Button text="返回" onClick={() => setShowModal(false)} />
              <Button
                text="下一步"
                onClick={() =>
                  navigate("/check", {
                    state: {
                      startDate,
                      endDate,
                      departureFlight: selectedDepartureFlight,
                      returnFlight: selectedReturnFlight,
                      routeId,
                      selectedStartDate,
                      selectedEndDate,
                      roomPlan,
                      roomType,
                      peopleCount,
                      isStartTransfer,
                      isEndTransfer,
                      Days,
                      carCount,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
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

function getDateOptions(startStr, endStr) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  const dates = [];
  while (start <= end) {
    const label = `${start.getMonth() + 1}/${start.getDate()}`;
    const value = `${start.getFullYear()}-${String(
      start.getMonth() + 1
    ).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")}`;
    dates.push({ label, value });
    start.setDate(start.getDate() + 1);
  }
  return dates;
}

function calculateRoomStats(roomPlan) {
  let privateCount = 0;
  let bunkCount = 0;
  let noneCount = 0;
  Object.values(roomPlan).forEach((type) => {
    if (type.includes("私人房")) privateCount++;
    else if (type === "共用房") bunkCount++;
    else if (type === "自行訂購") noneCount++;
  });
  return {
    privateCount,
    bunkCount,
    noneCount,
    totalDays: privateCount + bunkCount + noneCount,
  };
}
