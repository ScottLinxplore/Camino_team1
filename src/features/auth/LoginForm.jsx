//輸入帳號判斷
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 加這行用來跳轉

const LoginForm = ({ isVisible, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ✅ 建立導向函式

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!email) {
      setEmailError("請輸入 email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("請輸入密碼");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        localStorage.setItem("userId", data.userId);
        setIsLoggedIn(true);
        navigate("/member");
      } else {
        alert(data.message || "登入失敗");
      }
    } catch (error) {
      alert("伺服器錯誤，請稍後再試");
    }
  };
  return (
    <div
      className="form-container sign-in-container"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <form onSubmit={handleSubmit}>
        <h2>會員登入</h2>
        <input
          type="email"
          placeholder="請輸入 email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error-text">{emailError}</p>}

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁‍🗨" : "👁"}
          </span>
        </div>

        {passwordError && <p className="error-text">{passwordError}</p>}
        <button type="submit">登入</button>
        <p className="terms">
          <br />
          登入後視同您已閱讀並同意
          <br />
          【本站條款】之會員條款及數據隱私條款
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
