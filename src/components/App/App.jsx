// Importing useState, Routes, utils, context
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getNewsArticles } from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Importing API consts

import { saveArticle, removeArticle, getItems } from "../../utils/api";
import * as auth from "../../utils/auth";

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

  // TOKEN CONSTANTS
  const TOKEN_KEY = "jwt";
  const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };
  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  // Handle login submit with simulation
  const handleLoginSubmit = (email, password) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          setToken(data.token); // Saving token to local storage
          return auth.checkToken(data.token); // Immediately fetch users info using the new token
        }
      })

      .then((userData) => {
        setCurrentUser({
          username: userData.data.name || userData.data.email.split("@")[0],
          email: userData.data.email,
          _id: userData.data._id,
        });
        // After successful authorization set loggedIn state to true and close modal;
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Handle register with simulation
  const handleRegisterSubmit = (email, password, name) => {
    console.log("Submitted:", email, password, name); // DEBUGGING
    auth
      .register(email, password, name)
      .then((data) => {
        console.log(data); // DEBUGGING
        if (data.token) {
          setToken(data.token);
          return auth.checkToken(data.token);
        }
      })
      .then((userData) => {
        console.log(userData); // DEBUGGING
        console.log(userData.data.name, userData.data.email, userData.data._id); // DEBUGGIN
        setCurrentUser({
          username: userData.data.name || userData.data.email.split("@")[0],
          email: userData.data.email || "",
          _id: userData.data._id,
        });
        handleOpenConfirmation();
      })
      .catch((error) => {
        console.error("Registration failed", error);
      });
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedArticles([]);
  };

  // Function that closes the active modal
  const closeActiveModal = () => {
    setActiveModal("");
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

        console.log(articlesWithKeyword);

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
      // Updating state with resolved data (including backend _id)
      saveArticle(articleToSave)
        .then((savedArticleWithId) => {
          // Using the functional state updater to safely append/add the new article
          setSavedArticles((prevSaved) => [...prevSaved, savedArticleWithId]);
        })
        .catch((err) => console.log("Failed to save article:", err));
    } else {
      alert(`Article is already saved.`);
    }
  };

  // Function that removes a saved article
  const handleRemoveArticle = (articleToRemove) => {
    removeArticle(articleToRemove)
      .then(() => {
        setSavedArticles((prevSaved) =>
          prevSaved.filter((item) => item.url !== articleToRemove.url),
        );
      })
      .catch((err) => console.log("Failed to remove article:", err));
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

  // useEffect to simulate saved items to load when app mounts
  useEffect(() => {
    getItems()
      .then((articles) => setSavedArticles(articles))
      .catch((err) => console.log("Failed to load saved items:", err));
  }, []);

  // useEffect hook to check if there is a token in localStorage on PAGE REFRESH
  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .checkToken(jwt)
      .then((data) => {
        const userData = data.data ? data.data : data;
        setIsLoggedIn(true);
        setCurrentUser({
          username: userData.name || userData.email.split("@")[0],
          email: userData.email || "",
          _id: userData._id,
        });
      })
      .catch((error) => {
        console.error("Token check failed:", error);
        // Clean up on failure
        removeToken();
      });
  }, []);

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
                    <SearchForm onSearch={handleSearchSubmit} />

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
                        savedArticles={savedArticles}
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
                      <SavedNewsHeader
                        currentUser={currentUser}
                        savedArticles={savedArticles}
                      />
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
