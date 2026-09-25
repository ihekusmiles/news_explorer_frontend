import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  newsCards,
  isLoggedIn,
  isSavedNewsPage,
  visibleCount,
  onSaveBtnClick,
  onShowMore,
  onSaveArticle,
  onRemoveArticle,
  savedArticles = [],
}) {
  const visibleCards = newsCards.slice(0, visibleCount);
  // Checking if there are more cards remaining to display
  const hasMoreCards = visibleCount < newsCards.length;

  return (
    <>
      <div className="newsCardList__layout">
        {/* Rendering search results only on home page */}
        {!isSavedNewsPage && (
          <p className="newsCardList__title">Search results</p>
        )}
        {/* Only render the visibleCards */}
        <ul className="newsCardList__cards-container">
          {visibleCards.map((article, index) => (
            // Using a fallback pattern in key; in this case article.url will always be unique
            <li key={article.url || index} className="newsCardList__item">
              <NewsCard
                article={article}
                isSavedNewsPage={isSavedNewsPage}
                isLoggedIn={isLoggedIn}
                onSaveArticle={onSaveArticle}
                onRemoveArticle={onRemoveArticle}
                openLoginModal={onSaveBtnClick}
                savedArticles={savedArticles}
              />
            </li>
          ))}
        </ul>
        {/* If hasMoreCards then show button */}
        {hasMoreCards && (
          <button
            type="button"
            className="newsCardList__show-more-btn"
            onClick={onShowMore}
          >
            Show more
          </button>
        )}
      </div>
    </>
  );
}

export default NewsCardList;
