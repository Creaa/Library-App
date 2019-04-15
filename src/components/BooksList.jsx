import React, { useEffect } from "react";
import "./BooksList.css";
import PropTypes from "prop-types";
import AOS from "aos";
import "aos/dist/aos.css";

const BooksList = ({ list }) => {
  AOS.init();
  return (
    <ul className="books-list">
      {list.map(el => {
        let bookInfo = el.volumeInfo;
        let shortDescription = bookInfo.description;
        if (shortDescription) {
          shortDescription = shortDescription.split(".");
          shortDescription = shortDescription.slice(0, 1).join(".");
        }
        return (
          <li
            data-aos="fade-in"
            data-aos-offset="0"
            data-aos-delay="0"
            data-aos-duration="1000"
            data-aos-once="true"
            className="book-element"
            key={el.id}
          >
            <img
              className="book-thumbnail"
              src={
                bookInfo.imageLinks
                  ? bookInfo.imageLinks.thumbnail
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz6XrCrnrkS3Zkz2ZmhEEFRTqNHJz0iFvna87RMp9QmE0_LymlQw"
              }
              alt="thumbnail of book"
            />
            <p className="book-details title">{bookInfo.title}</p>
            <p className="book-details author">{bookInfo.authors}</p>
            <p className="book-details description">
              {shortDescription ? shortDescription : "No description"}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

BooksList.propTypes = {
  list: PropTypes.array.isRequired
};

export default BooksList;
