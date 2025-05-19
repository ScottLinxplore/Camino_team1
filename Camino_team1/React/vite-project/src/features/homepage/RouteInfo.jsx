import React from "react";
import { useEffect, useState } from "react";
import style from "./RouteInfo.module.css";
import RouteInfoCard from "./RouteInfoCard.jsx";

export default function RouteInfo(/*{ routes }*/) {
  // 5/18 改改改改改_99路線資訊改路線景點
  // const [visiblePackages, setVisiblePackages] = useState([]);
  // const [fadeOut, setFadeOut] = useState(false);

  // useEffect(() => {
  //   if (!Array.isArray(routes) || routes.length === 0) return;

  //   const interval = setInterval(() => {
  //     setFadeOut(true);

  //     setTimeout(() => {
  //       setVisiblePackages(getRandom3(routes));
  //       setFadeOut(false);
  //     }, 800);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [routes]);

  // const getRandom3 = (arr) => {
  //   if (!Array.isArray(arr)) {
  //     console.error("getRandom3 傳入的不是陣列：", arr);
  //     return [];
  //   }

  //   const shuffled = [...arr].sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, 3);
  // };

  const [visibleSight, setVisibleSight] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [sights, setSights] = useState([]);

  useEffect(() => {
    // 第一次 fetch 資料
    fetch("http://localhost:3001/sight")
      .then((res) => res.json())
      .then((data) => {
        setSights(data);
        setVisibleSight(getRandom3(data));
      });

    // 每5秒更新一次顯示資料
    const interval = setInterval(() => {
      setFadeOut(true);

      setTimeout(() => {
        setVisibleSight(getRandom3(sights));
        setFadeOut(false);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, [sights.length]);

  // 抽取隨機三筆資料
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
      <h1 className={style.title}>路線景點</h1>
      {/* <div
        className={`${style["card-list"]} ${style["card-fade"]} ${
          fadeOut ? style["fade-out"] : ""
        }`}
      >
        {visiblePackages.map((route) => (
          <RouteInfoCard key={route.route_id} route={route} />
        ))}
      </div> */}
        <div
        className={`${style["card-list"]} ${style["card-fade"]} ${
          fadeOut ? style["fade-out"] : ""
        }`}
      >
        {visibleSight.map((sight) => (
          <RouteInfoCard key={sight.sight_id} sight={sight} />
        ))}
      </div>
    </>
  );
}
