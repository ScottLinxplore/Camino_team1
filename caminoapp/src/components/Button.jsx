import React from "react";
import "./Button.css";

function Button({ text, onClick }) {
  return (
    <>
      <button onClick={onClick} className="button">
        {text}
      </button>
    </>
  );
}
export default Button;

// 使用方式: 請在App.js直接複製以下內容

// import Button from './components/Button';

// function App() {
//   return (
//     <div>
//       <Button text="返回" onClick={() => console.log('返回')} />
//       <Button text="下一步" onClick={() => console.log('下一步')} />
//     </div>
//   );
// }
