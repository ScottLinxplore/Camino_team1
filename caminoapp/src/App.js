import Button from "./components/Button";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>按鈕測試區</h1>
      <Button text="返回" onClick={() => alert("按到返回了")} />
      <Button text="下一步" onClick={() => alert("按到下一步了")} />
    </div>
  );
}

export default App;
