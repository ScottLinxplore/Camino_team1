// // 5/18改改改改改 加上路收藏
// import React from "react";

// const Scenery = () => {
//   return (
//     <div>
//       <h2>景點</h2>
//       <p>目前尚無收藏景點。</p>
//     </div>
//   );
// };

// export default Scenery;

import React, { useEffect, useState } from "react";

const Scenery = () => {

    const userId = localStorage.getItem("userId");
    const [favoriteSpots, setFavoriteSpots] = useState([]);

    useEffect(() => {
      if (!userId) return;

      fetch(`http://localhost:3001/favorites/route/${userId}`)
        .then((res) => res.json())
        // .then(setFavoriteSpots)
        .then((data) => {
          setFavoriteSpots(data)
          console.log(data);
        })
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
        <h2>收藏套裝行程</h2>
        {favoriteSpots.length === 0 ? (
          <p>目前尚無收藏景點。</p>
        ) : (
          favoriteSpots.map((spot) => (
            <div
              key={spot.route_id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <img
                src={spot.img}
                alt={spot.cname}
                style={{ width: "100px", marginRight: "1rem" }}
              />
              <h3>{spot.name}</h3>
              <p>{spot.intro}</p>
              <button onClick={() => removeFavorite(spot.route_id)}>
                移除收藏
              </button>
            </div>
          ))
        )}
      </div>
    );
};

export default Scenery;
