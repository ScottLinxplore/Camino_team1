import React, { useEffect, useState } from "react";

function HoverCard({ id, style }) {
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
  const route = data?.find((item) => item.route_id === parseInt(id));
  if (!route) {
    return null; // 沒資料時不渲染
  }
  const difficultyText =
    route.difficulty === 1 ? "簡單" : route.difficulty === 2 ? "中等" : "困難";
  const defaultStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -100%)", // 中心對齊
    zIndex: 3,
    width: "220px",
    height: "200px",
    pointerEvents: "none",
  };
  const combinedStyle = style ? { ...defaultStyle, ...style } : defaultStyle;
  return (
    <div style={combinedStyle}>
      <img
        src="https://media-hosting.imagekit.io/c4dfdbac67644b1b/hoverEL.png?Expires=1840549000&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WFm00J8RXC9mcdOEk--WCpI7qji6FYXLx2UcqiDCz93rnqe~0-0sA6csaRZhCEt9NA05~FWIdEr5ud9mygtvNCP7YsZYpSqRMbFGBjpRqNKTFI1~KbFPdEfDhnEA0g47A0tNHfCSKBsKNCwnNkqySISf5shdc3X-vZKHPaFV4guZEy8qIZdBW44nQBIiJju7CKFoR0Opj6Y3SQKJxRGfOLfwv1teY~i8gA121UUNCDIgCVk7J92YnQ-rQR4O1sUKRRrJ~76XYgkEBqgbYQbvBmgHmeHv1mYJ3LGr~e7Tlbp9lcjbF6S8hsAjhbL1vyufPHyxv0i-r-jP-YPQ-omJ6Q__"
        alt="hoverCard"
        style={{
          backgroundSize: "cover",
          width: "65%",
          height: "65%",
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "16px",
          zIndex: 2,
          color: "black",
          fontSize: "12px",
        }}
      >
        <p style={{ fontSize: "12px" }}>路線名稱: {route.name}</p>
        <p style={{ fontSize: "12px" }}>起點: {route.start_city}</p>
        <p style={{ fontSize: "12px" }}>總長: {route.length}公里</p>
        <p style={{ fontSize: "12px" }}>建議天數: {route.days}天</p>
        <p style={{ fontSize: "12px" }}>難易度: {difficultyText}</p>
      </div>
    </div>
  );
}

export default HoverCard;
