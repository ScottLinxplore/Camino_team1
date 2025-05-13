import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 每次 pathname 改變時，滾動到最上面
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 不渲染任何東西
};

export default ScrollToTop;
