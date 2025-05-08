// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
import RouteCheck from "./routeCheck";
import TrafficCheck from "./trafficCheck";

function CheckPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // 垂直排列
        // justifyContent: "center", // 垂直置中（需有高度時有效）
        alignItems: "center", // 水平置中
        gap: "20px",
        margin: "0 auto",
        minHeight: "100vh", // 讓垂直置中生效
      }}
    >
      {" "}
      <div style={{ display: "block" }}>
        <TrafficCheck />
      </div>
      <div
        style={{
          display: "block",
          marginTop: "-10px",
        }}
      >
        <RouteCheck />
      </div>
    </div>
  );
}
export default CheckPage;
