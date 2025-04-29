import React from "react";
import "./HeaderBanner.css";
import headerBannerImage from "./HeaderBanner.png";

export default function HeaderBanner({ title }) {
  return (
    <div className="header-banner">
      <img
        src={headerBannerImage}
        alt="headerBanner"
        className="header-image"
      />
      <h1 className="header-title">{title}</h1>
    </div>
  );
}

// 使用方式: 直接複製以下內容 有誤差可到css調整
// import HeaderBanner from './components/HeaderBanner';

// function OrderPage() {
//   return (
//     <div>
//       <HeaderBanner title="訂單明細" />
//     </div>
//   );
// }
