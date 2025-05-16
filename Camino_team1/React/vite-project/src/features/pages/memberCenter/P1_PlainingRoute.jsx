import MapRoute from "../../plaining/caminoMap";
import styles from "./P1_PlainingRoute.module.css";
import React from "react";
function RoutePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>點擊想去的路線!</h1>
      <MapRoute />
    </div>
  );
}

export default RoutePage;
