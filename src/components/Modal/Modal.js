import css from "./Modal.module.css";

export default function Modal({ image, closeModal }) {
  return (
    <div className={css.Overlay} onClick={closeModal} name="overlay">
      <div className={css.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
}
