import React, { useEffect, useState } from 'react';
import Navbar from "../../features/navbar/Navbar1.jsx";
import Footer from "../../features/footer/Footer.jsx";
import Topimg from '../../features/albergue/shlter.png';
import { useNavigate } from 'react-router-dom';
import Card from '../../features/albergue/card.jsx';
import styles from './Albergue.module.css'; //  引入 CSS module

const Albergue = () => {
  // 返回路線資訊的 button
  const navigate = useNavigate();
  function Routes() {
    navigate("/");
  }

  // 抓取庇護所的資料 (先設定為空陣列)
  const [albergue, SetAlbergue] = useState([]);

  // fetch 庇護所
  useEffect(() => {
    fetch('https://test-camino.onrender.com/data?table=albergue')
      .then(res => res.json())
      .then(SetAlbergue);
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        <nav><Navbar /></nav>
        <img src={Topimg} alt="上方" className={styles.topImage} />
      </div>

      <div className={styles.backButton} onClick={Routes}>←返回路線資訊</div>

      <hr />
      <div className={styles.sectionTitle}>城市: Saint-Jean-Pied-de-Port</div>

      <div className={styles.cardContainer}>
        {/* 顯示第 1~3 筆資料 */}
        {albergue.slice(0, 3).map((item, index) => (
          <Card
            key={`group1-${item.Aid || index}`}
            name={item.name}
            type={item.type}
            address={item.address}
            features={item.feature}
            link={item.link}
            imgUrl={item.img_url}
          />
        ))}
      </div>

      <hr />
      <div className={styles.sectionTitle}>城市: Roncesvalles（羅恩塞斯瓦列斯）</div>

      <div className={styles.cardContainer}>
        {/* 顯示第 4~6 筆資料 */}
        {albergue.slice(3, 6).map((item, index) => (
          <Card
            key={`group2-${item.Aid || index}`}
            name={item.name}
            type={item.type}
            address={item.address}
            features={item.feature}
            link={item.link}
            imgUrl={item.img_url}
          />
        ))}
      </div>

      <footer><Footer /></footer>
    </>
  );
};

export default Albergue;
