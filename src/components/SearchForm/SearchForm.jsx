import { useState } from "react";
import { useForm } from "../../hooks/useForm";

function SearchForm({ userInput, onChange, onSearch }) {
  const { values, handleChange } = useForm({ q: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault(); // Stopping page reload here

    // Checking if the search term is empty or only whitespace
    if (!values.q || values.q.trim() === "") {
      setErrorMessage("Please enter a keyword");
      return;
    }
    // Clearing error message and triggering search request
    setErrorMessage("");
    onSearch(values.q);

    // onSearch(userInput);
  };
  return (
    <search>
      <form
        className="searchform__container"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className="searchform__input"
          type="search"
          id="site-search"
          name="q"
          placeholder="Enter topic"
          value={values.q}
          onChange={(event) => {
            handleChange(event);
            // clear error when user types
            if (errorMessage) setErrorMessage("");
          }}
        />
        // Show error message only when there is
        {errorMessage && (
          <span className="searchform__error">{errorMessage}</span>
        )}
        <button type="submit" className="searchform__btn">
          Search
        </button>
      </form>
    </search>
  );
}

export default SearchForm;
