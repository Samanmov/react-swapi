import React, { useState, useEffect } from "react";
import axios from "axios";
import swapiFilms from "./api/swapiFilms";
import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Spinner from "./components/ShareComponents/Spinner/Spinner";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);
  // the async function that called swapiFilms and set the state fot fetch movies.
  const getMovies = async () => {
    try {
      setIsLoading(true);
      const { data } = await swapiFilms();
      setMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error to fetch the star wars movies", error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  // create function when the user click to get details of movie
  const movieClickHandler = async (movie) => {
    try {
      setDetails(movie);
      setIsLoading(true);
      for await (const dataCharacters of movie.characters) {
        const response = await axios.get(dataCharacters);
        // add resultet response as new array
        setCharacters((characters) => [...characters, response.data]);
      }
      setIsLoading(false);
      setIsShowing(!isShowing);
    } catch (error) {
      console.error("Error to fetch the charactersP", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const closeModal = () => {
    setDetails(null);
    setIsShowing(false);
  };

  return (
    <>
      <MovieList movies={movies} movieClick={movieClickHandler} />
      <MovieDetails
        movie={details}
        onClose={closeModal}
        isShowing={isShowing}
        actors={characters}
      />
      {isLoading && <Spinner />}
      {isError && <div>Error to load movies.</div>}
    </>
  );
};
export default App;
