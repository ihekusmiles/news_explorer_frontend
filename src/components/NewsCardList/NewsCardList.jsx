import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ newsCards, isLoggedIn, isSavedNewsPage }) {
  return (
    <>
      <div className="newsCardList__layout">
        {/* Render search results only on home page */}
        {isLoggedIn && !isSavedNewsPage && (
          <p className="newsCardList__title">Search results</p>
        )}
        <div className="newsCardList__cards-container">
          {newsCards.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}

export default NewsCardList;
