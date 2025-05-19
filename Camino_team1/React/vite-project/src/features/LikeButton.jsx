import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons"; //實心愛心
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"; //空心愛心

export default function LikeButton({ data }) {
  const [isLiked, setIsLiked] = useState(false);
  const userId = localStorage.getItem("userId") || null;
  const routeId = data.route_id ?? null;
  const attractionId = data.sight_id ?? null;


  useEffect(() => {
    if (!userId || (!routeId && !attractionId)) return;

    fetch(
      `http://localhost:3001/api/like/check/${userId}?routeId=${routeId}&attractionId=${attractionId}`
    )
      .then((res) => res.json())
      .then((data) => setIsLiked(data.liked))
      .catch((err) => console.error("查詢按讚失敗2", err));
  }, [userId, routeId, attractionId]);

  const toggleLike = async (e) => {
    if (!userId) {
      alert("請先登入才能按讚");
      return;
    }

    try {
      
      
      const res = await fetch("http://localhost:3001/api/like/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, routeId, attractionId }),
      });
      const data = await res.json();
      setIsLiked(data.liked);
    } catch (err) {
      console.error("切換按讚失敗", err);
    }
  };

  return <span onClick={(e) => {
    e.stopPropagation();
    toggleLike();
  }} > {isLiked ? <FontAwesomeIcon icon={faHeart} style={{ color: "#DAFF60" }} /> : <FontAwesomeIcon icon={faHeartRegular} style={{ color: "#DAFF60" }} />} </span>;

}
