import React from "react";
import styles from "./HeaderBanner.module.css";
import headerBannerImage from "./HeaderBanner.png";

export default function HeaderBanner({ title }) {
  return (
    <div className={styles.headerBanner}>
      <img
        src={headerBannerImage}
        alt="headerBanner"
        className={styles.headerImage}
      />
      <h1 className={styles.headerTitle}>{title}</h1>
    </div>
  );
}
