import React from "react";
import { useState } from "react";
import style from "./Feedback.module.css";

export default function Feedback() {
  // 驗證
  const [name, setName] = useState("金田二");
  const [email, setEmail] = useState("test@example.com");
  const [type, setType] = useState("路線建議");
  const [message, setMessage] = useState(
    "我覺得目前的路線設計很不錯，但如果能加入更多地標介紹會更有幫助！"
  );

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (name.trim() === "") {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (email.trim() === "") {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!hasError) {
      setShowPopup(true); // ✅ 顯示彈窗
      setName("");
      setEmail("");
      setType("路線建議");
      setMessage("");
    }
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <h2 className={style.title}>意見回饋表</h2>

        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="name">
              姓名
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${style.input} ${nameError ? style.invalid : ""}`}
            />
            {nameError && <div className={style.error}>請輸入姓名</div>}
          </div>
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="email">
              email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${style.input} ${emailError ? style.invalid : ""}`}
            />
            {emailError && <div className={style.error}>請輸入 email</div>}
          </div>
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="type">
            意見回饋類別
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={style.select}
          >
            <option className={style.option}>路線建議</option>
            <option className={style.option}>網站問題</option>
            <option className={style.option}>內容補充</option>
          </select>
        </div>

        <div className={style.formGroup}>
          <label htmlFor="message">您的意見</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={style.textarea}
          ></textarea>
        </div>

        <button type="submit" className={style.button}>
          送出
        </button>
      </form>

      {/* 彈出視窗 */}
      {showPopup && (
        <div className={style.popupOverlay}>
          <div className={style.popupBox}>
            <h3 className={style.popupTitle}>意見已送出</h3>
            <hr className={style.popupLine} />
            <p className={style.popupText}>
              感謝您提供寶貴的意見
              <br />
              我們會進行處理，有需要會和您聯繫
              <br />
              謝謝!
            </p>
            <button
              className={style.popupButton}
              onClick={() => setShowPopup(false)}
            >
              確認
            </button>
          </div>
        </div>
      )}
    </>
  );
}
