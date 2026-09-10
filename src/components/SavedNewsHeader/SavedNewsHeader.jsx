function SavedNewsHeader({ currentUser, savedArticles }) {
  // Extracting non-empty unique keywords
  const uniqueKeywords = Array.from(
    new Set(savedArticles.map((article) => article.keyword).filter(Boolean)),
  );
  // Formatting keyword string dynamically based on array length
  const formatKeywords = () => {
    const total = uniqueKeywords.length;

    if (total === 0) return "None";
    if (total === 1) return uniqueKeywords[0];
    if (total === 2) return `${uniqueKeywords[0]} and ${uniqueKeywords[1]}`;
    if (total === 3)
      return `${uniqueKeywords[0]}, ${uniqueKeywords[1]}, and ${uniqueKeywords[2]}`;
    // For 4 or more keywords; show first 2 + remaining count
    const [first, second] = uniqueKeywords;
    const remainingCount = total - 2;
    return `${first}, ${second}, and ${remainingCount} other`;
  };

  // Formatting singular vs plural 'artitle' word
  const articleText = savedArticles.length === 1 ? "article" : "articles";

  return (
    <>
      <div className="savedNewsHeader">
        {" "}
        <p className="savedNewsHeader__content-title">Saved articles</p>
        <p className="savedNewsHeader__content-text">
          {`${currentUser.username || "User"}, you have ${savedArticles.length} saved`}
          <span className="savedNewsHeader__text-break-line">
            {articleText}
          </span>
        </p>
        <p className="savedNewsHeader__keywords">
          By keywords: <b>{formatKeywords()}</b>
        </p>
      </div>
    </>
  );
}

export default SavedNewsHeader;
