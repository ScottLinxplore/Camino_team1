//註冊介面
import React, { useState } from "react";

const RegisterForm = ({ isVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 檢查 email
    if (!email) {
      setRegisterError("請輸入 email");
      return;
    }

    // 檢查密碼
    if (!password) {
      setPasswordError("請輸入密碼");
      return;
    }

    // 檢查密碼是否一致
    if (password !== confirmPassword) {
      setPasswordError("密碼與確認密碼不一致");
      return;
    }

    // 清除錯誤訊息
    setPasswordError("");
    setRegisterError("");

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setRegisterSuccess(data.message);
        setRegisterError("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setRegisterError(data.error);
        setRegisterSuccess("");
      }
    } catch {
      setRegisterError("註冊過程中發生錯誤");
    }
  };

  return (
    <div
      className="form-container sign-up-container"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <form onSubmit={handleSubmit}>
        <h2>註冊</h2>
        <input
          type="email"
          placeholder="請輸入 email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {registerError && <p className="error-text">{registerError}</p>}
        {registerSuccess && <p className="success-text">{registerSuccess}</p>}

        <input
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="確認密碼"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError && <p className="error-text">{passwordError}</p>}

        <button type="submit">註冊</button>
        <p className="terms">
          點擊註冊即表示您已閱讀並同意
          <br />
          【本站條款】之會員條款及數據隱私條款
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
