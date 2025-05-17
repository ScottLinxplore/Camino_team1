// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 當路由變化時，自動滾動至頂部
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 不需要渲染任何內容
};

export default ScrollToTop;
