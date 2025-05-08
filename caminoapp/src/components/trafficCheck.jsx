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
            display: "inline-block",
            marginRight: "10px",
            width: "730px",
          }}
        >
          <strong style={{ paddingLeft: "10px", marginBottom: "10px" }}>
            {title}：
          </strong>{" "}
          {isValid
            ? flights
                .map((f) => f.from.match(/\((.*?)\)/)?.[1] || f.from)
                .join(" → ") +
              ` → ${
                flights[flights.length - 1].to.match(/\((.*?)\)/)?.[1] ||
                flights[flights.length - 1].to
              }　　　　　　總耗時：約 ${totalDuration} 小時　　　　　　　　　NTD： ${totalPrice.toLocaleString()}`
            : "尚未訂購"}
        </div>
        <div>
          {isValid && (
            <ul
              style={{
                padding: "10px",
                paddingLeft: "20px",
                listStyleType: "none",
                backgroundColor: "#E4F8FF",
                width: "720px",
                marginTop: "0px",
              }}
            >
              {flights.map((f, idx) => (
                <li key={idx}>
                  {f.airline} {f.flightNumber}　{f.date}　{f.from} → {f.to}　　
                  {f.depart} → {f.arrive}　　NTD {f.price}
                </li>
              ))}
            </ul>
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
          display: "inline-block",
          marginRight: "10px",
          width: "730px",
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
        <div>
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
        depart: "清晨7:00",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
