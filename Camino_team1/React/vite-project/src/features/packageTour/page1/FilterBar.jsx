import React from "react";
import { Slider } from "@mui/material";
import styles from "./FilterBar.module.css";

export default function FilterBar({ filters, setFilters }) {
  const handleDistanceChange = (e, newValue) => {
    setFilters({ ...filters, distance: newValue });
  };

  const handlePriceChange = (e, newValue) => {
    setFilters({ ...filters, price: newValue });
  };

  const handleDifficultyChange = (e) => {
    const { value, checked } = e.target;
    let newDifficulty = [...filters.difficulty];
    if (checked) {
      newDifficulty.push(value);
    } else {
      newDifficulty = newDifficulty.filter((d) => d !== value);
    }
    setFilters({ ...filters, difficulty: newDifficulty });
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    let newFeature = [...filters.feature];
    if (checked) {
      newFeature.push(value);
    } else {
      newFeature = newFeature.filter((d) => d !== value);
    }
    setFilters({ ...filters, feature: newFeature });
  };
  return (
    <div className={styles.container}>
      <div className={styles.sidebar} style={{ marginBottom: "24px" }}>
        <h3>路線總長 (公里)</h3>
        <p>
          {filters.distance[0]}km ~ {filters.distance[1]}km
        </p>
        <Slider
          value={filters.distance}
          onChange={handleDistanceChange}
          min={0}
          max={1000}
          step={10}
          valueLabelDisplay="auto"
          sx={{
            color: "#66bb6a", // 🌿 主色（thumb + track）
            width: "90%",
            display: "block", // 需要 block 才能 margin 自動置中
            marginX: "auto", // mx: auto = 左右自動外距
            height: 2,
            "& .MuiSlider-thumb": {
              width: 22,
              height: 22,
              backgroundColor: "#fff",
              border: "2px solid currentColor",
              "&:hover": {
                boxShadow: "0 0 0 6px rgba(102, 187, 106, 0.2)",
              },
            },
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-rail": {
              opacity: 0.5,
              backgroundColor: "#c8e6c9", // 軌道灰綠
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "#66bb6a",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "12px",
            },
          }}
        />

        <h3>價格區間 (NT$)</h3>
        <p>
          NT${filters.price[0]} ~ NT${filters.price[1]}
        </p>
        <Slider
          value={filters.price}
          onChange={handlePriceChange}
          min={0}
          max={230000}
          step={1000}
          valueLabelDisplay="auto"
          sx={{
            color: "#66bb6a",
            width: "90%",
            display: "block",
            marginX: "auto",

            height: 2,
            "& .MuiSlider-thumb": {
              width: 22,
              height: 22,
              backgroundColor: "#fff",
              border: "2px solid currentColor",
              "&:hover": {
                boxShadow: "0 0 0 6px rgba(102, 187, 106, 0.2)",
              },
            },
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-rail": {
              opacity: 0.5,
              backgroundColor: "#c8e6c9", // 軌道灰綠
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "#66bb6a",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "12px",
            },
          }}
        />
      </div>
      <div className={styles.sidebar} style={{ marginBottom: "24px" }}>
        {["自然風光", "文化體驗", "歷史古蹟"].map((level) => (
          <label key={level} style={{ display: "block", margin: "4px 0" }}>
            <input
              type="checkbox"
              value={level}
              checked={filters.feature.includes(level)}
              onChange={handleFeatureChange}
            />
            {level}
          </label>
        ))}
      </div>

      <div className={styles.sidebar}>
        <h3>難易度</h3>
        {["困難", "中等", "新手"].map((level) => (
          <label key={level} style={{ display: "block", margin: "4px 0" }}>
            <input
              type="checkbox"
              value={level}
              checked={filters.difficulty.includes(level)}
              onChange={handleDifficultyChange}
            />
            {level}
          </label>
        ))}
      </div>
    </div>
  );
}
