import style from "./PhotoGrid.module.css";

export default function PhotoGrid({ images }) {
  return (
    <div className={style["photo-grid"]}>
      <div className={style["main-image"]}>
        <img src={images[0]} alt="Main" />
      </div>
      <div className={style["side-images"]}>
        <img className={style["side-images-first"]} src={images[1]} alt="side" />
        <img className={style["side-images-second"]} src={images[2]} alt="side" />
      </div>
      <div className={style["side-column"]}>
        <img className={style["side-images-second"]} src={images[3]} alt="side" />
        <img className={style["side-images-first"]} src={images[4]} alt="side" />
      </div>
    </div>
  );
}
