import React from "react";

function TrafficCheckStructure({ data, type }) {
  const renderSection = (title, flights) => {
    const isValid =
      flights &&
      flights.length > 0 &&
      flights.every(
        (f) =>
          f.airline &&
          f.flightNumber &&
          f.date &&
          f.depart &&
          f.arrive &&
          f.from &&
          f.to &&
          f.duration &&
          f.price
      );

    const totalDuration = isValid
      ? flights.reduce((acc, f) => acc + (parseFloat(f.duration) || 0), 0)
      : 0;
    const totalPrice = isValid
      ? flights.reduce((acc, f) => acc + parseInt(f.price.replace(/,/g, "")), 0)
      : 0;

    return (
      <div>
        <div
          style={{
            backgroundColor: "#D0ECFF",
            padding: "10px",
            marginTop: "1rem",
            marginRight: "10px",
            width: "100%",
            maxWidth: "720px",
            boxSizing: "border-box",
          }}
        >
          <strong style={{ marginBottom: "10px" }}>{title}：</strong>{" "}
          {isValid
            ? flights
                .map((f) => f.from.match(/\((.*?)\)/)?.[1] || f.from)
                .join(" → ") +
              ` → ${
                flights[flights.length - 1].to.match(/\((.*?)\)/)?.[1] ||
                flights[flights.length - 1].to
              }　　總耗時：約 ${totalDuration} 小時　　NTD： ${totalPrice.toLocaleString()}`
            : "尚未訂購"}
        </div>
        <div>
          {isValid && (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#E4F8FF",
                width: "100%",
                boxSizing: "border-box",

                maxWidth: "720px",
              }}
            >
              {flights.map((f, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "1px",
                    padding: "3px 0",
                    fontSize: "0.95rem",
                  }}
                >
                  <span style={{ width: "120px", flexShrink: 0 }}>
                    {f.airline} {f.flightNumber}
                  </span>
                  <span style={{ width: "120px", flexShrink: 0 }}>
                    {f.date}
                  </span>
                  <span style={{ width: "170px", flexShrink: 0 }}>
                    {f.from} → {f.to}
                  </span>
                  <span style={{ width: "180px", flexShrink: 0 }}>
                    {f.depart} → {f.arrive}
                  </span>
                  <span style={{ width: "120px", flexShrink: 0 }}>
                    NTD {f.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSimpleSection = (title, from, to, time, price) => {
    const isValid = from && to && time && price;
    return (
      <div
        style={{
          backgroundColor: "#D0ECFF",
          padding: "10px",
          marginBottom: "10px",
          marginRight: "10px",
          width: "100%",
          maxWidth: "720px",
          boxSizing: "border-box",
        }}
      >
        <strong style={{ paddingLeft: "10px" }}>{title}：</strong>{" "}
        {isValid
          ? `${from} → ${to}　　　　總耗時：約 ${time} 小時　　　　NTD： ${price}`
          : "尚未訂購"}
      </div>
    );
  };

  return (
    <div>
      {type === "flight" ? (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {renderSection("去程", data.goFlights)}
          {renderSection("回程", data.backFlights)}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            // flexWrap: "wrap",
            gap: "10px",
            justifyContent: "flex-start",
          }}
        >
          {renderSimpleSection(
            "去程接駁車",
            data.goFrom,
            data.goTo,
            data.goTime,
            data.goPrice
          )}
          {renderSimpleSection(
            "回程接駁車",
            data.backFrom,
            data.backTo,
            data.backTime,
            data.backPrice
          )}
        </div>
      )}
    </div>
  );
}

function TrafficCheck() {
  const flightData = {
    goFlights: [
      {
        airline: "中華航空",
        flightNumber: "CI 833",
        date: "2025/7/15(二)",
        depart: "上午7:00",
        arrive: "上午11:00",
        from: "台北(TPE)",
        to: "曼谷(BKK)",
        duration: "4",
        price: "5,843",
      },
      {
        airline: "瑞士航空",
        flightNumber: "LX 181",
        date: "2025/7/15(二)",
        depart: "下午2:00",
        arrive: "下午13:30",
        from: "曼谷(BKK)",
        to: "瑞士(ZRH)",
        duration: "12",
        price: "12,751",
      },
      {
        airline: "瑞士航空",
        flightNumber: "LX 646",
        date: "2025/7/16(三)",
        depart: "下午3:30",
        arrive: "下午17:00",
        from: "瑞士(ZRH)",
        to: "巴黎(CDG)",
        duration: "2",
        price: "6,550",
      },
    ],
    backFlights: [],
  };

  const carData = {
    goFrom: "戴高樂機場",
    goTo: "聖地牙哥德孔波斯特拉",
    goTime: "17",
    goPrice: "2,500",
    backFrom: "",
    backTo: "",
    backTime: "",
    backPrice: "",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <h3 style={{ width: "120px", marginTop: "10px" }}>班機資訊：</h3>
        <TrafficCheckStructure data={flightData} type="flight" />
      </div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <h3 style={{ width: "120px", marginTop: "10px" }}>機場接送：</h3>
        <TrafficCheckStructure data={carData} type="car" />
      </div>
    </div>
  );
}

export default TrafficCheck;
