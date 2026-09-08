function SavedNewsHeader({ currentUser }) {
  return (
    <>
      <div className="savedNewsHeader">
        {" "}
        <p className="savedNewsHeader__content-title">Saved articles</p>
        <p className="savedNewsHeader__content-text">
          {`${currentUser.username}, you have 5 saved`}
          <span className="savedNewsHeader__text-break-line">articles</span>
        </p>
        <p className="savedNewsHeader__keywords">
          By keywords: <b>Nature, Yellowstone, and 2 other</b>
        </p>
      </div>
    </>
  );
}

export default SavedNewsHeader;
