import React from "react";
import style from "./Info.module.css";

export default function Info() {
  //img : 突發狀況. 裝備建議, 蓋章教學, 天氣預報
  const img1 =
    "https://images.unsplash.com/photo-1626546849705-f29e2f771df9?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const img2 =
    "https://images.unsplash.com/photo-1694088774427-540c30ada753?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const img3 =
    "https://images.unsplash.com/photo-1654163600175-efc47ce20b29?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const img4 =
    "https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1804&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <>
      <h1 className={style.title}>相關資訊</h1>
      <div className={style.container}>
        {/* 1. 可能突發狀況 */}
        <div className={style.card}>
          <div className={style.upper}>
            <img src={img1} />
            <div className={style.corner}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M100,0 L50,0 Q100,10 100,50 Z" fill="#d9f85c" />
              </svg>
            </div>
            <div className={style.title}>可能突發狀況</div>
          </div>
        </div>

        {/* 2. 攜帶裝備建議 */}
        <div className={style.card}>
          <div className={style.upper}>
            <img src={img2} />
            <div className={style.corner}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M100,0 L50,0 Q100,10 100,50 Z" fill="#d9f85c" />
              </svg>
            </div>
            <div className={style.title}>攜帶裝備建議</div>
          </div>
        </div>

        {/* 3. 蓋章教學 */}
        <div className={style.card}>
          <div className={style.upper}>
            <img src={img3} />
            <div className={style.corner}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M100,0 L50,0 Q100,10 100,50 Z" fill="#d9f85c" />
              </svg>
            </div>
            <div className={style.title}>蓋章教學</div>
          </div>
        </div>

        {/* 4. 天氣預報 */}
        <div className={style.card}>
          <div className={style.upper}>
            <img src={img4} />
            <div className={style.corner}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M100,0 L50,0 Q100,10 100,50 Z" fill="#d9f85c" />
              </svg>
            </div>
            <div className={style.title}>天氣預報</div>
          </div>
        </div>
      </div>
    </>
  );
}
