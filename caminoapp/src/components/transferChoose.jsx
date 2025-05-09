import React, { useEffect, useState } from "react";

function TransferChoose({
  RID,
  onCarFeeChange,
  onTransferTimeChange,
  onStartTransferToggle,
  onEndTransferToggle,
}) {
  const [data, setData] = useState(null);
  const [isStartChecked, setIsStartChecked] = useState(false);
  const [isEndChecked, setIsEndChecked] = useState(false);
  const route = data?.find((item) => item.route_id === parseInt(RID));
  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("抓資料失敗", error));
  }, []);

  useEffect(() => {
    let CarFee = 0;
    let TransferTime = 0;

    if (isStartChecked) {
      TransferTime += route.airportTransferTime_Start || 0;
      CarFee += 2500;
    }

    if (isEndChecked) {
      TransferTime += route.airportTransferTime_End || 0;
      CarFee += 2500;
    }

    onCarFeeChange(CarFee);
    onTransferTimeChange(TransferTime);
  }, [
    isStartChecked,
    isEndChecked,
    onCarFeeChange,
    onTransferTimeChange,
    route,
  ]);

  const cardStyle = {
    backgroundColor: "grey",
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    height: "auto",
    borderRadius: "6px",
    position: "relative",
    overflow: "hidden",
    marginTop: "8px",
  };

  const imageStyle = {
    width: "80px",
    height: "100%",
    objectFit: "cover",
    borderRadius: "6px 0 0 6px",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    pointerEvents: "none",
    zIndex: 1,
  };

  return (
    <div>
      {/* 去程 */}
      <div style={{ marginBottom: "20px", height: "130px" }}>
        <label>
          <input
            type="checkbox"
            checked={isStartChecked}
            onChange={() => {
              const newValue = !isStartChecked;
              setIsStartChecked(newValue);
              onStartTransferToggle?.(newValue); // 通知父層
            }}
          />
          去程機場接送:
        </label>
        <div style={cardStyle}>
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/960px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
              alt=""
              style={imageStyle}
            />
          </div>
          <div
            style={{
              paddingLeft: "10px",
              paddingTop: "5px",
              color: "white",
            }}
          >
            {route?.start_airport} ➝ {route?.start_city}
            <br />
            接駁車行駛 {route?.airportTransferTime_Start} 小時 <br />
            未傳入的日期 <br />
            車型：MPV-5
          </div>
          <div
            style={{
              right: 20,
              bottom: 10,
              position: "absolute",
              color: "white",
            }}
          >
            <h3>2500元</h3>
          </div>
          {!isStartChecked && <div style={overlayStyle} />}
        </div>
      </div>

      {/* 回程 */}
      <div style={{ marginTop: "10px", height: "130px" }}>
        <label>
          <input
            type="checkbox"
            checked={isEndChecked}
            onChange={() => {
              const newValue = !isEndChecked;
              setIsEndChecked(newValue);
              onEndTransferToggle?.(newValue); // 通知父層
            }}
          />
          回程機場接送:
        </label>
        <div style={cardStyle}>
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/960px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
              alt=""
              style={imageStyle}
            />
          </div>
          <div
            style={{
              paddingLeft: "10px",
              paddingTop: "5px",
              color: "white",
            }}
          >
            {route?.end_city} ➝ {route?.end_airport}
            <br />
            接駁車行駛 {route?.airportTransferTime_End} 小時 <br />
            未傳入的日期 <br />
            車型：MPV-5
          </div>
          <div
            style={{
              right: 20,
              bottom: 20,
              position: "absolute",
              color: "white",
            }}
          >
            <h3>2500元</h3>
          </div>
          {!isEndChecked && <div style={overlayStyle} />}
        </div>
      </div>
    </div>
  );
}

export default TransferChoose;
