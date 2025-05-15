import React from "react";
import { useState } from "react";
import style from "./About.module.css";
import img from "./images/about.jpg";

export default function About() {
  const [expanded, setExpanded] = useState(false);

  const toggleDesc = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={style.aboutContainer}>
      <img src={img} />

      <div className={style.aboutText}>
        <h3>關於朝聖之路</h3>

        <div className={`${style.desc} ${expanded ? style.expanded : ""}`}>
          朝聖之路是一條有名的世界文化遺產，相傳於7世紀的時候，人們隨著星星的指引找到了耶錫的十二門徒之一聖雅各(Santiago)的墳墓，於是就在當地建立起聖地雅各大教堂。當時聽聞此事的天主教信徒驚嘆的「朝聖之路」，希望透過接近聖人以及教堂來更靠近他們的神。
          <br />
          <br />
          這上朝聖之路的石板路縱橫於高山平原，是以前的人出發朝聖的唯一標記，走步行穿越整座西班牙，下面不再是宗教的苦旅，而是一段找尋自我的旅程。
        </div>

        <div className={style.btnWrap}>
          <button className={style.more} onClick={toggleDesc}>
            {expanded ? "顯示較少" : "顯示更多"}
          </button>
        </div>
      </div>
    </div>
  );
}
