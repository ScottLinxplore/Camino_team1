import style from "./PassengerForm.module.css";

export default function PassengerForm() {
  return (
    <div className={style["form-passenger"]}>
      <h3 className={style["from-title"]}>
        旅客資料<div className={style["from-div"]}></div>
      </h3>

      <div className={style["from-name"]}>
        <div className={style["form-column"]}>
          <label>姓氏</label>
          <input type="text" className={style["form-inp"]} name="" id="" />
        </div>
        <div className={style["form-column"]}>
          <label>名字</label>
          <input type="text" className={style["form-inp"]} name="" id="" />
        </div>
      </div>
      <div className={style["from-gender"]}>
        <div className={style["form-column"]}>
          <label>性別</label>
          <div className={style["form-row"]}>
            <div>
              <label>
                <input type="radio" name="" id="" />男
              </label>
            </div>
            <div>
              <label>
                <input type="radio" name="" id="" />女
              </label>
            </div>
          </div>
        </div>
        <div className={style["form-column"]}>
          <label>出生日期</label>
          <input type="date" className={style.inp} name="" id="" />
        </div>
      </div>
      <div className={style["from-passport"]}>
        <div className={style["form-column"]}>
          <label>護照其他證件號碼</label>
          <input type="text" className={style["form-inp"]} name="" id="" />
        </div>
        <div className={style["form-column"]}>
          <label>有效日期</label>
          <input type="date" className={style.inp} name="" id="" />
        </div>
        <div className={style["form-column"]}>
          <label>護照國家/地區</label>
          <input type="text" className={style["form-inp"]} name="" id="" />
        </div>
      </div>
    </div>
  );
}
