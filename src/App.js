import React, { useState, useEffect } from "react";
import swapiFilms from "./api/swapiFilms";
import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [details, setDetails] = useState({});
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    // the async function that called swapiFilms and set the state fot fetch movies.
    const { data } = await swapiFilms();
    console.log(data);
    setMovies(data.results);
  };
  // create function when the user click to get details of movie
  const movieClickHandler = (movie) => {
    setDetails(movie);
    console.log(movie);
  };
  return (
    <>
      <MovieList movies={movies} movieClick={movieClickHandler} />
      <MovieDetails movie={details} />
    </>
  );
};
export default App;
