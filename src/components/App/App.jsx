// Importing React
import { useState } from "react";
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

function App() {
  // consts: handlers, API functions, contexts consts, useState hooks, useEffects will go here
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSearchResults, setHasSearchResults] = useState(false);

  return (
    <div className="page">
      <div className="page__content">
        <div className="page__background">
          <Header isLoggedIn={isLoggedIn} />
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
    </div>
  );
}

export default App;
