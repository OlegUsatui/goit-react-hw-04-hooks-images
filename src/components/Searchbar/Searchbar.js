import { useState } from "react";
import { toast } from "react-toastify";
import css from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [qwery, setQwery] = useState("");

  const handleChange = (e) => {
    setQwery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (qwery.trim() === "") {
      toast.error("Введите что нибудь");
      return;
    }

    onSubmit(qwery);
    setQwery("");
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          value={qwery}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
