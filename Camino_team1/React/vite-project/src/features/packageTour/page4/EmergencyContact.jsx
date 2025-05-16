import React from "react";
import style from "./EmergencyContact.module.css";

export default function EmergencyContact() {
  return (
    <div className={style["form-section"]}>
      <h3 className={style["form-title"]}>
        緊急聯絡人資料<div className={style["from-div"]}></div>
      </h3>

      <div className={style["form-grid"]}>
        <div className={style["form-group"]}>
          <label className={style["form-label"]}>名字</label>
          <input
            type="text"
            className={style["form-input"]}
            placeholder="聯絡人姓名"
          />
        </div>

        <div className={style["form-group"]}>
          <label className={style["form-label"]}>關係</label>
          <select className={style["form-sel"]}>
            <option value="">請選擇</option>
            <option value="parent">父母</option>
            <option value="spouse">配偶</option>
            <option value="sibling">兄弟姊妹</option>
            <option value="friend">朋友</option>
            <option value="other">其他</option>
          </select>
        </div>

        <div className={style["form-group"]}>
          <label className={style["form-label"]}>聯絡電話</label>
          <input
            type="tel"
            className={style["form-input"]}
            placeholder="請輸入電話"
          />
        </div>
      </div>
    </div>
  );
}
