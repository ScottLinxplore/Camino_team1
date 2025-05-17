//登入的主要呈現介面
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OverlayPanel from "../shared/OverlayPanel";
import Navbar1 from "../homepage/Navbar1";
import "./LoginRegister.css";

const LoginRegister = ({ setIsLoggedIn }) => {
  const [isRegister, setIsRegister] = useState(false);
  const isLoggedIn = localStorage.getItem("userId") !== null; // ✅ 確保 Navbar1 有登入狀態

  return (
    <div className="login-page-wrapper">
      <Navbar1 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className={`container ${isRegister ? "right-panel-active" : ""}`}>
        <RegisterForm isVisible={isRegister} />
        <LoginForm isVisible={!isRegister} setIsLoggedIn={setIsLoggedIn} />
        <OverlayPanel setIsRegister={setIsRegister} />
      </div>
    </div>
  );
};

export default LoginRegister;

// import React, { useState } from "react";
// import "./LoginRegister.css";

// const LoginRegister = () => {
//   //判斷現在是註冊還是登入介面
//   const [isRegister, setIsRegister] = useState(false);
//   //讓使用者輸入 emali，password，confirmPassword
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   //表單驗證錯誤時會跳的字串
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   //切換密碼輸入框是否顯示
//   const [showPassword, setShowPassword] = useState(false);
//   //註冊成功或失敗 回傳的提示
//   const [registerError, setRegisterError] = useState("");
//   const [registerSuccess, setRegisterSuccess] = useState("");

//   const validateForm = () => {
//     let valid = true;
//     //登入表單
//     if (!email) {
//       setEmailError("請輸入 email");
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("email格式錯誤");
//       valid = false;
//     } else {
//       setEmailError("");
//     }

//     if (!password) {
//       setPasswordError("請輸入密碼");
//       valid = false;
//     } else if (isRegister && password !== confirmPassword) {
//       setPasswordError("密碼不一致");
//       valid = false;
//     } else {
//       setPasswordError("");
//     }

//     return valid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const response = await fetch("http://localhost:3001/register", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (response.status === 200) {
//           setRegisterSuccess(data.message); // 顯示成功訊息
//           setRegisterError(""); // 清掉錯誤訊息
//           setEmail("");
//           setPassword("");
//           setConfirmPassword("");
//         } else {
//           setRegisterSuccess(""); // 清掉成功訊息
//           setRegisterError(data.error); // 顯示錯誤訊息（ex: email 已存在）
//         }
//       } catch (err) {
//         console.error("❌ 註冊失敗：", err);
//         setRegisterSuccess("");
//         setRegisterError("註冊過程中發生錯誤");
//       }
//     }
//   };
//   return (
//     <div className={`container ${isRegister ? "right-panel-active" : ""}`}>
//       {/* 註冊表單 */}

//       <div className="form-container sign-up-container">
//         <form onSubmit={handleSubmit}>
//           <h2>註冊</h2>
//           <input
//             type="email"
//             placeholder="請輸入 email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {registerError && <p className="error-text">{registerError}</p>}
//           {registerSuccess && <p className="success-text">{registerSuccess}</p>}
//           <input
//             type="password"
//             placeholder="請輸入密碼"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="確認密碼"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           {passwordError && <p className="error-text">{passwordError}</p>}
//           <button type="submit">註冊</button>
//           <p className="terms">
//             點擊註冊即表示您已閱讀並同意
//             <br />
//             【本站條款】之會員條款及數據隱私條款
//           </p>
//         </form>
//       </div>

//       {/* 登入表單 */}
//       <div className="form-container sign-in-container">
//         <form onSubmit={handleSubmit}>
//           <h2>會員登入</h2>
//           <input
//             type="email"
//             placeholder="請輸入 email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {emailError && <p className="error-text">{emailError}</p>}
//           <div className="checkbox">
//             <input type="checkbox" id="remember" />
//             <label htmlFor="remember">記住我</label>
//           </div>
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="請輸入密碼"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <span
//               className="eye-icon"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 // 👁‍🗨 閉眼 icon
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.17-5.94M1 1l22 22" />
//                   <path d="M9.5 9.5a3 3 0 0 0 4 4" />
//                 </svg>
//               ) : (
//                 // 👁 睜眼 icon
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                   <circle cx="12" cy="12" r="3" />
//                 </svg>
//               )}
//             </span>
//           </div>
//           {passwordError && <p className="error-text">{passwordError}</p>}
//           <button type="submit">登入</button>
//           <p className="terms">
//             登入後視同您已閱讀並同意
//             <br />
//             【本站條款】之會員條款及數據隱私條款
//           </p>
//           <p className="forgot">忘記密碼</p>
//         </form>
//       </div>

//       {/* 灰色滑動區塊 */}
//       <div className="overlay-container">
//         <div className="overlay">
//           <div className="overlay-panel overlay-left">
//             <button className="ghost" onClick={() => setIsRegister(false)}>
//               登入
//             </button>
//           </div>
//           <div className="overlay-panel overlay-right">
//             <button className="ghost" onClick={() => setIsRegister(true)}>
//               註冊
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;
