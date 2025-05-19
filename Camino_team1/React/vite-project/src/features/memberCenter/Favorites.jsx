import React, { useEffect, useState } from "react";

const Scenery = () => {
  const userId = localStorage.getItem("userId");
  const [favoriteSpots, setFavoriteSpots] = useState([]);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3001/favorites/sight/${userId}`)
    // fetch(`http://localhost:3001/favorites/details/${userId}`)
      .then((res) => res.json())
      .then(setFavoriteSpots)
      .catch((err) => console.error("讀取景點收藏失敗", err));
  }, [userId]);

  const removeFavorite = async (sightId) => {
    await fetch("http://localhost:3001/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, attractionId: sightId }),
    });

    setFavoriteSpots((prev) =>
      prev.filter((spot) => spot.sight_id !== sightId)
    );
  };

  return (
    <div>
      <h2>收藏景點</h2>
      {favoriteSpots.length === 0 ? (
        <p>目前尚無收藏景點。</p>
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
            <img
              src={spot.img_url}
              alt={spot.cname}
              style={{ width: "100px", marginRight: "1rem" }}
            />
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

export default Scenery;
