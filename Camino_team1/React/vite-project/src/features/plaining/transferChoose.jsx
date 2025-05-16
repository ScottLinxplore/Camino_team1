// import React, { useEffect, useState } from "react";
// import styles from "./TransferChoose.module.css";

// function TransferChoose({
//   RID,
//   onCarFeeChange,
//   onTransferTimeChange,
//   onStartTransferToggle,
//   onEndTransferToggle,
// }) {
//   const [data, setData] = useState(null);
//   const [isStartChecked, setIsStartChecked] = useState(false);
//   const [isEndChecked, setIsEndChecked] = useState(false);

//   const route = data?.find((item) => item.route_id === parseInt(RID));

//   useEffect(() => {
//     fetch("http://localhost:3002/route")
//       .then((response) => response.json())
//       .then((json) => setData(json))
//       .catch((error) => console.error("抓資料失敗", error));
//   }, []);

//   useEffect(() => {
//     let CarFee = 0;
//     let TransferTime = 0;

//     if (isStartChecked) {
//       TransferTime += route?.airportTransferTime_Start || 0;
//       CarFee += 2500;
//     }

//     if (isEndChecked) {
//       TransferTime += route?.airportTransferTime_End || 0;
//       CarFee += 2500;
//     }

//     onCarFeeChange(CarFee);
//     onTransferTimeChange(TransferTime);
//   }, [
//     isStartChecked,
//     isEndChecked,
//     onCarFeeChange,
//     onTransferTimeChange,
//     route,
//   ]);

//   return (
//     <div>
//       {/* 去程 */}
//       <div className={styles.section}>
//         <div className={styles.sectionTop}>
//           <label>
//             <input
//               type="checkbox"
//               checked={isStartChecked}
//               onChange={() => {
//                 const newValue = !isStartChecked;
//                 setIsStartChecked(newValue);
//                 onStartTransferToggle?.(newValue);
//               }}
//             />
//             去程機場接送:
//           </label>
//         </div>

//         <div className={styles.card}>
//           <div>
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/960px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
//               alt="start"
//               className={styles.cardImage}
//             />
//           </div>
//           <div className={styles.cardText}>
//             {route?.start_airport} ➝ {route?.start_city}
//             <br />
//             接駁車行駛 {route?.airportTransferTime_Start} 小時 <br />
//             未傳入的日期 <br />
//             車型：MPV-5
//           </div>
//           <div className={styles.cardPrice}>
//             <h3>2500元</h3>
//           </div>
//           {!isStartChecked && <div className={styles.overlay} />}
//         </div>
//       </div>

//       {/* 回程 */}
//       <div className={styles.section}>
//         <label>
//           <input
//             type="checkbox"
//             checked={isEndChecked}
//             onChange={() => {
//               const newValue = !isEndChecked;
//               setIsEndChecked(newValue);
//               onEndTransferToggle?.(newValue);
//             }}
//           />
//           回程機場接送:
//         </label>
//         <div className={styles.card}>
//           <div>
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/960px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
//               alt="end"
//               className={styles.cardImage}
//             />
//           </div>
//           <div className={styles.cardText}>
//             {route?.end_city} ➝ {route?.end_airport}
//             <br />
//             接駁車行駛 {route?.airportTransferTime_End} 小時 <br />
//             未傳入的日期 <br />
//             車型：MPV-5
//           </div>
//           <div className={styles.cardPrice}>
//             <h3>2500元</h3>
//           </div>
//           {!isEndChecked && <div className={styles.overlay} />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TransferChoose;

import React, { useEffect, useState } from "react";
import styles from "./TransferChoose.module.css";

function TransferChoose({
  RID,
  onCarFeeChange,
  onTransferTimeChange,
  onStartTransferToggle,
  onEndTransferToggle,
  onTransferCountChange,
}) {
  const [data, setData] = useState(null);
  const [isStartChecked, setIsStartChecked] = useState(false);
  const [isEndChecked, setIsEndChecked] = useState(false);

  const route = data?.find((item) => item.route_id === parseInt(RID));

  useEffect(() => {
    fetch("http://localhost:3002/route")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("抓資料失敗", error));
  }, []);

  useEffect(() => {
    let CarFee = 0;
    let TransferTime = 0;
    let TransferCount = 0;

    if (isStartChecked) {
      TransferTime += route?.airportTransferTime_Start || 0;
      CarFee += 2500;
      TransferCount += 1;
    }

    if (isEndChecked) {
      TransferTime += route?.airportTransferTime_End || 0;
      CarFee += 2500;
      TransferCount += 1;
    }

    onCarFeeChange(CarFee);
    onTransferTimeChange(TransferTime);
    onTransferCountChange?.(TransferCount);
  }, [
    isStartChecked,
    isEndChecked,
    onCarFeeChange,
    onTransferTimeChange,
    onTransferCountChange,
    route,
  ]);

  return (
    <div>
      {/* 去程 */}
      <div className={styles.section}>
        <div className={styles.sectionTop}>
          <label>
            <input
              type="checkbox"
              checked={isStartChecked}
              onChange={() => {
                const newValue = !isStartChecked;
                setIsStartChecked(newValue);
                onStartTransferToggle?.(newValue);
              }}
            />
            去程機場接送:
          </label>
        </div>

        <div className={styles.card}>
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/960px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
              alt="start"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardText}>
            {route?.start_airport} ➝ {route?.start_city}
            <br />
            接駁車行駛 {route?.airportTransferTime_Start} 小時 <br />
            未傳入的日期 <br />
            車型：MPV-5
          </div>
          <div className={styles.cardPrice}>
            <h3>NT$ 2,500</h3>
          </div>
          {!isStartChecked && <div className={styles.overlay} />}
        </div>
      </div>

      {/* 回程 */}
      <div className={styles.section}>
        <label>
          <input
            type="checkbox"
            checked={isEndChecked}
            onChange={() => {
              const newValue = !isEndChecked;
              setIsEndChecked(newValue);
              onEndTransferToggle?.(newValue);
            }}
          />
          回程機場接送:
        </label>
        <div className={styles.card}>
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/960px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
              alt="end"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardText}>
            {route?.end_city} ➝ {route?.end_airport}
            <br />
            接駁車行駛 {route?.airportTransferTime_End} 小時 <br />
            未傳入的日期 <br />
            車型：MPV-5
          </div>
          <div className={styles.cardPrice}>
            <h3>NT$ 2,500</h3>
          </div>
          {!isEndChecked && <div className={styles.overlay} />}
        </div>
      </div>
    </div>
  );
}

export default TransferChoose;
