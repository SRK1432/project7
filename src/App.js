import React, { useState, useEffect } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

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
      const response = await fetch("https://react-http-a0270-default-rtdb.firebaseio.com/movies.json");

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const addMovieHandler = async (movie) => {
    const response = await fetch("https://react-http-a0270-default-rtdb.firebaseio.com/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log(data);
    setMovies((prevMovies) => [...prevMovies, { id: data.name, ...movie }]);
  };
  const deleteMovieHandler = async (movieId) => {
    setIsLoading(true);
    try {
      await fetch(`https://react-http-a0270-default-rtdb.firebaseio.com/movies/${movieId}.json`, {
        method: 'DELETE',
      });
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id!== movieId));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <AddMovie onAddMovie={addMovieHandler} />

      <div className="center">
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </div>
      {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
      {!isLoading && error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />}
    </>
  );
};

export default App;
