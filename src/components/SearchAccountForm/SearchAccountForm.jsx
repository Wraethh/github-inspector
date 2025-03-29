export default function SearchAccountForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
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
