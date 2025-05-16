import style from "./TransportInfo.module.css";
import React from "react";

export default function TransportInfo() {
  return (
    <div className={style["transport-card"]}>
      <h4 className={style["transport-title"]}>交通資訊</h4>
      <table className={style["transport-table"]}>
        <thead>
          <tr>
            <th>方向</th>
            <th>航空公司</th>
            <th>日期</th>
            <th>起飛</th>
            <th>抵達</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="3">去程</td>
            <td>中華航空 CI833</td>
            <td>2025/7/15（二）</td>
            <td>清晨 7:00 台北 (TPE)</td>
            <td>上午 9:45 曼谷 (BKK)</td>
            <td>NT$5843</td>
          </tr>
          <tr>
            <td>瑞士航空 LX181</td>
            <td>2025/7/15（二）</td>
            <td>中午 12:50 曼谷 (BKK)</td>
            <td>晚上 7:35 瑞士 (ZRH)</td>
            <td>NT$12751</td>
          </tr>
          <tr>
            <td>瑞士航空 LX646</td>
            <td>2025/7/15（二）</td>
            <td>晚上 9:50 瑞士 (ZRH)</td>
            <td>晚上 11:05 法國 (CDG)</td>
            <td>NT$6550</td>
          </tr>
          <tr>
            <td>回程</td>
            <td colSpan="5">自行選擇</td>
          </tr>
        </tbody>
      </table>
      <div className={style["total-price"]}>總計 NT$25144</div>
    </div>
  );
}
