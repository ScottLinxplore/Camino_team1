import React from "react";
import style from "./PassengerForm.module.css";
// -----------------------------整頁改------------------------------------------
// -----------------------------整頁改------------------------------------------
// -----------------------------整頁改------------------------------------------
export default function PassengerForm({ formData, setFormData }) {
  const mockUserData = {
    lastName: "金",
    firstName: "田二",
    gender: "男",
    birthDate: "1995-08-05",
    passport: "E123456789",
    passportExpiry: "2030-08-01",
    country: "Taiwan",
    email: "scott@example.com",
    number: "886",
    phone: "0912345678",
    emergencyName: "媽媽",
    emergencyRelation: "parent",
    emergencyPhone: "0987654321",
  };

  return (
    <div className={style["form-passenger"]}>
      <h3 className={style["from-title"]}>
        旅客資料{" "}
        <button
          className={style["from-but"]}
          onClick={() => {
            setFormData(mockUserData);
          }}
        >
          {" "}
          一鍵填入資料
        </button>
        <div className={style["from-div"]}></div>
      </h3>
      {/* {" "}
        一鍵填入會員資料{" "} */}
      {/* 姓氏、名字 */}
      <div className={style["from-name"]}>
        <div className={style["form-column"]}>
          <label>姓氏</label>
          <input
            type="text"
            className={style["form-inp"]}
            name="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
        <div className={style["form-column"]}>
          <label>名字</label>
          <input
            type="text"
            className={style["form-inp"]}
            name="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>
      </div>

      {/* 性別與出生日期 */}
      <div className={style["from-gender"]}>
        <div className={style["form-column"]}>
          <label>性別</label>
          <div className={style["form-row"]}>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="男"
                  checked={formData.gender === "男"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                男
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="女"
                  checked={formData.gender === "女"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                女
              </label>
            </div>
          </div>
        </div>
        <div className={style["form-column"]}>
          <label>出生日期</label>
          <input
            type="date"
            className={style.inp}
            name="birthDate"
            value={formData.birthDate}
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
          />
        </div>
      </div>

      {/* 護照、有效日期、護照國家/地區 */}
      <div className={style["from-passport"]}>
        <div className={style["form-column"]}>
          <label>護照其他證件號碼</label>
          <input
            type="text"
            className={style["form-inp"]}
            name="passport"
            value={formData.passport}
            onChange={(e) =>
              setFormData({ ...formData, passport: e.target.value })
            }
          />
        </div>
        <div className={style["form-column"]}>
          <label>有效日期</label>
          <input
            type="date"
            className={style.inp}
            name="passportExpiry"
            value={formData.passportExpiry}
            onChange={(e) =>
              setFormData({ ...formData, passportExpiry: e.target.value })
            }
          />
        </div>
        <div className={style["form-column"]}>
          <label>護照國家/地區</label>
          <input
            type="text"
            className={style["form-inp"]}
            name="country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
