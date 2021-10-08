import css from "./Button.module.css";

export default function Button({ text, onLoadMoreClick }) {
  return (
    <button type="button" className={css.Button} onClick={onLoadMoreClick}>
      {text}
    </button>
  );
}
