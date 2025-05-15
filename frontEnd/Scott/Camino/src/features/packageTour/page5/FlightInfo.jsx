import style from "./FlightInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function FlightInfo() {
  return (
    <div className={style["flight-section"]}>
      <h1 className={style["transport-title"]}>航班資訊</h1>
      <div >
        <div>
          <div>
            <div className={style["transport-date"]}>出發-2025/7/15（二）</div>
          </div>
          <div className={style["transport-icon"]}>
            <div>
              <FontAwesomeIcon icon={faPlaneDeparture} />
            </div>
            <div>
              台北 (TPE)7:00
              <FontAwesomeIcon icon={faArrowRight} />
              曼谷 (BKK)9:45
              <div className={style["transport-name"]}>中華航空 CI833</div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className={style["transport-date"]}>轉機-2025/7/15（二）</div>
          </div>
          <div className={style["transport-icon"]}>
            <div>
              <FontAwesomeIcon icon={faPlaneDeparture} />
            </div>
            <div>
              曼谷 (BKK)12:50
              <FontAwesomeIcon icon={faArrowRight} />
              瑞士 (ZRH)19:35
              <div className={style["transport-name"]}>瑞士航空 LX181</div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className={style["transport-date"]}>出發-2025/7/15（二）</div>
          </div>
          <div className={style["transport-icon"]}>
            <div>
              <FontAwesomeIcon icon={faPlaneDeparture} />
            </div>
            <div>
              瑞士 (ZRH)21:50
              <FontAwesomeIcon icon={faArrowRight} />
              法國 (CDG)23:05
              <div className={style["transport-name"]}>瑞士航空 LX646</div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <div className={style["transport-date"]}>回程-2025/8/11（一）</div>
          </div>
          <div className={style["transport-icon"]}>
            <div>
              <FontAwesomeIcon icon={faPlaneDeparture} />
            </div>
            <div>
              尚未選擇
              <div className={style["transport-name"]}></div>
            </div>
          </div>
        </div>

        {/* <tr>
            <td>轉機-2025/7/15（二）</td>
            <td>瑞士航空 LX181</td>
            <td>12:50 曼谷 (BKK)</td>
            <td>19:35 瑞士 (ZRH)</td>
          </tr>
          <tr>
            <td>轉機-2025/7/15（二）</td>
            <td>瑞士航空 LX646</td>
            <td>21:50 瑞士 (ZRH)</td>
            <td>23:05 法國 (CDG)</td>
          </tr>
          <tr>
            <td>回程</td>
            <td colSpan="5">自行選擇</td>
          </tr> */}
      </div>
    </div>
  );
}
