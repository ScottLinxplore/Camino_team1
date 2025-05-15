import React, { useEffect, useState } from "react";
import styles from "./DayChoose.module.css";

function DayChoose({ RID, onDaysChange, maxDays }) {
  const [data, setData] = useState(null);
  const [selectedDays, setSelectedDays] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => {
        console.log("抓到資料：", json);
        setData(json);
        const defaultRoute = json.find(
          (item) => item.route_id === parseInt(RID)
        );
        if (defaultRoute) {
          setSelectedDays(defaultRoute.days);
          onDaysChange(defaultRoute.days);
        }
      })
      .catch((error) => {
        console.error("抓資料失敗", error);
      });
  }, [RID, onDaysChange]);

  const handleSelectChange = (e) => {
    const selected = parseInt(e.target.value);
    setSelectedDays(null);
    setTimeout(() => {
      setSelectedDays(selected);
      onDaysChange(selected);
    }, 50);
  };

  const generateDotPositionsFromPath = (d, dotCount) => {
    const tempSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    tempSvg.appendChild(path);
    document.body.appendChild(tempSvg);
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
        <select onChange={handleSelectChange} className={styles.selectBox}>
          {data &&
            maxDays &&
            (() => {
              const routeItem = data.find(
                (item) => item.route_id === parseInt(RID)
              );
              const baseDay = routeItem?.days;
              const options = Array.from({ length: 11 }, (_, i) => {
                const day = baseDay - 5 + i;
                return { day, label: `${day} 天` };
              }).filter((opt) => opt.day <= maxDays);

              const recommended = options.filter(
                (opt) => opt.day >= baseDay - 1 && opt.day <= baseDay + 1
              );
              const moreOthers = options.filter((opt) => opt.day > baseDay + 1);
              const lessOthers = options.filter((opt) => opt.day < baseDay - 1);

              return (
                <>
                  <optgroup label="困難">
                    {lessOthers.length > 0 ? (
                      lessOthers.map((opt, i) => (
                        <option key={`hard-${i}`} value={opt.day}>
                          {opt.label}
                        </option>
                      ))
                    ) : (
                      <option disabled>無適配於總天數之選項</option>
                    )}
                  </optgroup>
                  <optgroup label="適中">
                    {recommended.length > 0 ? (
                      recommended.map((opt, i) => (
                        <option key={`mid-${i}`} value={opt.day}>
                          {opt.label}
                        </option>
                      ))
                    ) : (
                      <option disabled>無適配於總天數之選項</option>
                    )}
                  </optgroup>
                  <optgroup label="輕鬆">
                    {moreOthers.length > 0 ? (
                      moreOthers.map((opt, i) => (
                        <option key={`easy-${i}`} value={opt.day}>
                          {opt.label}
                        </option>
                      ))
                    ) : (
                      <option disabled>無適配於總天數之選項</option>
                    )}
                  </optgroup>
                </>
              );
            })()}
        </select>
      </div>

      <div className={styles.mapWrapper}>
        <img
          src="https://media-hosting.imagekit.io/2c8916dd5f1c412e/camino_fullMap_land.png?Expires=1840515061&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=U9eE7YkHtwTK2Pnbee9fwMEQGyQiMSZq1-htkRVv5Ngl-LwrBWKkwtigSAY3BzvFVrIGiuOKpraOlaijYPdE4DusgdEt8cG6ugvMg75l3oL650tPb3QeR3NzaSm1j75AYm8tHPNFdSPmUmLmovFPXXLAIiDKUe9s0b-RCiA9U91YwDZWpNWVrnnGCpQd5zyH4eJFxcOP9wyWvsn3i7wHcaChWHy5Une1hxjeYkK5sDhGE-ht~aFvcE~4ObLw6qeGH~jdpfwszIqs9BQRlL9oAoBmMs5mvcaaN7xZmfWnjJ~l-rf4UaqRID5c18mb4zcZTMStGhkw9meuyrTwroPAiw__"
          alt="mapBackground"
          className={styles.mapImage}
        />
        {route?.map && (
          <svg
            viewBox="0 0 1920 1080"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.routeSvg}
          >
            <path
              d={route.map}
              fill="none"
              stroke="orange"
              strokeWidth="10"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
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
