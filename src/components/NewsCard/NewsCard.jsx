// Import delete and save button images
import deleteButton from "../../assets/delete-btn.svg";
import deleteButton_hover from "../../assets/delete-btn-hover.svg";
import saveButton from "../../assets/save-btn.svg";
import saveButton_hover from "../../assets/save-btn-hover.svg";
import saveButton_marked from "../../assets/save-btn-marked.svg";

function NewsCard({ article }) {
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
            <button className="newsCard__btn-popup">
              Sign in to save articles
            </button>
            <button className="newsCard__save-btn">
              <span className="newsCard__save-img" />
            </button>
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
