import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Menu hamburger icons
import menu_white from "../../assets/menu.svg";
import menu_black from "../../assets/menu_black.svg";
// Close buttons
import closeIcon_white from "../../assets/small_close-btn.svg";
import closeIcon_black from "../../assets/small_close-btn-dark.svg";
// Log out buttons
import logoutIcon_white from "../../assets/logout_white.svg";
import logoutIcon_black from "../../assets/logout_black.svg";

function Header({
  isLoggedIn,
  handleLoginBtnClick,
  handleLogOutBtnClick,
  activeModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  // Tracking 'opened' state of menu
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };
  // Getting a users name/username
  const getCurrentUserName = () => {
    return currentUser && currentUser.username ? currentUser.username : "";
  };

  return (
    <header
      className={`header ${isSavedNews ? "header_theme_light" : ""} ${isMobileMenuOpened ? "header_menu-opened" : ""}`}
    >
      <Link
        to="/"
        className={`header__logo ${isSavedNews ? "header_text_dark" : ""}`}
      >
        NewsExplorer
      </Link>

      {/* HAMBURGER / CLOSE TOGGLE BUTTON */}

      <button
        className={`header__menu-btn ${activeModal ? "header__menu-btn_hidden" : ""}`}
        type="button"
        onClick={toggleMobileMenu}
      >
        <img
          src={
            isSavedNews
              ? isMobileMenuOpened
                ? closeIcon_black
                : menu_black
              : isMobileMenuOpened
                ? closeIcon_white
                : menu_white
          }
          alt="Menu toggle button"
          className="header__menu-icon"
        />
      </button>

      {/* MOBILE DROPDOWN MENU OVERLAY */}
      <div
        className={`header__mobile-menu ${isMobileMenuOpened ? "header__mobile-menu_opened" : ""}`}
      >
        <div className="header__buttons header__mobile-content">
          <Navigation isLoggedIn={isLoggedIn} isSavedNews={isSavedNews} />
          {/* Conditionally rendering Sign In vs user Log Out button */}
          {isLoggedIn ? (
            <button
              className={`header__logout-btn ${isSavedNews ? "header_text_dark" : ""}`}
              onClick={() => {
                handleLogOutBtnClick();
                toggleMobileMenu();
              }}
            >
              {getCurrentUserName()}
              <img
                src={isSavedNews ? logoutIcon_black : logoutIcon_white}
                alt="Logout icon"
                className="header__logout-icon"
              />
            </button>
          ) : (
            <button
              className="header__signin-btn"
              type="button"
              onClick={() => {
                handleLoginBtnClick();
                toggleMobileMenu();
              }}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
