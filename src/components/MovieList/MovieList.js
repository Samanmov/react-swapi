import React from "react";
import "./MovieList.css";
const MovieList = ({ movies, movieClick }) => {
  return (
    <div className="movie-list">
      <div className="container">
        <ul className="card-body">
          {movies.map((movie) => {
            return (
              <li className="card" key={movie.title}>
                <div onClick={() => movieClick(movie)}>
                  <div className="card-content">
                    <h1 className="movie-name">{movie.title}</h1>
                    <h2 className="movie-release-date">{movie.release_date}</h2>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
