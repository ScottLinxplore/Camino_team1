import React from "react";
import { useEffect, useState } from "react";
import FilterBar from "../../packageTour/page1/FilterBar";
import CardList from "../../packageTour/page1/CardList";
import HotSpotCarousel from "../../packageTour/page1/HotSpotCarousel";
import { useNavigate } from "react-router-dom";
import styles from "./Page1.module.css";

function P_1_PackageTour() {
  const [hotSpots, setHotSpots] = useState([]);
  const mockUserId = "2"; // 開發階段先用假的

  useEffect(() => {
    fetch("http://localhost:3002/api/hotspots") // 替換為你的後端 API URL
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.map((item) => ({
          title: item.cname,
          image: item.img_url,
          description: item.description,
        }));

        setHotSpots(transformed);
      })
      .catch((err) => {
        console.error("❌ 無法載入熱門景點：", err);
      });
  }, []);

  const [allRoutes, setallRoutes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/hotspots/summary") // 替換為你的後端 API URL
      .then((res) => res.json())
      .then((data) => {
        const Routesdata = data.map((item) => ({
          name: item.name,
          distance: item.length,
          difficulty: item.difficulty,
          price: item.pricing,
          img: item.img,
          feature: item.feature,
          route_id: item.route_id,
        }));
        setallRoutes(Routesdata);
      })
      .catch((err) => {
        console.error("❌ 無法載入熱門景點：", err);
      });
  }, []);

  const navigate = useNavigate();

  const goToPage2 = () => {
    navigate("/page2");
  };

  const levelToNumber = {
    新手: 1,
    中等: 2,
    困難: 3,
  };

  const [filters, setFilters] = useState({
    distance: [10, 1000],
    price: [1000, 230000],
    difficulty: [],
    feature: [],
  });

  const filteredRoutes = allRoutes.filter((item) => {
    //篩選 allRoutesd陣列裡的每個元素
    const matchDistance =
      item.distance >= filters.distance[0] &&
      // 元素符合距離區間[0]是最小[1]是最大
      item.distance <= filters.distance[1];
    const matchPrice =
      item.price >= filters.price[0] && item.price <= filters.price[1];
    const matchDifficulty =
      filters.difficulty.length === 0 ||
      filters.difficulty.includes(item.difficulty);
    const matchFeature =
      filters.feature.length === 0 || filters.feature.includes(item.feature);
    return matchDistance && matchPrice && matchDifficulty && matchFeature;
  });

  return (
    <div className={styles.filtercard}>
      <h2 style={{ fontSize: "4rem", fontWeight: "bold", margin: 40 }}>
        精選套裝行程
      </h2>
      <div className={styles.divbar}>
        <FilterBar filters={filters} setFilters={setFilters} />
        <CardList routes={filteredRoutes} userId={mockUserId} />
      </div>
      <div>
        <h2 style={{ fontSize: "60px", fontWeight: "bold", margin: 40 }}>
          朝聖之路熱門景點
        </h2>
        {/* 在 JSX 中要插入 JavaScript 表達式時，必須用 {} 包起來 */}
        {hotSpots.length === 0 ? (
          <p>載入中...</p>
        ) : (
          <HotSpotCarousel spots={hotSpots} />
        )}
        {/* <HotSpotCarousel spots={hotSpots} /> */}
      </div>
      {/* <div>
        <button onClick={goToPage2}>跳到第二頁</button>
      </div> */}
    </div>
  );
}
export default P_1_PackageTour;
