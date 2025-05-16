import React from "react";
import { useState } from "react";
import style from "./RoutePlanning.module.css";
import img from "./images/fakemap.png";

export default function RoutePlanning({ routes }) {
  const [routeId, setRouteId] = useState(1); //預設法國之路 id=1

  // 點擊選擇路線id後顯示畫面
  const selectId = (id) => {
    setRouteId(id);
  };
  const selectedRoute = routes?.find((element) => element.route_id === routeId);

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
        <div className={style.imgArea}>
          <img src={img} />
        </div>

        <div className={style.infoArea}>
          <table className={style.routeTable}>
            <thead>
              <tr>
                <th colSpan="4">{selectedRoute?.name || ""}</th>
              </tr>
              <tr>
                <th>總長</th>
                <th>建議天數</th>
                <th>難度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedRoute?.length || ""} 公里</td>
                <td>{selectedRoute?.days || ""} 天</td>
                <td>
                  {
                    {
                      1: "簡單",
                      2: "中等",
                      3: "困難",
                    }[selectedRoute?.difficulty || ""]
                  }
                </td>
              </tr>
            </tbody>
          </table>

          <div className={style.routeDescription}>
            {selectedRoute?.intro || ""}
            <a href={"/routeintro"}>詳細資訊</a>
          </div>

          <div className={style.buttonWrapper}>
            <a href={`/RoutePlanning1`} className={style.routeButton}>
              路線規劃
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
