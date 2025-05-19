const express = require("express");
const router = express.Router();
const crypto = require("crypto");
require("dotenv").config();
const ecpay_payment = require("ecpay_aio_nodejs");

// 從 .env 環境變數讀取綠界金鑰
const { MERCHANTID, HASHKEY, HASHIV } = process.env;

const options = {
  OperationMode: "Test", // 或 "Production"
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
  },
  IgnorePayment: [],
  IsProjectContractor: false,
};

//建立付款頁（由前端傳 totalAmount）
router.post("/create-payment", (req, res) => {
  console.log("✅ 收到建立交易請求");

  const { totalAmount } = req.body;

  const MerchantTradeDate = new Date().toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Taipei",
  });

  const TradeNo = "TEST" + new Date().getTime();

  const base_param = {
    MerchantTradeNo: TradeNo,
    MerchantTradeDate,
    TotalAmount: String(totalAmount || 2000),
    TradeDesc: "旅遊套裝行程",
    ItemName: "法國之路",
    ReturnURL: "https://你的公開網址/ecpay/notify", // ✅ 綠界背景通知
    ClientBackURL: "http://localhost:5173/page1", // ✅ 用戶完成交易返回
    CustomField1: "法國之路",
  };

  console.log("🧾 建立交易參數：", JSON.stringify(base_param, null, 2));

  const create = new ecpay_payment(options);
  const html = create.payment_client.aio_check_out_all(base_param);

  res.send(html);
});

// ✅ 綠界背景通知（不會跳頁）
router.post("/ecpay/notify", (req, res) => {
  console.log("📩 綠界背景通知資料：", req.body);

  const { CheckMacValue } = req.body;
  const data = { ...req.body };
  delete data.CheckMacValue;

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

  const isValid = CheckMacValue === checkValue;
  console.log("🔐 CheckMacValue 驗證：", isValid ? "✅ 正確" : "❌ 錯誤");

  res.send("1|OK"); // 告訴綠界成功接收
});

// ✅ 客戶付款完成回來
router.get("/clientReturn", (req, res) => {
  console.log("🌐 客戶付款完成回來：", req.query);
  res.render("return", { query: req.query }); // 可自訂 view，或改成 redirect
});

module.exports = router;
