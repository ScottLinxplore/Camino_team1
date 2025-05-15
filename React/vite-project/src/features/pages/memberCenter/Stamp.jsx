import React, { useEffect, useState } from "react";
// import Navbar from "../../features/navbar/Navbar1";
// import Footer from "../../features/footer/Footer";
import { useNavigate } from "react-router-dom";
import Topimg from "../../stamp/Stamp.png";
import styles from "./Stamp.module.css";

const Stamp = () => {
  const [stamp, SetStamp] = useState([]);
  const navigate = useNavigate();

  function Routes() {
    navigate("/routeintro");
  }

  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=stamp")
      .then((res) => res.json())
      .then(SetStamp);
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        {/* <nav><Navbar /></nav> */}
        <img src={Topimg} alt="上方" className={styles.topImage} />
      </div>

      <div className={styles.backButton} onClick={Routes}>
        ←返回路線資訊
      </div>
      <hr />

      <div className={styles.wrapper}>
        {stamp.slice(0, 3).map((item, index) => (
          <div key={index} className={styles.stampCard}>
            {/* 區塊上方標題區 */}
            <div className={styles.cardHeader}>
              <img
                src={item.stamp_img}
                alt="stampimg"
                style={{ width: "150px", height: "120px" }}
              />
              <div className={styles.cardTitle}>
                <p>{item.city_name}</p>
                <p>{item.stamp_location}</p>
              </div>
              <img src={item.type_img} alt="icon" style={{ width: "100px" }} />
            </div>
            <br />

            {/* 區塊圖片 */}
            <div className={styles.mainImage}>
              <img src={item.stamp_location_image} alt="stamp_location" />
            </div>

            {/* 區塊文字內容 */}
            <div className={styles.cardDetails}>
              <div>功能: {item.function}</div>
              <div style={{ marginTop: "20px" }}>
                <div style={{ marginBottom: "5px" }}>蓋章特色：</div>
                <ul>
                  <li>{item.feature}</li>
                </ul>
              </div>
              <div style={{ marginTop: "20px" }}>
                連結:{" "}
                <a
                  className={styles.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.link}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <footer><Footer /></footer> */}
    </>
  );
};

export default Stamp;
