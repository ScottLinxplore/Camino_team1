// RoutePlanning
// RoutePlanning.css
// ChooseMap
// ChosenMapInfo

import React, { useState } from "react";
import style from "./RoutePlanning.module.css";
import ChooseMap from "./ChooseMap.jsx";
import ChosenMapInfo from "./ChosenMapInfo.jsx";

export default function RoutePlanning({ routes }) {
  const [routeId, setRouteId] = useState(1); // 預設 route_id = 1

  return (
    <>
      <div className={style.titleArea}>
        <h1 className={style.title}>路線規劃</h1>
      </div>

      <div className={style.descriptionArea}>
        <p>
          走進傳奇的朝聖之路，從法國山城一路走向聖地牙哥大教堂！
          <br />
          在這裡，你可以瀏覽各大熱門路線的特色、距離與建議天數，選擇最適合自己的旅程。
          <br />
          點擊「路線資訊」深入了解路線風景與文化，或使用「路線規劃」開始打造屬於你的專屬行程。
          <br />
          Camino 的第一步，從這裡啟程。🌿
        </p>
      </div>

      <div className={style.container}>
        <div className={style.showMapArea}>
          <ChooseMap routes={routes} setRouteId={setRouteId} />
        </div>

        <ChosenMapInfo routes={routes} selectId={routeId} />
      </div>
    </>
  );
}
