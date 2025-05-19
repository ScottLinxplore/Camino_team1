import React from "react";

export default function ChoosenMapInfo({ routes, selectId }) {
  const selectedRoute = routes?.find((r) => r.route_id === Number(selectId));
  if (!selectedRoute) return null;

  return (
    <div
      style={{
        flex: "1 1 30%",
        minWidth: "280px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "16px",
      }}>
        <thead>
          <tr>
            <th
              colSpan="4"
              style={{
                backgroundColor: "#e0e0e0",
                textAlign: "left",
                fontSize: "18px",
                padding: "16px",
                borderRadius: "12px 12px 0 0",
              }}
            >
              {selectedRoute.name}
            </th>
          </tr>
          <tr style={{ backgroundColor: "#e0e0e0" }}>
            <th style={{ padding: "12px 16px", textAlign: "left" }}>總長</th>
            <th style={{ padding: "12px 16px", textAlign: "left" }}>建議天數</th>
            <th style={{ padding: "12px 16px", textAlign: "left" }}>難度</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "12px 16px" }}>{selectedRoute.length} 公里</td>
            <td style={{ padding: "12px 16px" }}>{selectedRoute.days} 天</td>
            <td style={{ padding: "12px 16px" }}>
              {{
                1: "簡單",
                2: "中等",
                3: "困難",
              }[selectedRoute.difficulty]}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          marginBottom: "12px",
        }}
      >
        {selectedRoute.intro}
        <a
          href="/routeintro"
          style={{
            color: "#3366cc",
            textDecoration: "none",
            marginLeft: "10px",
          }}
        >
          詳細資訊
        </a>
      </div>

      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <a
          href={`/RouteIntro${selectId}`}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#008A8E",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            textDecoration: "none",
            transition: "all 0.3s ease-in",
          }}
        >
          路線規劃
        </a>
      </div>
    </div>
  );
}
