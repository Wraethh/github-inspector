import styles from "./SearchAccountForm.module.css";
import useScreenWidth from "../../hooks/useScreenWidth";

export default function SearchAccountForm({ handleSubmit }) {
  const screenWidth = useScreenWidth();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="search"
        aria-label="searchbar"
        placeholder="DJKFifou"
      />
      <button aria-label="search">
        {screenWidth <= 1024 ? "Rechercher" : ""}
        <div className={styles.searchIcon}></div>
      </button>
    </form>
  );
}
