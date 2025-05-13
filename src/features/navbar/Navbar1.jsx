import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  let [hoverlogin, setHoverLogin] = useState(false)
  let [hoverRegister, setHoverRegister] = useState(false)
    const navigate = useNavigate();
    function Routes() {
    navigate("/Login");
  }

  return (
    <>
      <nav
      style={{
        color:"black",
        position: "fixed",
        top: "10px",
        left: "20px",
        display: "flex",
        gap: "10px",
        zIndex: 1000,
      }}
      >
        logo
      </nav>

      <nav
        style={{
          position: "fixed",
          top: "10px",
          right: "20px",
          display: "flex",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        <span  onClick={Routes}
          style={{
            color: hoverlogin ? "gray" : "black",
            cursor:'pointer'
          }}
          onMouseEnter={() => setHoverLogin(true)}
          onMouseLeave={() => setHoverLogin(false)}
        >登入</span> 
        
        <span style={{color:"white"}}>|</span>

        <span
          style={{
            color: hoverRegister ? "gray" : "black",
          }}
          onMouseEnter={() => setHoverRegister(true)}
          onMouseLeave={() => setHoverRegister(false)}
        >註冊</span>
      </nav>
    </>
  );
}
