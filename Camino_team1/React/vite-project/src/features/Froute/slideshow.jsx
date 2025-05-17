import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // 載入基本樣式
import "./slideshow.css";

// 引入自動播放、箭頭和分頁圓點的模組
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css/navigation"; // 箭頭樣式
import "swiper/css/pagination"; // 分頁圓點樣式

const Slideshow = () => {
  return (
    <div style={{ width: "700px", height: "400px", margin: "50px auto" }}>
      <Swiper
        //設置自動播放
        modules={[Autoplay, Navigation, Pagination]}
        //圖和圖之間間隔30px
        spaceBetween={30}
        //一次顯示一張圖片
        slidesPerView={1}
        //播到最後一張時跳回第一張
        loop={true}
        //自動播放(毫秒)=>要先套用Autoplay元件
        autoplay={{ delay: 3000 }}
        //左右箭頭
        navigation
        //分頁圓點(clickable:true=>可以點擊切換)
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img
            src="https://img1.pixhost.to/images/5653/597063605_sight_5-2.jpg"
            alt="圖片1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img1.pixhost.to/images/5654/597073302_sight_6-2.jpg"
            alt="圖片2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img1.pixhost.to/images/5675/597444881_stamp2.png"
            alt="圖片3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img1.pixhost.to/images/5654/597073946_sight_3-2.jpg"
            alt="圖片4"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://img1.pixhost.to/images/5541/595592071_description.png"
            alt="圖片"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slideshow;
