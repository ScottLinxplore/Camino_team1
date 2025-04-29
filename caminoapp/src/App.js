import Button from "./components/Button";
import HeaderBanner from "./components/HeaderBanner";

// 共用元件測試區

function App() {
  return (
    <div>
      <h1>按鈕測試區</h1>
      <Button text="返回" onClick={() => alert("按到返回了")} />
      <Button text="下一步" onClick={() => alert("按到下一步了")} />{" "}
      {/* 商品頁面 */}
      <ProductPage />
    </div>
  );
}
<hr />;
function ProductPage() {
  return (
    <div>
      <HeaderBanner title="商品頁面" />
      {/* 以下是商品內容 */}
    </div>
  );
}

export default App;
