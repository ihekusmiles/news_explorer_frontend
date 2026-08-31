// Importing React
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Import mock data
// import mockData from "../NewsCard/mockArray.json";

// Importing components
import Header from "../Header/Header";
import Main from "../Main/Main";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";

import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

import { getNewsArticles } from "../../utils/NewsApi";

function App() {
  // consts: states, handlers, API functions, contexts consts, useState hooks, useEffects will go here
  const [activeModal, setActiveModal] = useState("");
  // Keep track of if users is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // keep track of whether or not search results exist
  const [hasSearchResults, setHasSearchResults] = useState(false);
  // Keep track of whether or not search is currently in progress
  const [searchInProgress, setSearchInProgress] = useState(false);
  // Keep track of whether or not a search was submitted
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  // Keep track of errors
  const [errorOccurred, setErrorOccurred] = useState(false);
  // create newsCard array and set to empty array
  const [newsCards, setNewsCards] = useState([]);
  // storing user's search input into state
  const [searchKeyword, setSearchKeyword] = useState("");

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

  // function that handles the input change event
  const handleChange = (evt) => {
    setSearchKeyword(evt.target.value);
  };

  // function that handles search submit, query --> userInput
  const handleSearchSubmit = (query) => {
    setErrorOccurred(false);
    setSearchInProgress(true);
    setSearchSubmitted(true);
    getNewsArticles(query)
      .then((data) => {
        // Attaching the search keyword to each article object
        const articlesWithKeyword = data.articles.map((article) => ({
          ...article,
          keyword: query,
        }));
        console.log(articlesWithKeyword);
        setNewsCards(articlesWithKeyword);
        articlesWithKeyword.length === 0
          ? setHasSearchResults(false)
          : setHasSearchResults(true);
      })
      .catch((err) => {
        setErrorOccurred(true);
        console.error("Failed to fetch news:", err);
      })
      .finally(() => {
        setSearchInProgress(false);
      });
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
                  <SearchForm
                    userInput={searchKeyword}
                    onChange={handleChange}
                    onSearch={handleSearchSubmit}
                  />
                  {/* When there are search results AND user is logged in */}
                  {searchInProgress && <Preloader />}
                  {errorOccurred && (
                    <p>
                      Sorry, something went wrong during the request. Please try
                      again later.
                    </p>
                  )}
                  {/* When there are NO search results and search is submitted */}
                  {!hasSearchResults && searchSubmitted && !errorOccurred && (
                    <NoResults />
                  )}
                  {/* When there are search results render NewsCardList */}
                  {hasSearchResults && (
                    <NewsCardList
                      newsCards={newsCards}
                      isLoggedIn={isLoggedIn}
                    />
                  )}

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
                    newsCards={newsCards}
                    isLoggedIn={isLoggedIn}
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
