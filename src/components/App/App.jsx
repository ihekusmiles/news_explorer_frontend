// Importing React
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Importing components
import Header from "../Header/Header";
import Main from "../Main/Main";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Footer from "../Footer/Footer";

import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import NewsCard from "../NewsCard/NewsCard";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

function App() {
  // consts: states, handlers, API functions, contexts consts, useState hooks, useEffects will go here
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSearchResults, setHasSearchResults] = useState(false);

  // Function that opens log in modal
  const handleLoginClick = () => {
    setActiveModal("login");
  };
  // Function that closes the active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };
  // Function that opens sign up modal
  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  // ----------USEEFFECTS----------

  // useEffect hook for Escape key and overlay click modal-closing features
  useEffect(() => {
    // If no modal is active, don't attach listeners
    if (!activeModal) return;

    // Defining handlers
    const handleEscapeKey = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };
    const handleOverlayClick = (evt) => {
      if (evt.target.classList.contains("modal__is-opened")) {
        closeActiveModal();
      }
    };

    // Attaching listeners to document
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleOverlayClick);
    // Preventing memory leaks, avoiding duplicate event triggers, and eliminating stale state bugs
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
    // run useEffect only when activeModal changes, hence adding the dependency
  }, [activeModal]);

  return (
    <div className="page">
      <div className="page__content">
        <div className="page__background">
          <Header isLoggedIn={isLoggedIn} handleLoginClick={handleLoginClick} />
          <Routes>
            {/* HOME ROUTE */}
            <Route
              path="/"
              element={
                <>
                  <Main />
                  <SearchForm />
                  {/* When there are search results AND user is logged in */}
                  {/* {hasSearchResults && <NewsCardList isLoggedIn={isLoggedIn} />} */}
                  <About />
                </>
              }
            />
            {/* SAVED NEWS ROUTE */}
            <Route
              path="/saved-news"
              element={
                <>
                  <SavedNewsHeader />
                  <NewsCardList
                    isLoggedin={isLoggedIn}
                    isSavedNewsPage={true}
                  />
                  <About />
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
      <LoginModal
        buttonText="Sign in"
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        onRegisterClick={handleRegisterClick}
      />
      <RegisterModal
        buttonText="Sign up"
        isOpen={activeModal === "register"}
        onClose={closeActiveModal}
        onLoginClick={handleLoginClick}
      />
    </div>
  );
}

export default App;
