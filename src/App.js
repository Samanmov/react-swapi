import React, { useState, useEffect } from "react";
import axios from "axios";
import swapiFilms from "./api/swapiFilms";
import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Spinner from "./components/ShareComponents/Spinner/Spinner";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorCharacters, setIsErrorCharacters] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);
  // the async function that called Swapi API when is request success then set the state for fetch movies.
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
  // async function that gets movies details and looping in the characters array which includes
  // endpoint user per each character and when the request success pushes the result in a brand new an array.
  const movieClickHandler = async (movie) => {
    try {
      setDetails(movie);
      setIsLoading(true);
      for await (const dataCharacters of movie.characters) {
        const response = await axios.get(dataCharacters);
        setCharacters((characters) => [...characters, response.data]);
      }
      setIsLoading(false);
      setIsShowing(!isShowing);
    } catch (error) {
      console.error("Error to fetch the characters", error);
      setIsLoading(false);
      setIsErrorCharacters(true);
    }
  };
  // // a function for close modal, and it will clean up data for details and  Characters.
  const closeModal = () => {
    setDetails(null);
    setIsShowing(false);
    setCharacters([]);
  };
  // Props passed from parents component down to child components.
  const errorMessageMovies = "Error to load movies.";
  const errorMessageCharacters = "Error to load characters.";
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
      {isError && <div className="error-message">{errorMessageMovies}</div>}
      {isErrorCharacters && (
        <div className="error-message">{errorMessageCharacters}</div>
      )}
    </>
  );
};
export default App;
