// import styles from "./TripDetails.module.css";
// import { useState, useEffect } from "react";

// export default function TripDetails() {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     fetch("http://localhost:3002/route")
//       .then((res) => res.json())
//       .then((json) => setData(json))
//       .catch((err) => console.error("抓資料失敗", err));
//   }, []);
//   const route = data?.find((item) => item.route_id === 1);
//   return (
//     <div className={styles.card}>
//       <img src="./project/16.jpg" alt="Trip" className={styles.image} />
//       <div className={styles.info}>
//         <h3 className={styles.title}>{route?.name}</h3>
//         <p>
//           <strong>起點：</strong>
//           {route?.start_city}
//           <br />
//           <span> （{route?.start_city_en}）</span>
//         </p>
//         <p>
//           <strong>終點：</strong>
//           {route?.end_city}
//           <br />
//           <span className={styles.span}>（{route?.end_city_en}）</span>
//         </p>
//         <p>
//           <strong>日期：</strong>2025/7/15 - 2025/8/11
//         </p>
//       </div>
//     </div>
//   );
// }
import React from "react";
import styles from "./TripDetails.module.css";
import { useState, useEffect } from "react";

export default function TripDetails({ routeId, startDate, endDate }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("抓資料失敗", err));
  }, []);

  const route = data?.find((item) => item.route_id === parseInt(routeId));

  const formatDate = (date) => {
    if (!date) return "/";
    const d = new Date(date);
    return d.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });
  };

  return (
    <div className={styles.card}>
      <img
        src="../../../../public/img/16.jpg"
        alt="Trip"
        className={styles.image}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{route?.name}</h3>
        <p>
          <strong>起點：</strong>
          {route?.start_city}
          <br />
          <span>（{route?.start_city_en}）</span>
        </p>
        <p>
          <strong>終點：</strong>
          {route?.end_city}
          <br />
          <span className={styles.span}>（{route?.end_city_en}）</span>
        </p>
        <p>
          <strong>日期：</strong>
          {formatDate(startDate)} - {formatDate(endDate)}
        </p>
      </div>
    </div>
  );
}
