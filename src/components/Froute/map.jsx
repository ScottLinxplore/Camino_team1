import React, { useState } from "react";
// import HoverCard from "./hoverCard"; // 引入 HoverCard 元件
import { useNavigate } from "react-router-dom";
const pathsData = [
  {
    id: "1",
    d: "M563.06,290.12c2.74,3.52,39.68,5.24,39.68,5.24s8.15-1.31,20.71-1.82c15.98-0.5,25.46-4.94,31.39-3.76c5.71,1.17,11.64-2.01,15.98,0c4.34,2.01,26.71-2.35,43.84-6.53c19.18-4.52,13.24-8.54,24.89-6.53c11.64,2.01-8.9,3.02,11.64,2.01s32.19-2.01,32.19-2.01c36.53,6.7,26.26,2.01,36.53,6.7c10.27,4.86,17.58,5.36,30.82,6.53c13.24,1.17,13.24,1.17,13.24,1.17s4.34-1.84,14.61,0c10.27,1.84,29.22-1.84,33.56,0c4.34,1.84,43.84,0,48.17-2.85c4.34-2.68,8.68-11.73,8.68-11.73s-5.71-3.52,5.94-4.86c11.87-1.17,30.82-5.03,35.16-5.03c4.57,0,11.87-1.84,27.85,0c15.98,1.84,21.92,5.03,21.92,5.03h15.98c0,0,26.48,4.19,35.16,0c8.68-4.19,8.68-4.19,8.68-4.19l23.29-4.69h15.98h11.64c0,0,20.55-4.69,24.89-7.54l13.39-8.81c0,0,34.37-28.92,35.07-45.17",
    stroke: "#c8d119",
    cardStyle: { position: "absolute", top: "28%", left: "52%" },
  },
  {
    id: "2",
    d: "M563.06,293.04c0,0,66.14,34.33,75.72,33.15c0,0,66.14,34.33,75.72,33.15c7.3-0.84,22.58-2.86,31.93-2.86c6.61,0,17.79,6.9,23.72,11.11c2.28,1.68,4.11,3.53,5.02,5.89c1.37,3.37,4.56,8.75,12.54,10.26c11.63,2.19,21.21-3.53,26.91,5.72c2.97,4.71,7.3,12.12,10.95,18.34c3.42,5.89,0.46,12.79-7.07,16.15c-3.65,1.51-5.7,4.54-5.47,7.57l0.68,8.58c0.46,4.04,2.74,7.57,6.61,10.43c2.97,2.19,6.39,3.37,8.67,6.06c2.51,2.86,4.11,6.23,7.07,8.92c5.02,4.71,13.46,7.07,17.33,12.28c2.05,2.69,2.74,6.06,2.74,9.25c0.46,7.74,0,16.66-6.84,22.88l-4.11,3.7c-3.88,3.53-5.25,8.25-3.88,12.79l5.02,14.47l9.35,19.52c0,0,0,0,0,0.17c4.33,8.58-12.32,21.2-16.88,22.88c-5.93,2.19-10.49,6.06-13,10.6c-5.25,9.76-7.75,13.29-6.16,16.66c1.82,4.21-4.11,21.54-4.11,21.71c6.39,53-12.54,122.33-8.67,144.37c2.28,12.28-0.23,45.43,2.28,54.35c3.42,12.96,4.11,29.61,3.42",
    stroke: "gray",
    cardStyle: { position: "absolute", top: "47%", left: "46.5%" },
  },
  {
    id: "3",
    d: "M1147.99,203.46c-11.63-2.52-14.6,7.57-26.69,6.56c-12.54-1.18-11.4-1.85-23.95-1.68c-11.63,0-31.93,0.67-42.88,3.03c-4.56,1.01-39.23,0-44.02,0c-51.32,0.34-70.71-5.05-122.03-4.71c-22.35,0.17-57.93-1.51-80.29-1.18c-19.39,0.34-62.04,7.91-76.86,18.85c0,0-161.85,61.91-167.53,66.2",
    stroke: "gray",
    cardStyle: { position: "absolute", top: "21%", left: "45%" },
  },
  {
    id: "4",
    d: "M764.19,232.68c-11.49,3.2-43.76,27.9-50.87,33.59c-13.95,11.55-145.23,25.59-145.23,25.59",
    stroke: "gray",
    cardStyle: { position: "absolute", top: "27.5%", left: "38%" },
  },
  {
    id: "5",
    d: "M532.73,173.4L532.73,173.4c7.53,5.05,48.35,5.05,49.49,12.45c0.46,3.03,0.23,5.89-1.6,7.4c-5.25,4.54-19.39-0.17-11.4,9.59c7.98,9.93,22.35,11.95,13.23,19.35c-3.19,2.69-13.91,16.99-12.54,21.54c2.05,6.06-5.7,39.37-5.7,39.37",
    stroke: "gray",
    cardStyle: { position: "absolute", top: "26%", left: "31.5%" },
  },
  {
    id: "6",
    d: "M470.46,631.85c0,0,16.75-53.83,17.56-54.79c9.59-13.58,33.17-63.74,32.52-84.82c-0.16-7.99-1.95-16.13,0.33-23.64c2.76-9.11,7.97-15.02,6.18-25.24c-1.79-9.74-0.65-10.06-2.44-19.17c-1.63-8.47-26.66-44.09-20-50.96c0.16-0.16,50.4-63.74,50.4-63.74l13.49-18.21",
    stroke: "gray",
    cardStyle: { position: "absolute", top: "45%", left: "29%" },
  },
];

function MapRoute({className}) {
  const [hoveredPath, setHoveredPath] = useState(null);
//   const navigate = useNavigate();
  const [, setPathId] = useState(null);

  return (
    <div
     className={className}
      style={{
        width: "70%",
        height:'95%',
        // aspectRatio: "16/9", // 強制維持比例（1080/1920）
        position: "relative",
        margin: "0 auto", // 置中
        backgroundColor: "#000", // 避免沒圖時白白一片

      }}
    >
      {/* 背景地圖 */}
      <img
        src="https://media-hosting.imagekit.io/2c8916dd5f1c412e/camino_fullMap_land.png?Expires=1840515061&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=U9eE7YkHtwTK2Pnbee9fwMEQGyQiMSZq1-htkRVv5Ngl-LwrBWKkwtigSAY3BzvFVrIGiuOKpraOlaijYPdE4DusgdEt8cG6ugvMg75l3oL650tPb3QeR3NzaSm1j75AYm8tHPNFdSPmUmLmovFPXXLAIiDKUe9s0b-RCiA9U91YwDZWpNWVrnnGCpQd5zyH4eJFxcOP9wyWvsn3i7wHcaChWHy5Une1hxjeYkK5sDhGE-ht~aFvcE~4ObLw6qeGH~jdpfwszIqs9BQRlL9oAoBmMs5mvcaaN7xZmfWnjJ~l-rf4UaqRID5c18mb4zcZTMStGhkw9meuyrTwroPAiw__"
        alt="mapBackground"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // 填滿
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      {/* 上層互動路線 */}
      <svg
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <g>
          {pathsData.map((path) => (
            <g key={path.id}>
              <path
                d={path.d}
                fill="none"
                stroke={
                  hoveredPath && hoveredPath.id === path.id
                    ? "orange"
                    : path.stroke
                }
                strokeWidth="10"
                strokeMiterlimit="10"
                strokeLinecap="round"
                style={{
                  transition: "stroke 0.8s",
                }}
              />
              <path
                d={path.d}
                fill="none"
                stroke="transparent"
                strokeWidth="40"
                onClick={() => {
                  setPathId(path.id);
                //   navigate("/PlainingDate", { state: { routeId: path.id } });
                }}
                onMouseEnter={() =>
                  setHoveredPath({ id: path.id, cardStyle: path.cardStyle })
                }
                onMouseLeave={() => setHoveredPath(null)}
                style={{
                  pointerEvents: "stroke",
                  cursor: "pointer",
                }}
              />
            </g>
          ))}
          <ellipse
            transform="matrix(0.0304 -0.9995 0.9995 0.0304 255.8745 848.421)"
            fill="#D85328"
            cx="565.25"
            cy="292.32"
            rx="12.49"
            ry="14.87"
          />
        </g>
      </svg>

      {/* {hoveredPath && <HoverCard />} Hover 時顯示 */}
      {/* {hoveredPath && (
        <HoverCard id={hoveredPath.id} style={hoveredPath.cardStyle} />
      )} */}
      
    </div>
  );
}

export default MapRoute;