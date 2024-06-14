import React from "react";
import Movie from "./Movie";
import "./MoviesList.css";
const MoviesList=(props)=>{
    return(
        <>
            <ul>
                {props.movies.map((movie)=>(
                    <Movie 
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    openeingText={movie.openeingText}/>
                ))}
            </ul>
        </>
    )
}
export default MoviesList;