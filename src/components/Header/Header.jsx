import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ isLoggedIn, handleLoginBtnClick, handleLogOutBtnClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  // Get ahold of current user's username
  const getCurrentUserName = () => {
    return currentUser && currentUser.username ? currentUser.username : "";
  };

  return (
    <div className={`header ${isSavedNews ? "header_theme_light" : ""}`}>
      <Link
        to="/"
        className={`header__logo ${isSavedNews ? "header_text_dark" : ""}`}
      >
        NewsExplorer
      </Link>

      <div className="header__buttons">
        <Navigation isLoggedIn={isLoggedIn} isSavedNews={isSavedNews} />
        {/* Conditionally rendering Sign In vs user Log Out button */}
        {isLoggedIn ? (
          <button
            className={`header__logout-btn ${isSavedNews ? "header_text_dark" : ""}`}
            onClick={handleLogOutBtnClick}
          >
            {getCurrentUserName()}
            <span
              className={`header__logout-icon ${!isSavedNews ? "header__logout-white-icon" : ""}`}
            />
          </button>
        ) : (
          <button
            className="header__signin-btn"
            type="button"
            onClick={handleLoginBtnClick}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
