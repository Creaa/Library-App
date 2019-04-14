import React, { useState, useEffect } from "react";
import "./App.css";
import arrow from "./assets/info-icon.png";
import BooksListComponent from "./components/BooksList";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [fetchedResults, setFetchedResults] = useState(10);
  const [browserPosition, setBrowserPosition] = useState(0);
  const [isFetchedData, setIsFetchedData] = useState(false);
  const fetchBookData = async () => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${inputValue}&maxResults=${fetchedResults}`
    );
    const data = await res.json();
    setBooksList(data.items);
  };

  const inputValueChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <div className="wrapper">
      <header className="site-header">
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={inputValueChange}
          placeholder="Type title of book..."
        />
        <button onClick={fetchBookData} className="submit-arrow" />
      </header>
      {booksList ? <BooksListComponent list={booksList} /> : null}
    </div>
  );
}

export default App;
