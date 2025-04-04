import { useEffect, useRef, useState } from "react";
import styles from "./SearchAccountForm.module.css";
import useResizeObserver from "../../hooks/useResizeObserver";

export default function SearchAccountForm({ handleSubmit }) {
  const [inputEmpty, setInputEmpty] = useState(true);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonWidth = useResizeObserver(buttonRef, "width");

  let timeoutId = null;
  const resetInputWithStyle = () => {
    const inputValue = inputRef.current.value;
    if (inputValue) {
      inputRef.current.value = inputValue.slice(0, inputValue.length - 1);
      return (timeoutId = setTimeout(() => {
        resetInputWithStyle();
      }, 30));
    }
    setInputEmpty(true);
    inputRef.current.focus();
  };

  useEffect(() => {
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.searchBarWrapper}>
        <input
          type="text"
          name="search"
          ref={inputRef}
          aria-label="searchbar"
          placeholder="DJKFifou"
          onChange={(e) => setInputEmpty(!e.target.value)}
        />
        {!inputEmpty && (
          <button
            type="button"
            aria-label="Erase"
            title="Erase"
            className={styles.eraseBtn}
            onClick={resetInputWithStyle}
          >
            ×
          </button>
        )}
      </div>
      <button
        type="submit"
        aria-label="Search"
        ref={buttonRef}
        className={styles.searchBtn}
        onMouseUp={(e) => e.target.blur()}
      >
        {buttonWidth > 40 ? "Search" : ""}
        <div
          className={styles.searchIcon}
          onMouseUp={(e) => e.target.parentElement.blur()}
        ></div>
      </button>
    </form>
  );
}
