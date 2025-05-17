import React from "react";
import { useState, useEffect } from "react";
import foot from "./length.png";
//useNavigate可以導到在app.js指定的路由"/"
import { useNavigate } from "react-router-dom";
import "./homeRoute.css"

const HomeRoute = () => {
  // 初始化 navigate
  const navigate = useNavigate();
  //按鈕前往路線資訊
  function Toroute() {
    navigate("/routeintro"); // 導向到 "/"，即 <Froute /> 的頁面
  }
  //抓法國之路的圖片
  const [route_1, setRoute_1] = useState(null);
  //抓法國之路的intro
  const [cityIntro, setCityIntro] = useState(null); //抓intro=>葡萄牙之路
  //抓法國之路的圖片
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

  //抓法國之路的intro
  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=routes")
      .then((res) => res.json())
      .then((data) => {
        //篩選此json檔案的route_id = 5的那筆資料(法國之路)
        const intro = data.find((item) => item.route_id === 1);
        setCityIntro(intro);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "150px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "100px",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>
          法國之路{" "}
          <img
            style={{ width: "150px", marginTop: "30px" }}
            src={foot}
            alt=""
          />
        </h2>

        {route_1 ? (
          <img
            src={route_1}
            alt="底部圖片"
            style={{
              width: "600px",
              height: "200px",
              marginTop: "0px",
            }}
          />
        ) : (
          "圖片載入中..."
        )}
      </div>

      <div style={{ width: "400px", marginTop: "120px" }}>
        <p>{cityIntro ? cityIntro.intro : "資料載入中"}</p>
        <button
          className="buttonMore"
          onClick={Toroute}

        >
          查看更多
        </button>
      </div>
    </div>
  );
};

export default HomeRoute;
