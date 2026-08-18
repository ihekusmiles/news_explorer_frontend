function NewsCard() {
  return (
    <div className="newsCard">
      <div className="newsCard__image-content">
        <img
          src="../../src/assets/images/news-image.jpeg"
          alt="News article image"
          className="newsCard__image"
        />
        <p className="newsCard__image-keyword">Nature</p>
        <button className="newsCard__delete-btn">
          <span className="newsCard__delete-img" />
        </button>
      </div>

      <div className="newsCard__content">
        <p className="newsCard__date">November 4, 2020</p>
        <p className="newsCard__heading">
          Everyone Needs a Special 'Sit Spot' in Nature
        </p>
        <p className="newsCard__text">
          Ever since I read Richard Louv's influential book, "Last Child in the
          Woods," the idea of having a special "sit spot" has stuck with me.
          This advice, which Louv attributes to nature educator Jon Young, is
          for both adults and children to find...
        </p>
        <p className="newsCard__source">treehugger</p>
      </div>
    </div>
  );
}

export default NewsCard;
