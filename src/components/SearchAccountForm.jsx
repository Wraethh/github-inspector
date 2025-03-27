export default function SearchAccountForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        aria-label="searchbar"
        placeholder="DJK_Fifou"
      />
      <button>Rechercher</button>
    </form>
  );
}
