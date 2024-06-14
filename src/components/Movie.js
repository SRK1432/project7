import React from 'react'
import "./Movie.css";

const Movie = (props) => {
  return (
    <>
    <li>
        <h2>{props.title}</h2>
        <h3>{props.releaseDate}</h3>
        <p>{props.openingText}</p>
        <button onClick={props.onDeleteMovie}>Delete Movie</button>
    </li>
    </>
  )
}

export default Movie;