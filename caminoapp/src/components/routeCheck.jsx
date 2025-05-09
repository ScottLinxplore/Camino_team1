import { useEffect, useState } from "react";
function RouteIMG({ route }) {
  return (
    <div
      style={{
        height: "300px",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "red",
      }}
    >
      <img
        src="https://media-hosting.imagekit.io/2c8916dd5f1c412e/camino_fullMap_land.png?Expires=1840515061&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=U9eE7YkHtwTK2Pnbee9fwMEQGyQiMSZq1-htkRVv5Ngl-LwrBWKkwtigSAY3BzvFVrIGiuOKpraOlaijYPdE4DusgdEt8cG6ugvMg75l3oL650tPb3QeR3NzaSm1j75AYm8tHPNFdSPmUmLmovFPXXLAIiDKUe9s0b-RCiA9U91YwDZWpNWVrnnGCpQd5zyH4eJFxcOP9wyWvsn3i7wHcaChWHy5Une1hxjeYkK5sDhGE-ht~aFvcE~4ObLw6qeGH~jdpfwszIqs9BQRlL9oAoBmMs5mvcaaN7xZmfWnjJ~l-rf4UaqRID5c18mb4zcZTMStGhkw9meuyrTwroPAiw__"
        alt="map"
        style={{
          width: "700px",
          transform: "translate( 90px, 140px) scale(2.3)",
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
            top: "-70px",
            left: "-800px",
            zIndex: 5,
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
        </svg>
      )}
    </div>
  );
}
function RouteInfo({ route }) {
  const difficultyText =
    route.difficulty === 1 ? "簡單" : route.difficulty === 2 ? "中等" : "困難";
  return (
    <div style={{ width: "100%", paddingTop: "2rem", paddingLeft: "1.5rem" }}>
      <strong>{route?.name && route.name}路線資訊：</strong>
      <br />
      健行總距離：{route?.length && route.length} 公里
      <br />
      每日平均距離：{route?.length && route.length / "使用者帶入天數"}公里
      <br />
      難易度：{difficultyText} <br />
      <br />
      <strong>路線介紹：</strong>
      <br />
      {route?.intro && route.intro}
    </div>
  );
}

function RouteCheck() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("抓資料失敗", error));
  }, []);
  console.log(data);
  const route = data?.find((item) => item.route_id === 1);
  if (!route) return <p>載入中</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        width: "100%",
      }}
    >
      <div style={{ flex: "0 0 auto" }}>
        <RouteIMG route={route} />
      </div>
      <div
        style={{
          flex: "0 0 auto",
          width: "750px", // ✅ 改成與上方資訊一致的寬度
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        }}
      >
        <RouteInfo route={route} />
      </div>
    </div>
  );
}
export default RouteCheck;
