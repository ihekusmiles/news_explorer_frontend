import { useState } from "react";

function NewsCard({
  article,
  isSavedNewsPage,
  isLoggedIn,
  onSaveArticle,
  onRemoveArticle,
}) {
  // Tracking saved state locally in the card
  const [isSaved, setIsSaved] = useState(false);
  // Function to truncate long text
  const truncatedText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "";
    }
    return text;
  };

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
  // Prevent link nagivation when clicking save buttons
  const handleSaveClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    onSaveArticle(article);
    // Toggling saved state (false to true, true to false)
    setIsSaved((prevState) => !prevState);
  };

  const handleRemoveClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    onRemoveArticle(article);
  };
  return (
    <a href={article.url} className="newsCard__url">
      {" "}
      <div className="newsCard">
        <div className="newsCard__image-content">
          <img
            src={article.urlToImage}
            alt="News article image"
            className="newsCard__image"
          />
          <p className="newsCard__image-keyword">{article.keyword}</p>
          {/* conditionally render delete btn depending on whether or not user is logged in */}

          <div className="newsCard__btn-container">
            {/* Show pop up if on saved news page OR if user is NOT logged in on main page */}
            {(isSavedNewsPage || !isLoggedIn) && (
              <button className="newsCard__btn-popup">
                {isSavedNewsPage
                  ? "Remove from saved"
                  : "Sign in to save article"}
              </button>
            )}

            {isSavedNewsPage ? (
              <button
                type="button"
                className="newsCard__btn"
                onClick={handleRemoveClick}
              >
                <span className="newsCard__img newsCard__delete-btn-url" />
              </button>
            ) : (
              <button
                type="button"
                className={`newsCard__btn ${isLoggedIn ? "newsCard__btn-enabled" : "newsCard__btn-disabled"}`}
                onClick={
                  isLoggedIn ? handleSaveClick : (evt) => evt.preventDefault()
                }
              >
                {/* Dynamically apply active class based on isSaved */}
                <span
                  className={`newsCard__img newsCard__save-btn-url ${isSaved ? "newsCard__save-btn-marked" : ""} `}
                />
              </button>
            )}
          </div>
        </div>

        <div className="newsCard__content">
          <p className="newsCard__date">{formattedDate}</p>
          <p className="newsCard__heading">
            {truncatedText(article.title, 40)}
          </p>
          <p className="newsCard__text">
            {truncatedText(article.content, 200)}
          </p>
          <p className="newsCard__source">{article.source.name}</p>
        </div>
      </div>
    </a>
  );
}

export default NewsCard;
