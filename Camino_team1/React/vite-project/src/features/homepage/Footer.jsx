import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerRow}>
        {/* 左側 Logo + 聯絡資訊 */}
        <div className={style.footerLeft}>
          <h2>Logo</h2>
          <p>abc@hamail.com</p>
          <p>0412341234</p>
          <p>0412341234</p>
          <div className={style.socialIcons}>
            <i className={`fa-brands fa-facebook ${style.socialIcon}`}></i>
            <i className={`fa-brands fa-instagram ${style.socialIcon}`}></i>
            <i
              className={`fa-brands fa-square-instagram ${style.socialIcon}`}
            ></i>
            <i className={`fa-brands fa-x-twitter ${style.socialIcon}`}></i>
          </div>
        </div>

        {/* 右側導覽列 */}
        <div className={style.footerRight}>
          <div className={style.footerLinksWrapper}>
            <div className={style.footerLinks}>
              <div className={style.linkBox}>
                <Link to="/page1">套裝行程</Link>
              </div>
              <div className={style.linkBox}>
                <Link to="/HomeRoute">路線資訊</Link>
                <Link to="/routeintro" className={style.subLink}>
                  法國之路
                </Link>
                <Link to="/routeintro" className={style.subLink}>
                  葡萄牙之路
                </Link>
                <Link to="/routeintro" className={style.subLink}>
                  北方之路
                </Link>
                <Link to="/routeintro" className={style.subLink}>
                  白銀之路
                </Link>
                <Link to="/routeintro" className={style.subLink}>
                  原始之路
                </Link>
              </div>
              <div className={style.linkBox}>
                <Link to="/route">路線規劃</Link>
              </div>
              <div className={style.linkBox}>
                <Link to="/cards">相關資訊</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 版權資訊 */}
      <div className={style.footerBottom}>
        <p>
          Copyright &copy; 2025 嗝咪弄股份有限公司
          <br />
          All right reserved
          <br />
          Designed by Group 1
        </p>
      </div>
    </footer>
  );
}
