import React from "react";
import "./MovieList.css";
const MovieList = ({ movies, movieClick }) => {
  return (
    <div className="Movie-list content">
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.title}>
              <a onClick={() => movieClick(movie)}>
                <div className="wrapper">
                  <div className="card">
                    <h1>{movie.title}</h1>
                    <h2>{movie.release_date}</h2>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
