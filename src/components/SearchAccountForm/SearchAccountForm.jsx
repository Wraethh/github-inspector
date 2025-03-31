import styles from "./SearchAccountForm.module.css";

export default function SearchAccountForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="search"
        aria-label="searchbar"
        placeholder="DJKFifou"
      />
      <button>Rechercher</button>
    </form>
  );
}
