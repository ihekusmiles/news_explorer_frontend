// Importing React
import { useState } from "react";

// Importing components
import Header from "../Header/Header";
import Main from "../Main/Main";
import SearchForm from "../SearchForm/SearchForm";

function App() {
  // consts: handlers, API functions, contexts consts, useState hooks, useEffects will go here

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
        <SearchForm />
      </div>
    </div>
  );
}

export default App;
