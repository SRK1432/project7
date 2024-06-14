import React from "react";
import Movie from "./Movie";
import "./MoviesList.css";
const MoviesList=(props)=>{
    const deleteMovieHandler=()=>{
        
    }
    return(
        <>
            <ul>
                {props.movies.map((movie)=>(
                    <Movie 
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    openeingText={movie.openeingText}
                    onDeleteMovie ={() => props.onDeleteMovie(movie.id)}/>
                ))}
               
            </ul>
        </>
    )
}
export default MoviesList;