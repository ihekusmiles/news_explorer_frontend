import notFoundIcon from "../../assets/not_found.svg";

function NoResults({
  title = "Nothing found",
  subtitle = "Sorry, but nothing matched your search terms.",
}) {
  return (
    <>
      <div className="noResults__container">
        <img
          src={notFoundIcon}
          alt="Nothing found"
          className="noResults__img"
        />
        <p className="noResults__text">{title}</p>
        <p className="noResults__subtext">{subtitle}</p>
      </div>
    </>
  );
}

export default NoResults;
