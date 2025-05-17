import React, { useState, useEffect } from "react";
import styles from "./Froute.module.css";
import Altitude from "../../Routes/altitude";
import temperory from "../../Routes/image.png";
import Weather from "./showWeather";
// import Navbar from "../../features/navbar/Navbar1";
import Topimg from "../../topimg.png";
import TopSection from "../../Froute/Top3";
import "../../Froute/slideshow.css";
import Slideshow from "../../Froute/slideshow";
import { IntroFooter } from "../../Froute/intro_footer";
import IntroFooter2 from "../../Froute/intro_footer2";
// import Footer from "../../features/footer/Footer";
import AverageWeather from "../../weatherAPI/averageWeather";
import { useNavigate } from "react-router-dom";
// import Map from "./components/Froute/map"

const Froute = () => {
  const [activeTab, setActiveTab] = useState("weather"); //天氣
  const [cityIntro, setCityIntro] = useState(null); //抓description的intro
  const [descriptionImg, setDescriptionImg] = useState(null); //抓description的img
  const [showDescription, setShowDescription] = useState(false); //切換顯示description文字顯示/隱藏(預設隱藏)
  const [route_1, setRoute_1] = useState(null); //抓法國之路的圖片
  const navigate = useNavigate(); // 初始化 navigate
  //返回路線資訊的按鈕

  function buy() {
    navigate("/page2");
  }
  //改改改改改改這行(連到路線規劃時的routeId=1)
  function plan() {
    navigate("/PlainingDate", {
      state:{
        // 這裡的routeId變數名子，只是要將這個資料帶入到路線規劃那邊
        // useLocation用來接收這裡useNavigate傳出去的state(在路線規劃那邊)
        // item.route_id === parseInt(routeId))
        routeId:1
      }
    });
  }
  //抓圖片
  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=img")
      .then((res) => res.json())
      .then((data) => {
        const ImgData_1 = data.find((item) => item.target_id === 5);
        if (ImgData_1 && ImgData_1.img_url) {
          setRoute_1(ImgData_1.img_url);
        } else {
          console.warn("找不到 route_id === 3 的圖片資料");
        }
      })
      .catch((err) => {
        console.error("圖片資料抓取錯誤：", err);
      });
  }, []);

  //抓intro
  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=routes")
      .then((res) => res.json())
      .then((data) => {
        const intro = data.find((item) => item.route_id === 1);
        setCityIntro(intro);
      });
  }, []);

  //從img資料表抓description的img
  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=img")
      .then((res) => res.json())
      .then((data) => {
        const desImg = data.find((item) => item.target_id === 2);
        setDescriptionImg(desImg);
      });
  }, []);

  //設定"查看更多"按鈕的點擊事件:
  function showText() {
    setShowDescription((pre) => !pre);
  }

  return (
    <>
      {/* 上方 navbar 與圖片 */}
      <div className={styles.container}>
        <img src={Topimg} alt="圖片載入中" className={styles.topImage} />
        <TopSection />

        {/* 切換按鈕 */}
        <div className={styles.tabButtons}>
          {["weather", "altitude", "map"].map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`${styles.tabButton} ${activeTab === key ? styles.activeTab : styles.inactiveTab
                }`}
            >
              {key === "weather"
                ? "天氣預報"
                : key === "altitude"
                  ? "城市天氣"
                  : "海拔圖示"}
            </button>
          ))}
        </div>

        <hr />

        {/* 切換內容區塊 */}
        <div className={styles.tabContent}>
          {activeTab === "weather" && (
            <div className={styles.weatherBox}>
              <AverageWeather />
            </div>
          )}
          {activeTab === "altitude" && (
            <div className={styles.altitudeBox}>
              <Weather />
            </div>
          )}
          {activeTab === "map" && (
            <div className={styles.mapBox}>
              <Altitude />
            </div>
          )}
        </div>

        {/* 中段卡片區塊 */}
        <div className={styles.bottomSection}>
          {/* 左邊卡片 */}
          <div className={`${styles.card} ${styles.leftCard}`}>
            {route_1 ? (
              <img src={route_1} alt="底部圖片" className={styles.routeImage} />
            ) : (
              "圖片載入中..."
            )}
            <p style={{ padding: "15px" }}>
              {cityIntro ? cityIntro.intro : "資料載入中"}
            </p>
          </div>

          {/* 右邊卡片 */}
          <div className={`${styles.card} ${styles.rightCard}`}>
            <img src={temperory} alt="朝聖地圖" className={styles.tempImage} />
            <p className={styles.cardTitle}>
              【法國之路】朝聖之旅-路線規畫方針
            </p>
            <div className={styles.buttonRow}>
              <button className={styles.greenButton} onClick={buy}>
                立刻訂購套裝行程
              </button>
              <button className={styles.greenButton} onClick={plan}>
                規劃路線法國之路
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部說明圖片與按鈕浮動 */}
      <div className={styles.descriptionContainer}>
        <div
          style={{ position: "relative", width: "100%", maxWidth: "1000px" }}
        >
          {descriptionImg && descriptionImg.img_url ? (
            <img
              src={descriptionImg.img_url}
              alt="說明圖片"
              className={styles.descriptionImage}
              style={{ opacity: showDescription ? 1 : 0.5 }}
            />
          ) : (
            "資料載入中"
          )}

          {/* 按鈕浮在圖片中下方 */}
          <button
            className={styles.showTextButton}
            style={{ opacity: showDescription ? 0.5 : 1 }}
            onClick={showText}
          >
            查看更多↓
          </button>
        </div>
      </div>

      {/* 展開後的文字區塊 */}
      {showDescription && (
        <div className={styles.descriptionText}>
          {cityIntro && cityIntro.description ? (
            <div>
              <span className={styles.descriptionFirstChar}>
                {cityIntro.description.charAt(0)}
              </span>
              {cityIntro.description.slice(1)}
            </div>
          ) : (
            "資料載入中"
          )}
        </div>
      )}

      {/* 底部選單按鈕 */}
      <div className={styles.routeButtons}>
        <button
          onClick={() => navigate("/Location")}
          className={styles.routeButton}
        >
          景點介紹
        </button>
        <button
          onClick={() => navigate("/Albergue")}
          className={styles.routeButton}
        >
          庇護所資訊
        </button>
        <button
          onClick={() => navigate("/Stamp")}
          className={styles.routeButton}
        >
          蓋章地點
        </button>
      </div>

      {/* 幻燈片 */}
      <div className={styles.slideshowContainer}>
        <Slideshow />
      </div>

      {/* Footer卡片 */}
      <div className={styles.footerCards}>
        <IntroFooter />
        <IntroFooter2 />
      </div>

      {/* 返回首頁按鈕 */}
      <div className={styles.viewRoutesButton}>
        <button
          onClick={() => navigate("/HomeRoute")}
          className={styles.routeButton}
        >
          瀏覽所有路線
        </button>
      </div>
    </>
  );
};

export default Froute;



//                                         __----~~~~~~~~~~~------___
//                                   .  .   ~~//====......          __--~ ~~
//                   -.            \_|//     |||\\  ~~~~~~::::... /~
//                ___-==_       _-~o~  \/    |||  \\            _/~~-
//        __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
//    _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
//  .~       .~       |   \\ -_    /  /-   /   ||      \   /
// /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
// |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
//          '         ~-|      /|    |-~\~~       __--~~
//                      |-~~-_/ |    |   ~\_   _-~            /\
//                           /  \     \__   \/~                \__
//                       _--~ _/ | .-~~____--~-/                  ~~==.
//                      ((->/~   '.|||' -_|    ~~-/ ,              . _||
//                                 -_     ~\      ~~---l__i__i__i--~~_/
//                                 _-~-__   ~)  \--______________--~~
//                               //.-~~~-~_--~- |-------~~~~~~~~
//                                      //.-~~~--\
//                               神獸保佑，程式碼沒Bug!
