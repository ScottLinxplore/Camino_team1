//驗證email

import React, { useEffect, useState } from "react";

const VerifyPage = () => {
  const [status, setStatus] = useState("驗證中...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    fetch(`http://localhost:3001/verify?token=${token}`)
      .then((res) => res.text())
      .then((msg) => setStatus(msg))
      .catch((err) => {
        console.error(err);
        setStatus("❌ 驗證失敗，請稍後再試");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{status}</h2>
      <a href="/login">返回登入頁</a>
    </div>
  );
};

export default VerifyPage;
