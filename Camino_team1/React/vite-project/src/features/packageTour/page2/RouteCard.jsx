import React from "react";

export default function RouteCard() {
  return (
    <div
      style={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#fff",
        maxWidth: "100%",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        法國之路
      </h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
        <p style={{ fontSize: "20px", margin: "4px 0" }}>
          起點：法國 聖讓-皮耶-德波爾
          <br />
          <span style={{ fontSize: "12px", color: "#666" }}>
            (Saint-Jean-Pied-de-Port)
          </span>
        </p>
        <p style={{ fontSize: "20px", color: "#666" }}> - </p>
        <p style={{ fontSize: "20px", margin: "4px 0" }}>
          終點：西班牙 聖地牙哥-德孔波斯特拉
          <br />
          <span
            style={{ fontSize: "12px", color: "#666", marginRight: "60px" }}
          >
            (Santiago de Compostela)
          </span>
        </p>
      </div>
      <p
        style={{
          marginTop: "18px",
          fontSize: "18px",
          color: "#333",
          textAlign: "center",
        }}
      >
        總長：790公里　｜　建議天數：30至35天　｜　難易度：中等
      </p>
    </div>
  );
}
