import "./Footer.css";

export default function Footer() {

  return (
    <>
    <footer className="footer">
    <div className="footer-container">
      {/* 左側 Logo & 聯絡方式 */}
      <div className="footer-left">
        <h2>Logo</h2>
        <p>abc@hamail.com</p>
        <p>0412341234</p>
        <p>0412341234</p>
        <div className="social-icons">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-square-instagram"></i>
          <i className="fa-brands fa-x-twitter"></i>
        </div>
      </div>

      {/* 中間導航 */}
      <div className="footer-center">
        <ul>
          <li>裝備行程</li>
          <li>路線資訊</li>
          <li>裝備資訊</li>
          <li>相關資訊</li>
        </ul>
      </div>

      {/* 右側路線 */}
      <div className="footer-right">
        <ul>
          <li>法國之路</li>
          <li>葡萄牙之路</li>
          <li>北方之路</li>
          <li>銀之路</li>
          <li>原始之路</li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <p>Copyright &copy; 2025 xxx股份有限公司<br/>
        All right reserved<br/>
        Designed by Group 1</p>
    </div>
  </footer>
  </>
  );
}