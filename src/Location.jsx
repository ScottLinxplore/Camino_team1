import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar1";
import Footer from "./components/footer/Footer";
import { useNavigate } from "react-router-dom";
import Topimg from "./components/sight/location.png";
import SightCard from "./components/sight/sightCard";
//匯入愛心圖案
// import Heart from './components/sight/heart'
//匯入空心愛心圖案
// import EmptyHeary from './components/sight/emptyheart'

const Albergue = () => {
  //返回路線資訊按鈕的function
  const navigate = useNavigate();
  //返回路線資訊的按鈕
  function Routes() {
    navigate("/");
  }
  //抓資料庫的圖片
  const [sight1, setSight1] = useState([]);

  //抓景點的各項資料
  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=sight")
      .then((res) => res.json())
      .then((data) => {
        const sorteData = data.sort((a, b) => a.sight_id - b.sight_id)
        setSight1(sorteData);
      })

  }, []);


  return (
    <>
      <div
        style={{
          fontFamily: "sans-serif",
          padding: "10px",
          paddingLeft: "20px",
        }}
      >
        <nav>
          <Navbar />{" "}
        </nav>
        <img
          src={Topimg}
          alt="上方"
          style={{ width: "600px", marginTop: "30px" }}
        ></img>
      </div>
      <div
        className="backButton"
        style={{
          display: "flex",
          width: "150px",
          height: "30px",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "rgb(104,175,69)",
          color: "rgb(255, 255, 255)",
          border: "rgb(104,175,69) solid 2px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={Routes}
      >
        ←返回路線資訊
      </div>
      <hr />

      {/* 主體 */}
      {/* 第一排 1~3個 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        {sight1.slice(0, 3).map((item, index) => (
          <SightCard
            key={index}
            sight_id={item.sight_id}
            cname={item.cname}
            ename={item.ename}
            feature={item.feature}
            img_url={item.img_url}
          />
        ))}
      </div>

      {/* 第二排 4~6 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        {sight1.slice(3, 6).map((item, index) => (
          <SightCard
            key={index}
            sight_id={item.sight_id}
            cname={item.cname}
            ename={item.ename}
            feature={item.feature}
            img_url={item.img_url}
          />
        ))}
      </div>

      {/* 第三排 7~9 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        {sight1.slice(6, 9).map((item, index) => (
          <SightCard
            key={index}
            sight_id={item.sight_id}
            cname={item.cname}
            ename={item.ename}
            feature={item.feature}
            img_url={item.img_url}
          />
        ))}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Albergue;
