import css from "./SearchBar.module.css";

interface SearchBarProps {
  sendQuery: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ sendQuery }) => {
  return (
    <>
      <header className={css.SearchBarHeader}>
        <form className={css.SearchForm} onSubmit={sendQuery}>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos..."
            name="searchInput"
          />
          <button className={css.SearchFormButton} type="submit">
            Search
          </button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
