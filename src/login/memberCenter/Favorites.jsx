import React, { useEffect, useState } from "react";

const Favorites = () => {
  const userId = localStorage.getItem("userId"); // ✅ 從 localStorage 抓 userId
  const [favoriteSpots, setFavoriteSpots] = useState([]); // ✅ 直接存使用者的收藏詳細資料
  // const [favorites, setFavorites] = useState([]); // ✅ 用來做比對用（attraction_id 陣列）

  // 載入使用者收藏
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3001/favorites/details/${userId}`)
      .then((res) => res.json())
      .then(setFavoriteSpots)
      .catch((err) => console.error("讀取收藏失敗", err));
  }, [userId]);

  // 移除收藏
  const removeFavorite = async (attractionId) => {
    await fetch("http://localhost:3001/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, attractionId }),
    });

    setFavoriteSpots((prev) =>
      prev.filter((item) => item.sight_id !== attractionId)
    );
  };
  return (
    <div>
      <h2>我的收藏景點</h2>
      {favoriteSpots.length === 0 ? (
        <p>目前沒有收藏任何景點。</p>
      ) : (
        favoriteSpots.map((spot) => (
          <div
            key={spot.sight_id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{spot.cname}</h3>
            <p>{spot.feature}</p>
            <button onClick={() => removeFavorite(spot.sight_id)}>
              移除收藏
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
