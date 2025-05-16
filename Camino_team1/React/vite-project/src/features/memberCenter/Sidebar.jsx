import React, { useState } from "react";
import { FaUser, FaBox, FaHeart } from "react-icons/fa";
import styles from "./Sidebar.module.css"; // ✅ 改成模組化匯入

const Sidebar = ({ setCurrentSection }) => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [favoriteOpen, setFavoriteOpen] = useState(false);

  return (
    <div className={styles.sidebar}>
      <ul className={styles.ul}>
        {/* 我的帳戶 */}
        <li
          className={`${styles.li} ${styles.main}`}
          onClick={() => setCurrentSection("account")}
        >
          <FaUser className={styles.icon} /> 我的帳戶
        </li>

        {/* 我的訂購（可折疊） */}
        <li
          className={`${styles.li} ${styles.main}`}
          onClick={() => setOrderOpen(!orderOpen)}
        >
          <FaBox className={styles.icon} /> 我的訂購
        </li>
        {orderOpen && (
          <>
            <li
              className={`${styles.li} ${styles.child}`}
              onClick={() => setCurrentSection("orders")}
            >
              預定旅程
            </li>
            <li
              className={`${styles.li} ${styles.child}`}
              onClick={() => setCurrentSection("history")}
            >
              歷史訂單
            </li>
            <li
              className={`${styles.li} ${styles.child}`}
              onClick={() => setCurrentSection("records")}
            >
              旅程紀錄
            </li>
          </>
        )}

        {/* 我的收藏（可折疊） */}
        <li
          className={`${styles.li} ${styles.main}`}
          onClick={() => setFavoriteOpen(!favoriteOpen)}
        >
          <FaHeart className={styles.icon} /> 我的收藏
        </li>
        {favoriteOpen && (
          <>
            <li
              className={`${styles.li} ${styles.child}`}
              onClick={() => setCurrentSection("favorites")}
            >
              景點
            </li>
            <li
              className={`${styles.li} ${styles.child}`}
              onClick={() => setCurrentSection("scenery")}
            >
              套裝行程
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
