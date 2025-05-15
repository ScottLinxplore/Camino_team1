import React, { useEffect, useState } from "react";
import Topimg from "../sight/location.png";
import { FaRegHeart } from "react-icons/fa"; //空心愛心
import { FaHeart } from "react-icons/fa"; //空心愛心
import { useNavigate } from "react-router-dom";
import "./sight.css";

const Sight_des1 = () => {
  //抓圖片(第一張)
  const [sight1, setSight1] = useState(null);
  //抓圖片(第二張)
  const [sight2, setSight2] = useState(null);
  //抓description1
  const [description1, setDescription1] = useState(null);
  //愛心切換
  const [islike, SetIslike] = useState(false);

  // 返回路線資訊的button
  const navigate = useNavigate();
  function Routes() {
    navigate("/Location");
  }

  //抓圖片(第一張)
  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=img")
      .then((res) => res.json())
      .then((data) => {
        const ImgData_1 = data.find((item) => item.target_id === 15);
        if (ImgData_1 && ImgData_1.img_url) {
          setSight1(ImgData_1.img_url);
        } else {
          console.warn("找不到 route_id === 3 的圖片資料");
        }
      })
      .catch((err) => {
        console.error("圖片資料抓取錯誤：", err);
      });
  }, []);

  //抓圖片(第二張)
  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=img")
      .then((res) => res.json())
      .then((data) => {
        const ImgData_2 = data.find((item) => item.target_id === 15);
        if (ImgData_2 && ImgData_2.img_url2) {
          setSight2(ImgData_2.img_url2);
        } else {
          console.warn("找不到 route_id === 3 的圖片資料");
        }
      })
      .catch((err) => {
        console.error("圖片資料抓取錯誤：", err);
      });
  }, []);

  //抓description1
  useEffect(() => {
    fetch("https://test-camino.onrender.com/data?table=sight")
      .then((res) => res.json())
      .then((data) => {
        const description = data.find((item) => Number(item.sight_id) === 5);
        setDescription1(description);
      });
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
        <img
          src={Topimg}
          alt="上方"
          style={{ width: "600px", marginTop: "30px" }}
        ></img>
      </div>
      <div className="backbtn" style={{}} onClick={Routes}>
        ←返回景點介紹
      </div>
      <hr />

      {/* 水平線下方*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "10px",
        }}
      >
        <div style={{ marginRight: "70%", fontSize: "30px" }}>
          羅格羅尼奧 <br />
          <span style={{ fontSize: "20px" }}>Logroño</span>
        </div>
        {/* 愛心切換功能 */}
        <div
          onClick={() => {
            SetIslike(!islike);
            if (islike) {
              alert("取消收藏!");
            } else {
              alert("已加入收藏!");
            }
          }}
          style={{ cursor: "pointer" }}
        >
          {islike ? (
            <div>
              <FaHeart size={30} color="red" />
              <span style={{ marginLeft: "5px" }}>收藏景點</span>
            </div>
          ) : (
            <div>
              <FaRegHeart size={30} color="red" />
              <span style={{ marginLeft: "5px" }}>收藏景點</span>
            </div>
          )}
        </div>
      </div>

      {/* 本體-第一部分 */}
      <div
        style={{
          marginBottom: "30px",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "30px",
          display: "flex",
          width: "1000px",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {sight1 ? (
          <img
            src={sight1}
            alt="底部圖片"
            style={{
              width: "800px",
              height: "400px",
              marginTop: "10px",
              marginBottom: "30px",
              borderRadius: "30px",
            }}
          />
        ) : (
          "圖片載入中..."
        )}
        <p style={{ width: "80%" }}>
          {description1 ? description1.description : "資料載入中"}
        </p>
      </div>

      {/* 本體-第二部分 */}
      <div
        style={{
          marginBottom: "30px",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "90px",
          display: "flex",
          width: "1000px",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {sight2 ? (
          <img
            src={sight2}
            alt="底部圖片"
            style={{
              width: "800px",
              height: "400px",
              marginTop: "30px",
              marginBottom: "30px",
              borderRadius: "30px",
            }}
          />
        ) : (
          "圖片載入中..."
        )}
        <p style={{ width: "80%" }}>
          {description1 ? description1.description_2 : "資料載入中"}
        </p>
      </div>
    </>
  );
};

export default Sight_des1;
