import React, { useState, useEffect } from "react";
import "./App.css";
import BooksListComponent from "./components/BooksList";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [fetchedResults, setFetchedResults] = useState(5);
  const [browserPosition, setBrowserPosition] = useState(0);
  const [isFetchedData, setIsFetchedData] = useState(false);
  const fetchBookData = async () => {
    await setIsFetchedData(true);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${inputValue}&maxResults=${fetchedResults}`
    );
    const data = await res.json();
    setTimeout(() => {
      if (data.items) {
        setBooksList(data.items);
      } else {
        data.items = [];
        setBooksList(data.items);
      }
      setIsFetchedData(false);
    }, 3000);
  };

  const inputValueChange = e => {
    setInputValue(e.target.value);
  };

  // useEffect(() => {
  //   return () => {
  //     window.addEventListener("scroll", scrollHandler, true);
  //     const scrollHandler = () => {
  //       if (!isFetchedData) {
  //         // setFetchedResults(fetchedResults + 5);
  //         // fetchBookData();
  //         console.log("fetch");
  //       }
  //     };
  //   };
  // }, [isFetchedData]);

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
      {isFetchedData ? (
        <img
          className="loading"
          src="https://cervirobotics.com/wp-content/themes/cervirobotics/assets/src/images/loading.gif"
          alt="loading"
        />
      ) : (
        <section>
          {booksList.length > 0 ? (
            <BooksListComponent list={booksList} />
          ) : (
            <p className="no-result">No results</p>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
