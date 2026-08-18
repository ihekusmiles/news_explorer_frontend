import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header({ isLoggedIn }) {
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

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
          >
            Elise
            <span className="header__logout-icon" />
          </button>
        ) : (
          <button className="header__signin-btn">Sign in</button>
        )}
      </div>
    </div>
  );
}

export default Header;
