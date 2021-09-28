import css from "./Button.module.css";

const Button = ({text, onLoadMoreClick}) => {
    return (
        <button type="button" className={css.Button} onClick={onLoadMoreClick}>{text}</button>
    )
};

export default Button;