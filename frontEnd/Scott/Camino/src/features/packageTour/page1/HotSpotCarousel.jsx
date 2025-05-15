import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import styles from "./HotSpotCarousel.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HotSpotCarousel({ spots }) {
  // 每2個為一頁
  const grouped = [];
  for (let i = 0; i < spots.length; i += 4) {
    grouped.push(spots.slice(i, i + 4));
  }

  // <Swiper
  // modules={[Navigation, Autoplay, Pagination]}
  // navigation
  // slidesPerView={1}
  // spaceBetween={30}
  // autoplay={{
  //   delay: 2000, // 每 3000ms 自動切換（3 秒）
  //   disableOnInteraction: false, // 使用者操作後仍繼續自動播放
  // }}
  // loop={true} // 可選：讓輪播循環無限播放
  // pagination={{
  //   type: "progressbar", // ✅ 進度條類型
  // }}
  // >

  {
    /* <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 0,                  // ✅ 無間隔，馬上接續下一張
          disableOnInteraction: false
        }}
        speed={8000} // ✅ 滑動一張花 8 秒，越大越慢
        loop={true} // 可選：讓輪播循環無限播放
        pagination={{
          type: "progressbar", // ✅ 進度條類型
        }}
      ></Swiper> */
  }

  return (
    <div className={styles["hotspot-carousel"]}>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        // navigation
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 2000, // 每 3000ms 自動切換（3 秒）
          disableOnInteraction: false, // 使用者操作後仍繼續自動播放
        }}
        loop={true} // 可選：讓輪播循環無限播放
        // pagination={{
        //   type: "progressbar", 
        // }}
      >
        {grouped.map((group, idx) => (
          <SwiperSlide key={idx}>
            <div className={styles["hotspot-slide"]}>
              {group.map((spot, index) => (
                <div className={styles["hotspot-card"]} key={index}>
                  <img src={spot.image} alt={spot.title} />
                  <div className={styles["text-block"]}>
                    <h3>{spot.title}</h3>
                    <p>{spot.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
