import { useRef } from "react";
import styles from "./SearchAccountForm.module.css";
import useResizeObserver from "../../hooks/useResizeObserver";

export default function SearchAccountForm({ handleSubmit }) {
  const buttonRef = useRef(null);
  const buttonWidth = useResizeObserver(buttonRef, "width");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="search"
        aria-label="searchbar"
        placeholder="DJKFifou"
      />
      <button aria-label="search" ref={buttonRef}>
        {buttonWidth > 40 ? "Rechercher" : ""}
        <div className={styles.searchIcon}></div>
      </button>
    </form>
  );
}
