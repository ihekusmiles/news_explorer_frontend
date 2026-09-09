import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  newsCards,
  isLoggedIn,
  isSavedNewsPage,
  visibleCount,
  onShowMore,
  onSaveArticle,
  onRemoveArticle
}) {
  const visibleCards = newsCards.slice(0, visibleCount);
  // check if there are more cards remaining to display
  const hasMoreCards = visibleCount < newsCards.length;

  return (
    <>
      <div className="newsCardList__layout">
        {/* Render search results only on home page */}
        {isLoggedIn && !isSavedNewsPage && (
          <p className="newsCardList__title">Search results</p>
        )}
        {/* Only render the visibleCards */}
        <div className="newsCardList__cards-container">
          {visibleCards.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              isSavedNewsPage={isSavedNewsPage}
              isLoggedIn={isLoggedIn}
              onSaveArticle={onSaveArticle}
              onRemoveArticle={onRemoveArticle}
            />
          ))}
        </div>
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
