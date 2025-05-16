import React from "react";
import style from "./ContactForm.module.css";

export default function ContactForm() {
  return (
    <div className={style["form-section"]}>
      <h3 className={style["form-title"]}>
        聯絡人資料<div className={style["from-div"]}></div>
      </h3>

      <div className={style["form-column"]}>
        <label className={style["form-label"]}>電郵地址</label>
        <input
          type="email"
          className={style["form-email"]}
          placeholder="example@email.com"
        />
      </div>

      <div className={style["form-column"]}>
        <label className={style["form-label"]}>聯絡電話</label>
        <div className={style["phone-group"]}>
          <select className={style["form-select"]}>
            <option value="886">Taiwan - 台灣 (+886)</option>
            <option value="852">Hong Kong - 香港 (+852)</option>
            <option value="81">Japan - 日本 (+81)</option>
          </select>
          <input
            type="tel"
            className={style["form-input phone-number"]}
            placeholder="連絡電話"
          />
        </div>
      </div>
    </div>
  );
}
