import { NavLink } from "react-router-dom";

function Navigation({ isLoggedIn, isSavedNews }) {
  const customClassName = ({ isActive }) =>
    `navigation__link ${isSavedNews ? "navigation__link_theme_dark" : ""}
      ${isActive ? "navigation__link_active" : ""}`;
  return (
    <nav className="navigation">
      <NavLink to="/" className={customClassName}>
        Home
      </NavLink>
      {/* Conditionally rendering /save-news when isLoggedIn */}
      {isLoggedIn && (
        <NavLink to="/saved-news" className={customClassName}>
          Saved articles
        </NavLink>
      )}
    </nav>
  );
}

export default Navigation;
