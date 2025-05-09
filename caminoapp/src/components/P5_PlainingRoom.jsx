import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../css/P5_PlainingRoom.css";
import Button from "./Button";

export default function PlainingRoom() {
  const [data, setData] = useState(null);
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
  } = location.state || {};
  const routeId = location.state?.routeId;
  const route = data?.find((item) => item.route_id === parseInt(routeId));

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
  // 幫你「一開始就準備好每天」要顯示的資料，每天都先設為「自行訂購」
  const [roomPlan, setRoomPlan] = useState(() => {
    if (!startDate || !endDate) return {};

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
      }); //全部預設為自行訂購
      updatedPlan[key] = "自行訂購";
    }

    return updatedPlan;
  });

  //彈窗用
  const [modalData, setModalData] = useState(null); // 統計資料
  const [showModal, setShowModal] = useState(false); // 控制彈窗開關
  //點下一步去彈窗
  function handleNextStep() {
    const stats = calculateRoomStats(roomPlan); // 1計算出天數 下面的參數只是參數 這邊的參數是值定義我要計算roomplan
    setModalData(stats); // 存進 state，提供彈窗顯示內容
    setShowModal(true); // 打開彈窗
  }
  return (
    <>
      <div className="planing-Room">
        <div className="route_name">
          <h3>{route?.name && route.name}</h3>
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

          <div
            className={`timeline-line ${isEndTransfer ? "blue-line" : ""}`}
          />

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
            {selectedStartDate && selectedEndDate && (
              <p
                style={{
                  color: "steelblue",
                  fontSize: "0.9rem",
                }}
              >
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
        {Object.values(roomPlan).some((type) => type.includes("私人房")) && (
          <p
            style={{
              color: "darkred",
              fontSize: "0.9rem",
              marginTop: "8px",
              textAlign: "center",
            }}
          >
            選擇私人房一間 +500 元， 您共選擇{" "}
            {
              Object.values(roomPlan).filter((type) => type.includes("私人房"))
                .length
            }{" "}
            天，共加{" "}
            {Object.values(roomPlan).filter((type) => type.includes("私人房"))
              .length * 500}{" "}
            元
          </p>
        )}

        <div className="button-group">
          <Button text="返回" onClick={() => console.log("點了返回！")} />
          <Button text="下一步" onClick={handleNextStep} />
        </div>
      </div>
      {showModal && modalData && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>訂單確認資訊</h3>
            <hr />
            <p>Hello Scott ! 你將會在這裡待上 {modalData.totalDays} 天！</p>
            <ul>
              <li>私人房：{modalData.privateCount} 天</li>
              <li>共用房：{modalData.bunkCount} 天</li>
              <li>未訂購：{modalData.noneCount} 天</li>
            </ul>
            <div className="calculatebutton">
              <Button text="返回" onClick={() => setShowModal(false)} />
              <Button
                text="下一步"
                onClick={() => {
                  //  跳轉並傳送 state

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
                      isStartTransfer,
                      isEndTransfer,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
  //幫你「點了新增後」更新那些你選的區段，把每天的值設成你選的房型
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
    const value = `${start.getFullYear()}-${String(
      start.getMonth() + 1
    ).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")}`; //用字串拼成日期 才不會被扣一
    dates.push({ label, value });
    start.setDate(start.getDate() + 1);
  }

  return dates;
}
//計算天數用於彈窗
function calculateRoomStats(roomPlan) {
  let privateCount = 0;
  let bunkCount = 0;
  let noneCount = 0;

  Object.values(roomPlan).forEach((type) => {
    if (type.includes("私人房")) {
      privateCount++;
    } else if (type === "共用房") {
      bunkCount++;
    } else if (type === "自行訂購") {
      noneCount++;
    }
  });

  return {
    privateCount,
    bunkCount,
    noneCount,
    totalDays: privateCount + bunkCount + noneCount,
  };
}
