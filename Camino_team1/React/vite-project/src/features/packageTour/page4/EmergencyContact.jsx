import React from "react";
import style from "./EmergencyContact.module.css";
// -----------------------------整頁改------------------------------------------
// -----------------------------整頁改------------------------------------------
// -----------------------------整頁改------------------------------------------
export default function EmergencyContact({ formData, setFormData }) {
  return (
    <div className={style["form-section"]}>
      <h3 className={style["form-title"]}>
        緊急聯絡人資料<div className={style["from-div"]}></div>
      </h3>

      <div className={style["form-grid"]}>
        {/* 緊急聯絡人名字 */}
        <div className={style["form-group"]}>
          <label className={style["form-label"]}>名字</label>
          <input
            type="text"
            className={style["form-input"]}
            placeholder="聯絡人姓名"
            value={formData.emergencyName}
            onChange={(e) =>
              setFormData({ ...formData, emergencyName: e.target.value })
            }
          />
        </div>

        {/* 關係 (這欄未列入 mockData，可選填) */}
        <div className={style["form-group"]}>
          <label className={style["form-label"]}>關係</label>
          <select
            className={style["form-sel"]}
            value={formData.emergencyRelation}
            onChange={(e) =>
              setFormData({ ...formData, emergencyRelation: e.target.value })
            }
          >
            <option value="">請選擇</option>
            <option value="parent">父母</option>
            <option value="spouse">配偶</option>
            <option value="sibling">兄弟姊妹</option>
            <option value="friend">朋友</option>
            <option value="other">其他</option>
          </select>
        </div>

        {/* 緊急聯絡電話 */}
        <div className={style["form-group"]}>
          <label className={style["form-label"]}>聯絡電話</label>
          <input
            type="tel"
            className={style["form-input"]}
            placeholder="請輸入電話"
            value={formData.emergencyPhone}
            onChange={(e) =>
              setFormData({ ...formData, emergencyPhone: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
