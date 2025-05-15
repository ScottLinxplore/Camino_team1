import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa"; // 空心愛心
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./sightCard.css";
// import { FaHeart} from 'react-icons/fa  '

const SightCard = ({
  sight_id,
  cname,
  ename,
  feature,
  img_url,
  onFavoriteAdded,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, attractionId: sight_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("收藏成功 ✅", data);
        setIsFavorite(true); // ✅ 改變愛心樣式
        if (onFavoriteAdded) {
          onFavoriteAdded(); // ✅ 通知父層重新抓收藏資料
        }
      })
      .catch((err) => console.error("收藏失敗 ❌", err));
  };

  const navigate = useNavigate();
  const more = () => {
    navigate(`/sight/${sight_id}`);
  };

  return (
    <div
      style={{
        width: "250px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
        padding: "16px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* 愛心圖示 */}
      <FaRegHeart
        size={24}
        color={isFavorite ? "gray" : "red"} // 收藏後變色（可改圖示）
        onClick={handleFavorite}
        style={{
          position: "absolute",
          top: "300px",
          left: "12px",
          cursor: "pointer",
        }}
      />

      {/* 圖片區塊 */}
      {/* 點圖片跳轉 */}
      <Link to={`/sight/${sight_id}`} style={{ textDecoration: "none" }}>
        <div
          className="img-block"
          style={{
            width: "100%",
            height: "140px",
            backgroundColor: "#ccc",
            borderRadius: "8px",
            marginBottom: "12px",
            backgroundImage: `url(${img_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 0.3s ease-in-out",
          }}
        ></div>
      </Link>

      {/* 標題 */}
      <h3 style={{ margin: "4px 0", fontSize: "18px", fontWeight: "bold" }}>
        {cname}
      </h3>
      <p style={{ margin: "0 0 8px", fontSize: "14px", color: "#555" }}>
        {ename}
      </p>

      {/* 特色 */}
      <div style={{ fontSize: "14px", marginBottom: "8px" }}>
        <strong>特色</strong>
        <ul style={{ paddingLeft: "16px", margin: "6px 0" }}>
          {feature.split("｜").map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      {/* 更多按鈕 */}
      <button
        onClick={more}
        style={{
          backgroundColor: "#76cc36",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "8px 16px",
          fontWeight: "bold",
          cursor: "pointer",
          position: "relative",
          float: "right",
        }}
      >
        more →
      </button>
    </div>
  );
};

export default SightCard;
