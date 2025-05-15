//判斷當前是登入還是註冊介面
import React from "react";

//setIsRegister = 控制登入或註冊畫面
const OverlayPanel = ({ setIsRegister }) => {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <button className="ghost" onClick={() => setIsRegister(false)}>
            登入
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <button className="ghost" onClick={() => setIsRegister(true)}>
            註冊
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlayPanel;
