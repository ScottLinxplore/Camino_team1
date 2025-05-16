import React from "react";
import { useEffect, useState } from "react";
import style from "./RouteInfo.module.css";
import RouteInfoCard from "./RouteInfoCard.jsx";

export default function RouteInfo({ routes }) {
  const [visiblePackages, setVisiblePackages] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!Array.isArray(routes) || routes.length === 0) return;

    const interval = setInterval(() => {
      setFadeOut(true);

      setTimeout(() => {
        setVisiblePackages(getRandom3(routes));
        setFadeOut(false);
      }, 800);
    }, 3000);

    return () => clearInterval(interval);
  }, [routes]);

  const getRandom3 = (arr) => {
    if (!Array.isArray(arr)) {
      console.error("getRandom3 傳入的不是陣列：", arr);
      return [];
    }

    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  return (
    <>
      <h1 className={style.title}>路線資訊</h1>
      <div
        className={`${style["card-list"]} ${style["card-fade"]} ${
          fadeOut ? style["fade-out"] : ""
        }`}
      >
        {visiblePackages.map((route) => (
          <RouteInfoCard key={route.route_id} route={route} />
        ))}
      </div>
    </>
  );
}
