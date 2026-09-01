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
  // -----USESTATE CONSTS-----
  // Keep trach of what modal is active/opened
  const [activeModal, setActiveModal] = useState("");
  // Keep track of if users is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // keep track of whether or not search results exist
  const [hasSearchResults, setHasSearchResults] = useState(false);
  // Keep track of whether or not search is currently in progress
  const [searchInProgress, setSearchInProgress] = useState(false);
  // Keep track of whether or not a search was submitted
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  // Keep track of whether or not error occurred
  const [errorOccurred, setErrorOccurred] = useState(false);
  // Set articles (newsCards) to memory
  const [newsCards, setNewsCards] = useState([]);
  // Storing user's search input into state
  const [searchKeyword, setSearchKeyword] = useState("");
  // Keep track of visible cards count
  const [visibleCount, setVisibleCount] = useState(3);

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

  // function that handles search: fetches articles, adds keyword parameter, sets to state
  const handleSearchSubmit = (query) => {
    setErrorOccurred(false);
    setSearchInProgress(true);
    setSearchSubmitted(true);
    // Resetting visible card count back to 3 for new searches
    setVisibleCount(3);

    getNewsArticles(query)
      .then((data) => {
        // Attaching the search keyword to each article object,
        const articlesWithKeyword = data.articles.map((article) => ({
          ...article,
          keyword: query,
        }));

        // Store all fetched articles in state/memory
        setNewsCards(articlesWithKeyword);
        // set to true or false depending if length is > 0 or not.
        setHasSearchResults(articlesWithKeyword.length > 0);
      })
      .catch((err) => {
        setErrorOccurred(true);
        console.error("Failed to fetch news:", err);
      })
      .finally(() => {
        setSearchInProgress(false);
      });
  };
  // update VisibleCount to show 3 more (in addition to previous 3)
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
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

                  {/* When API Error Occurs */}
                  {errorOccurred && (
                    <NoResults
                      title="Sorry, something went wrong during the request."
                      subtitle="Please try again later."
                    />
                  )}

                  {/* No results found */}
                  {!hasSearchResults && searchSubmitted && !errorOccurred && (
                    <NoResults />
                  )}

                  {/* Results found */}
                  {hasSearchResults && (
                    <NewsCardList
                      newsCards={newsCards}
                      isLoggedIn={isLoggedIn}
                      visibleCount={visibleCount}
                      onShowMore={handleShowMore}
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
