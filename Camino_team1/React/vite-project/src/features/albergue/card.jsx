import React from "react";
const Card = ({ name, type, address, features, link, imgUrl, Aid }) => (
  <div style={{ display: "flex", gap: "40px", marginBottom: "50px" }}>
    <div>
      <img
        src={imgUrl}
        alt="載入中"
        style={{ width: "300px", borderRadius: "8px" }}
      />
    </div>
    <div>
      <p>名稱:{name}</p>
      <p>類型:{type}</p>
      <p>地址:{address}</p>
      <p>特色:</p>
      <ul style={{ marginTop: 0 }}>
        {features.split("｜").map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <p>
        連結:
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </p>
    </div>
  </div>
);
export default Card;
