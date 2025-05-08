import React, { useEffect, useState } from "react";

function DayChoose({ RID, onDaysChange }) {
  const [data, setData] = useState(null);
  const [selectedDays, setSelectedDays] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => {
        console.log("抓到資料：", json);
        setData(json);

        // ➤ 預設選擇該路線的建議天數
        const defaultRoute = json.find(
          (item) => item.route_id === parseInt(RID)
        );
        if (defaultRoute) {
          setSelectedDays(defaultRoute.days); // 預設天數
          onDaysChange(defaultRoute.days); // 通知父層
        }
      })
      .catch((error) => {
        console.error("抓資料失敗", error);
      });
  }, [RID, onDaysChange]);

  const handleSelectChange = (e) => {
    const selected = parseInt(e.target.value);
    setSelectedDays(null); // 清掉先前的點觸發動畫
    setTimeout(() => {
      setSelectedDays(selected);
      onDaysChange(selected);
    }, 50);
  };

  // ✅ 改用 SVG API 解析任意路徑（含曲線）
  const generateDotPositionsFromPath = (d, dotCount) => {
    const tempSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    tempSvg.appendChild(path);
    document.body.appendChild(tempSvg); // 必需加到 DOM 才能正確量測長度

    const totalLength = path.getTotalLength();
    const result = [];

    for (let i = 0; i < dotCount; i++) {
      const p = path.getPointAtLength((i / (dotCount - 1)) * totalLength);
      result.push({ x: p.x, y: p.y });
    }

    document.body.removeChild(tempSvg);
    return result;
  };

  const route = data?.find((item) => item.route_id === parseInt(RID));

  return (
    <div>
      <div>
        <select
          onChange={handleSelectChange}
          style={{ fontSize: "18px", padding: "5px", borderRadius: "6px" }}
        >
          {data &&
            Array.from({ length: 11 }, (_, i) => {
              const routeItem = data.find(
                (item) => item.route_id === parseInt(RID)
              );
              const day = routeItem?.days - 5 + i;
              const bgColor = [
                "#FF5C5C",
                "#FF5C5C",
                "#FFA35C",
                "#FFA35C",
                "#FFA35C",
                "#BDFF8A",
                "#15D100",
                "#15D100",
                "#15D100",
                "#00AB6C",
                "#00AB6C",
              ];
              return (
                <option
                  key={i}
                  value={day}
                  style={{ backgroundColor: bgColor[i] }}
                >
                  {day} 天
                </option>
              );
            })}
        </select>

        <p style={{ marginLeft: "50px", display: "inline-block" }}>
          難易度圖示：
        </p>
        {["輕鬆", "簡單", "適中", "稍難", "挑戰"].map((label, idx) => {
          const colors = [
            "#00AB6C",
            "#15D100",
            "#BDFF8A",
            "#FFA35C",
            "#FF5C5C",
          ];
          return (
            <div
              key={idx}
              style={{
                display: "inline-block",
                padding: "5px",
                margin: "10px",
                backgroundColor: colors[idx],
                width: "87.5px",
                borderRadius: "6px",
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* 地圖與 SVG 疊層 */}
      <div
        style={{
          height: "300px",
          width: "800px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src="https://media-hosting.imagekit.io/2c8916dd5f1c412e/camino_fullMap_land.png?Expires=1840515061&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=U9eE7YkHtwTK2Pnbee9fwMEQGyQiMSZq1-htkRVv5Ngl-LwrBWKkwtigSAY3BzvFVrIGiuOKpraOlaijYPdE4DusgdEt8cG6ugvMg75l3oL650tPb3QeR3NzaSm1j75AYm8tHPNFdSPmUmLmovFPXXLAIiDKUe9s0b-RCiA9U91YwDZWpNWVrnnGCpQd5zyH4eJFxcOP9wyWvsn3i7wHcaChWHy5Une1hxjeYkK5sDhGE-ht~aFvcE~4ObLw6qeGH~jdpfwszIqs9BQRlL9oAoBmMs5mvcaaN7xZmfWnjJ~l-rf4UaqRID5c18mb4zcZTMStGhkw9meuyrTwroPAiw__"
          alt="mapBackground"
          style={{
            width: "1400px",
            transform: "translate(-250px, -50px) scale(1.1)",
            position: "absolute",
          }}
        />

        {route?.map && (
          <svg
            viewBox="0 0 1920 1080"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "290%",
              height: "290%",
              position: "absolute",
              top: "-90px",
              left: "-700px",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <path
              d={route.map}
              fill="none"
              stroke="orange"
              strokeWidth="10"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            {/* 顯示路線上的點（依選擇天數） */}
            {selectedDays &&
              generateDotPositionsFromPath(route.map, selectedDays).map(
                (dot, idx) => (
                  <circle
                    key={idx}
                    cx={dot.x}
                    cy={dot.y}
                    r={4}
                    fill="#fff"
                    stroke="#000"
                    strokeWidth={0}
                    className="fade-in-static"
                  />
                )
              )}
          </svg>
        )}
      </div>
    </div>
  );
}

export default DayChoose;
