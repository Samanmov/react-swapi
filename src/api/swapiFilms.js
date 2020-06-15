import axios from "axios";

const swapiFilms = () => {
  return axios.get("https://swapi.dev/api/films/");
};

export default swapiFilms;
