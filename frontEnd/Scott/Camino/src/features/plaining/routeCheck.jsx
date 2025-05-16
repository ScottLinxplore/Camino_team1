import { useEffect, useState } from "react";
import styles from "./RouteCheck.module.css";

function RouteIMG({ route }) {
  return (
    <div className={styles.imageWrapper}>
      <img
        src="https://media-hosting.imagekit.io/2c8916dd5f1c412e/camino_fullMap_land.png?Expires=1840515061&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=U9eE7YkHtwTK2Pnbee9fwMEQGyQiMSZq1-htkRVv5Ngl-LwrBWKkwtigSAY3BzvFVrIGiuOKpraOlaijYPdE4DusgdEt8cG6ugvMg75l3oL650tPb3QeR3NzaSm1j75AYm8tHPNFdSPmUmLmovFPXXLAIiDKUe9s0b-RCiA9U91YwDZWpNWVrnnGCpQd5zyH4eJFxcOP9wyWvsn3i7wHcaChWHy5Une1hxjeYkK5sDhGE-ht~aFvcE~4ObLw6qeGH~jdpfwszIqs9BQRlL9oAoBmMs5mvcaaN7xZmfWnjJ~l-rf4UaqRID5c18mb4zcZTMStGhkw9meuyrTwroPAiw__"
        alt="map"
        className={styles.mapImage}
      />
      {route?.map && (
        <svg
          viewBox="0 0 1920 1080"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.mapSvg}
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

function RouteInfo({ route, Days }) {
  const difficultyText =
    route.difficulty === 1 ? "簡單" : route.difficulty === 2 ? "中等" : "困難";

  return (
    <div className={styles.infoBox}>
      <strong>{route?.name} 路線資訊：</strong>
      <br />
      健行總距離：{route?.length} 公里
      <br />
      每日平均距離：{(route?.length / Days).toFixed(1)} 公里
      <br />
      難易度：{difficultyText}
      <br />
      <br />
      <strong>路線介紹：</strong>
      <br />
      {route?.intro}
    </div>
  );
}

function RouteCheck({ Days }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("抓資料失敗", error));
  }, []);

  const route = data?.find((item) => item.route_id === 1);
  if (!route) return <p>載入中...</p>;

  return (
    <div className={styles.container}>
      <div>
        <RouteIMG route={route} />
      </div>
      <div>
        <RouteInfo route={route} Days={Days} />
      </div>
    </div>
  );
}

export default RouteCheck;
