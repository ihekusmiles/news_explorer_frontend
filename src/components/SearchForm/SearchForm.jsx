function SearchForm() {
  return (
    <search>
      <form
        className="searchform__container"
        action="/search-results"
        method="GET"
      >
        <input
          className="searchform__input"
          type="search"
          id="site-search"
          name="q"
          placeholder="Enter topic"
        />
        <button className="searchform__btn">Search</button>
      </form>
    </search>
  );
}

export default SearchForm;
