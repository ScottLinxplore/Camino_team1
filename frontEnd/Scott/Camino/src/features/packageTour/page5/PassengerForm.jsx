import React, { useState } from "react";

const PaymentTabs = () => {
  const [activeTab, setActiveTab] = useState("web-atm");
  const [selectedBank, setSelectedBank] = useState("");

  const tabList = [
    { id: "credit-card", label: "信用卡 Credit Card" },
    { id: "web-atm", label: "網路ATM" },
    { id: "atm", label: "ATM櫃員機" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "credit-card":
        return (
          <>
            <label htmlFor="bank">選擇卡別</label>
            <select
              id="bank"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              style={{ margin: "0.5rem 0", padding: "6px 12px" }}
            >
              <option value="">請選擇卡別</option>
              <option value="004">VISA</option>
              <option value="005">MASTER</option>
              <option value="822">JCB</option>
            </select>
            {selectedBank === "" && (
              <div style={{ color: "red" }}>請選擇卡別</div>
            )}
            <div style={{ fontSize: "14px", marginTop: "1rem" }}>
              <p>● 支援多家發卡銀行之 VISA / MasterCard / JCB 信用卡付款。</p>
              <p>● 即時付款、快速確認，付款成功後將立即完成訂單處理。</p>
              <p style={{ color: "red" }}>
                ● 為保障交易安全，部分銀行將發送簡訊驗證碼。
              </p>
            </div>
          </>
        );
      case "web-atm":
        return (
          <>
            <label htmlFor="bank">選擇銀行</label>
            <select
              id="bank"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              style={{ margin: "0.5rem 0", padding: "6px 12px" }}
            >
              <option value="">請選擇銀行</option>
              <option value="004">台灣銀行</option>
              <option value="005">土地銀行</option>
              <option value="822">中國信託</option>
              <option value="808">玉山銀行</option>
            </select>
            {selectedBank === "" && (
              <div style={{ color: "red" }}>請選擇銀行</div>
            )}
            <div style={{ fontSize: "14px", marginTop: "1rem" }}>
              <p>● 選擇以上任一銀行，並使用該行 WebATM 可享 0 元手續費。</p>
              <p style={{ color: "red" }}>
                ● 使用他行 WebATM 則需支付跨行手續費 15 元。
              </p>
              <p>● 例如：玉山卡轉玉山 WebATM 0 元，轉非玉山則收 15 元／筆。</p>
            </div>
          </>
        );

      case "atm":
        return (
          <>
            <label htmlFor="bank">選擇銀行</label>
            <select
              id="bank"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              style={{ margin: "0.5rem 0", padding: "6px 12px" }}
            >
              <option value="">請選擇銀行</option>
              <option value="004">台灣銀行</option>
              <option value="005">土地銀行</option>
              <option value="822">中國信託</option>
              <option value="808">玉山銀行</option>
            </select>
            {selectedBank === "" && (
              <div style={{ color: "red" }}>請選擇銀行</div>
            )}
            <div style={{ fontSize: "14px", marginTop: "1rem" }}>
              <p>● 選擇以上任一銀行，並使用該行 WebATM 可享 0 元手續費。</p>
              <p style={{ color: "red" }}>
                ● 使用他行 WebATM 則需支付跨行手續費 15 元。
              </p>
              <p>● 例如：玉山卡轉玉山 WebATM 0 元，轉非玉山則收 15 元／筆。</p>
            </div>
          </>
        );
    }
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "0 auto",
        padding: "24px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>付款方式 Payment</h2>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        {tabList.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "6px 12px",
              backgroundColor: activeTab === tab.id ? "#444" : "#f1f1f1",
              color: activeTab === tab.id ? "#fff" : "#000",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{renderContent()}</div>

      {/* <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          style={{
            padding: "8px 24px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          前往付款
        </button>
      </div> */}
    </div>
  );
};

export default PaymentTabs;

// import style from "./PassengerForm.module.css";
// import React, { useState } from "react";

// export default function PassengerForm() {
//   const [selectedOption, setSelectedOption] = useState("");
//   return (
//     <div className={style["card-passenger"]}>
//       <h3 className={style["card-title"]}>
//         付款方式<div className={style["from-div"]}></div>
//       </h3>

//       {/* 選項 1：信用卡 */}
//       <div>
//         <label>
//           <input
//             type="radio"
//             name="payment"
//             value="credit-card"
//             checked={selectedOption === "credit-card"}
//             onChange={(e) => setSelectedOption(e.target.value)}
//           />
//           信用卡
//         </label>

//         {selectedOption === "credit-card" && (
//           <select>
//             <option value="">請選擇卡別</option>
//             <option value="visa">VISA</option>
//             <option value="master">MasterCard</option>
//             <option value="jcb">JCB</option>
//           </select>
//         )}
//       </div>

//       {/* 選項 2：LINE Pay */}
//       <div>
//         <label>
//           <input
//             type="radio"
//             name="payment"
//             value="line-pay"
//             checked={selectedOption === "line-pay"}
//             onChange={(e) => setSelectedOption(e.target.value)}
//           />
//           LINE Pay
//         </label>

//         {selectedOption === "line-pay" && (
//           <select>
//             <option value="">請選擇帳號</option>
//             <option value="line1">LINE 帳號 A</option>
//             <option value="line2">LINE 帳號 B</option>
//           </select>
//         )}
//       </div>

//       {/* 選項 3：ATM 轉帳 */}
//       <div>
//         <label>
//           <input
//             type="radio"
//             name="payment"
//             value="atm"
//             checked={selectedOption === "atm"}
//             onChange={(e) => setSelectedOption(e.target.value)}
//           />
//           ATM 轉帳
//         </label>

//         {selectedOption === "atm" && (
//           <select>
//             <option value="">請選擇銀行</option>
//             <option value="004">台灣銀行</option>
//             <option value="005">土地銀行</option>
//           </select>
//         )}
//       </div>

//       {/* 選項 4：現場付款 */}
//       <div>
//         <label>
//           <input
//             type="radio"
//             name="payment"
//             value="cash"
//             checked={selectedOption === "cash"}
//             onChange={(e) => setSelectedOption(e.target.value)}
//           />
//           現場付款
//         </label>

//         {selectedOption === "cash" && (
//           <div style={{ marginTop: "0.5rem", color: "#555" }}>
//             請於活動當天至櫃檯繳費。
//           </div>
//         )}
//       </div>

//       <div className={style["card-payment"]}>
//         <div>
//           <div className={style["card-column"]}>
//             <label className={style["card-label"]}>付款方式</label>
//             <select name="" id="" className={style["card-inp"]}>
//               <option value="">請選擇</option>
//               <option value="">信用卡</option>
//               <option value="">ATM轉帳</option>
//             </select>
//           </div>

//           <div className={style["card-column"]}>
//             <label className={style["card-label"]}>持卡者姓名</label>
//             <input type="text" className={style["card-inp"]} name="" id="" />
//           </div>

//           <div className={style["card-column"]}>
//             <label className={style["card-label"]}>信用卡卡號</label>
//             <input type="text" className={style["card-inp"]} name="" id="" />
//           </div>
//           <div className={style["card-row"]}>
//             <div className={style["card-column"]}>
//               <label className={style["card-label"]}>有效期至</label>
//               <input type="text" className={style["card-inp"]} name="" id="" />
//             </div>
//             <div className={style["card-column"]}>
//               <label className={style["card-label"]}>CVC/CVV代碼</label>
//               <input type="text" className={style["card-inp"]} name="" id="" />
//             </div>
//           </div>
//         </div>
//         <div>
//           <img
//             className={style["card-img"]}
//             src="./project/cred-crd.jpg"
//             alt=""
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
