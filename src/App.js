import React, { useState } from "react";
import MoviesList from "./components/MoviesList";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dummyMovies = [
    {
      id: 1,
      title: "Some dummy movie-1",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-18",
    },
    {
      id: 2,
      title: "Some dummy movie-2",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-19",
    },
  ];

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/"); // if we put wrong http then there will be error

      if(!response.ok){    //means if response is not ok and the error occurs only in http link
       throw new Error('Something went wrong!!')
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
      { !isLoading &&  <MoviesList movies={movies} />}
      {!isLoading && movies.length == 0&& !error && <p>Found no Movies</p>}
      { !isLoading && error && <p>{error}</p>}
      {isLoading && <p>Loading.....</p>}
    </>
  );
};

export default App;
