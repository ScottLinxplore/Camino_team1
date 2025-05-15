import React from "react";
import mapImage from "./map.png";

const Map = () => {
  return (
    <div>
      <h2> 朝聖之路地圖</h2>
      <img
        src={mapImage}
        alt="朝聖地圖"
        style={{ width: "100%", borderRadius: "10px" }}
      />
    </div>
  );
};

export default Map;
