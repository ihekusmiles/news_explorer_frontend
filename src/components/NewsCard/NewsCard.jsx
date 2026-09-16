function NewsCard({
  article,
  isSavedNewsPage,
  isLoggedIn,
  onSaveArticle,
  onRemoveArticle,
  openLoginModal,
  savedArticles,
}) {
  // Format date to match required date format
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  // Helper function to strip away HTML tags from string text
  const cleanText = (text) => {
    if (!text) return "";
    return text
      .replace(/<[^>]*>/g, "") // Removes all HTML tags like <ul>, <li>, </li>
      .replace(/\s+/g, " ") // Replaces multiple white spaces/newlines with a single space
      .replace(/\[\+\d+ chars\]/g, "") // Removes [+ chars]
      .trim();
  };

  // Checking saved status dynamically
  const isSaved = savedArticles.some((item) => item.url === article.url);

  // Prevent link nagivation when clicking save buttons
  const handleSaveClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    // Toggling saved state depending on whether it's currently saved
    if (isSaved) {
      onRemoveArticle(article);
    } else {
      onSaveArticle(article);
    }
  };

  // Handling remove click
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
                onClick={isLoggedIn ? handleSaveClick : openLoginModal}
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
          <p className="newsCard__heading">{article.title}</p>
          <p className="newsCard__text">{cleanText(article.content)}</p>
          <p className="newsCard__source">
            {article.source?.name || article.source}
          </p>
        </div>
      </div>
    </a>
  );
}

export default NewsCard;
