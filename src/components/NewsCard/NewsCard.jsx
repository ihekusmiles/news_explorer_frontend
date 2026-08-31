function NewsCard({ article }) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="newsCard">
      <div className="newsCard__image-content">
        <img
          src={article.urlToImage}
          alt="News article image"
          className="newsCard__image"
        />
        <p className="newsCard__image-keyword">{article.keyword}</p>
        <button className="newsCard__delete-btn">
          <span className="newsCard__delete-img" />
        </button>
      </div>

      <div className="newsCard__content">
        <p className="newsCard__date">{formattedDate}</p>
        <p className="newsCard__heading">{article.title}</p>
        <p className="newsCard__text">{article.content}</p>
        <p className="newsCard__source">{article.source.name}</p>
      </div>
    </div>
  );
}

export default NewsCard;
