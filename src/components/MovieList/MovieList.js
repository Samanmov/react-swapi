import React, { useState, useEffect } from "react";
import swapiFilms from "../../api/swapiFilms";
import "./MovieList.css";
const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);
  const getMovies = async () => {
    const { data } = await swapiFilms();
    console.log(data);
    setMovies(data.results);
  };
  return (
    <div className="Movie-list content">
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.title}>
              <a>
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
