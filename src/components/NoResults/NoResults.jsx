function NoResults() {
  return (
    <>
      <div className="noResults__container">
        <img
          src="../../src/assets/not_found.svg"
          alt="Nothing found"
          className="noResults__img"
        />
        <p className="noResults__text">Nothing found</p>
        <p className="noResults__subtext">
          Sorry, but nothing matched your search terms.
        </p>
      </div>
    </>
  );
}

export default NoResults;
