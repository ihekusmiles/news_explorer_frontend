// Importing useState, Routes, utils, context
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getNewsArticles } from "../../utils/NewsApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

function App() {
  // -----USESTATE CONSTS-----

  // Keep trach of what modal is active/opened
  const [activeModal, setActiveModal] = useState("");
  // Keep track of if users is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Keep track of current username
  const [currentUser, setCurrentUser] = useState({});
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
  // keep track of saved articles
  const [savedArticles, setSavedArticles] = useState([]);

  // MODAL SWITCHING HANDLERS
  // Function that opens log in modal
  const handleOpenLogin = () => {
    setActiveModal("login");
  };
  // Function that opens sign up modal
  const handleOpenRegister = () => {
    setActiveModal("register");
  };

  // Function that opens confirmational modal
  const handleOpenConfirmation = () => {
    setActiveModal("confirmation");
  };

  // FORM SUBMISSION HANDLERS
  const handleLoginSubmit = (credentials) => {
    console.log("Logging in with:", credentials);
    setIsLoggedIn(true);
    closeActiveModal();

    // For testing purposes: Check if credentials match the user stored in React state
    // if (currentUser && credentials.email === currentUser.email) {
    //   setIsLoggedIn(true);
    //   closeActiveModal();
    // } else {
    //   alert("User does not exist or credentials do not match");
    // }

    // Getting prevUser data and preserving
    // the existing username
    // or fallback to a default/email-derived name.
    setCurrentUser((prevUser) => ({
      ...prevUser,
      username: prevUser.username || credentials.email.split("@")[0],
    }));
  };
  const handleRegisterSubmit = (userData) => {
    console.log("Registering user with:", userData);
    // Storing user as an object matching context shape
    setCurrentUser({
      username: userData.username || "",
      email: userData.email || "",
    });

    handleOpenConfirmation();
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedArticle([]);
  };

  // Function that closes the active modal
  const closeActiveModal = () => {
    setActiveModal("");
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
  // Function that handles saved articles
  const handleSaveArticle = (articleToSave) => {
    // Checking if article is already saved to prevent duplicates
    // Reads: If this item is NOT already inside savedArticles then add it
    if (!savedArticles.some((item) => item.url === articleToSave.url)) {
      // Using the functional state updater to safely append/add the new article
      setSavedArticles((prevSaved) => [...prevSaved, articleToSave]);
    } else {
      alert(`Article is already saved.`);
    }
  };

  // Function that removes a saved article
  const handleRemoveArticle = (articleToRemove) => {
    const filteredArray = savedArticles.filter(
      (item) => item.url !== articleToRemove.url,
    );
    setSavedArticles(filteredArray);
    alert("Article has been removed");
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
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <div className="page__content">
          <div className="page__background">
            <Header
              isLoggedIn={isLoggedIn}
              handleLoginBtnClick={handleOpenLogin}
              handleLogOutBtnClick={handleLogOut}
            />
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
                        onSaveArticle={handleSaveArticle}
                        onRemoveArticle={handleRemoveArticle}
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
                  <ProtectedRoute>
                    <>
                      <SavedNewsHeader currentUser={currentUser} />
                      <NewsCardList
                        newsCards={savedArticles}
                        isLoggedIn={isLoggedIn}
                        isSavedNewsPage={true}
                        onSaveArticle={handleSaveArticle}
                        onRemoveArticle={handleRemoveArticle}
                      />
                      <About />
                    </>
                  </ProtectedRoute>
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
          onSwitchToRegister={handleOpenRegister}
          onLoginSubmit={handleLoginSubmit}
        />
        <RegisterModal
          buttonText="Sign up"
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onSwitchToLogin={handleOpenLogin}
          onRegisterSubmit={handleRegisterSubmit}
        />
        <ConfirmationModal
          buttonText="Sign in"
          isOpen={activeModal === "confirmation"}
          onClose={closeActiveModal}
          onSwitchToLogin={handleOpenLogin}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
