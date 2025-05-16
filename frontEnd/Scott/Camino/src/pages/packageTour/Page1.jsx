import { useEffect, useState } from "react";
import FilterBar from "../../features/packageTour/page1/FilterBar";
import CardList from "../../features/packageTour/page1/CardList";
import HotSpotCarousel from "../../features/packageTour/page1/HotSpotCarousel";
import { useNavigate } from "react-router-dom";
import styles from "./Page1.module.css";

// const hotSpots = [
//   {
//     title: "原始之路",
//     image: "./project/09.jpg",
//     description: "原始之路的特色在壯麗自然與挑戰地形，沿途村落美景豐富。",
//   },
//   {
//     title: "北方之路",
//     image: "./project/02.jpg",
//     description: "沿著壯麗海岸線，自然景觀多變，是許多旅人喜愛之選。",
//   },
//   {
//     title: "法國之路",
//     image: "./project/03.jpg",
//     description: "主要朝聖路線之一，設施完善、文化底蘊深厚。",
//   },
//   {
//     title: "葡萄牙之路",
//     image: "./project/04.jpg",
//     description: "氣候宜人，能同時體驗海岸景觀與葡萄牙文化。",
//   },
//   {
//     title: "英國之路",
//     image: "./project/05.jpg",
//     description: "主要朝聖路線之一，設施完善、文化底蘊深厚。",
//   },
//   {
//     title: "銀之路",
//     image: "./project/06.jpg",
//     description: "氣候宜人，能同時體驗海岸景觀與葡萄牙文化。",
//   },
//   {
//     title: "世界盡頭之路",
//     image: "./project/07.jpg",
//     description: "沿著壯麗海岸線，自然景觀多變，是許多旅人喜愛之選。",
//   },
//   {
//     title: "聖雅各之路",
//     image: "./project/08.jpg",
//     description: "壯麗自然與挑戰地形，沿途村落美景豐富。",
//   },
// ];

// const allRoutes = [
//   {
//     name: "法國之路",      /*name*/
//     distance: 790,        /*length*/
//     difficulty: "中等",   /*difficulty*/
//     price: 50000,         /*pricing*/
//     feature: "自然風光",   /*feature*/
//     img:"./project/03.jpg",
//   },
//   {
//     name: "葡萄牙之路",
//     distance: 610,
//     difficulty: "新手",
//     price: 40000,
//     feature: "文化體驗",
//     img:"./project/04.jpg",
//   },
//   {
//     name: "英國之路",
//     distance: 122,
//     difficulty: "新手",
//     price: 30000,
//     feature: "文化體驗",
//     img:"./project/05.jpg",
//   },
//   {
//     name: "原始之路",
//     distance: 310,
//     difficulty: "困難",
//     price: 80000,
//     feature: "歷史古蹟",
//     img:"./project/06.jpg",
//   },
//   {
//     name: "北方之路",
//     distance: 830,
//     difficulty: "困難",
//     price: 70000,
//     feature: "自然風光",
//     img:"./project/07.jpg",
//   },
//   {
//     name: "銀之路",
//     distance: 1000,
//     difficulty: "困難",
//     price: 40000,
//     feature: "歷史古蹟",
//     img:"./project/08.jpg",
//   },
// ];

function P_1_PackageTour() {
  const mockUserId = "2"; // 開發階段先用假的

  const [hotSpots, setHotSpots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/api/hotspots") // 替換為你的後端 API URL
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
    fetch("http://localhost:3003/api/hotspots/summary") // 替換為你的後端 API URL
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
