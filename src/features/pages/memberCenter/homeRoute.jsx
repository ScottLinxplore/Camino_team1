import React from "react";
// import Navbar from "../../features/navbar/Navbar1";
import Topimg from "../../homeRoute/homeRoute.png";
// import Footer from "../../features/footer/Footer";
import RouteInfo1 from "../../homeRoute/homeRoute_1";
import RouteInfo2 from "../../homeRoute/homeRoute_2";
import RouteInfo3 from "../../homeRoute/homeRoute_3";
import RouteInfo4 from "../../homeRoute/homeRoute_4";
import RouteInfo5 from "../../homeRoute/homeRoute_5";
import RouteInfo6 from "../../homeRoute/homeRoute_6";
import styles from "./homeRoute.module.css"; // ⭐ 引入 CSS Module

const homeRoute = () => {
  return (
    <>
      <div className={styles.pageContainer}>
        {/* <nav><Navbar /></nav> */}

        <div>
          <img alt="圖片載入中" src={Topimg} className={styles.topImage} />
        </div>

        <div className={styles.routeButtonWrapper}>
          <button className={styles.routeButton}>規劃路線</button>
          <RouteInfo1 />
        </div>

        <div className={styles.sectionSpacing}>
          <RouteInfo2 />
        </div>
        <div className={styles.sectionSpacing}>
          <RouteInfo3 />
        </div>
        <div className={styles.sectionSpacing}>
          <RouteInfo4 />
        </div>
        <div className={styles.sectionSpacing}>
          <RouteInfo5 />
        </div>
        <div className={styles.sectionSpacing}>
          <RouteInfo6 />
        </div>
      </div>

      {/* <footer><Footer /></footer> */}
    </>
  );
};

export default homeRoute;
