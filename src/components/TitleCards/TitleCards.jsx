import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWI3MzU2YWMzZDk5MzEwYzFmZDExNjdhZGRiZWYzNCIsIm5iZiI6MTc2ODE3ODY3Mi4xMDksInN1YiI6IjY5NjQ0M2YwZTEwNDcwNDc5MjI4NDVhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.29rRnbVSd_0nvRjP1YmxP3ayxsf0qI1fOHtP40caD9U",
  },
};

const TitleCards = ({ title, category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handlewheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response=> setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handlewheel);
  }, [category]);
  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.name} />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default TitleCards;
