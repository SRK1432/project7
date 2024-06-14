import React, { useState, useEffect } from "react";
import MoviesList from "./components/MoviesList";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);
 
  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
      {!isLoading && error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && <MoviesList movies={movies} />}
    </>
  );
};

export default App;
