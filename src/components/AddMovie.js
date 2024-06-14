import React, { useState } from "react";
import "./AddMovie.css";
const AddMovie=({onAdd})=>{
    const [enteredTitle,setEnteredTitle] = useState('');
    const [enteredOpenTxt,setEnteredOpenTxt] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const submitHandler=(event)=>{
        event.preventDefault();
        const movie = {
            title:enteredTitle,
            openingText:enteredOpenTxt,
            releaseDate:enteredDate,
        }
        onAdd(movie);
        setEnteredTitle('');
        setEnteredOpenTxt('');
        setEnteredDate('');

    }
    return(
        <>
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Title:</label>
            <input 
            type="text" 
            id="title" 
            value={enteredTitle}
            onChange={((e)=>setEnteredTitle(e.target.value))}/>
            <label htmlFor="openingText">Opening Text:</label>
            <input 
            type="text" 
            id="openingText" 
            value={enteredOpenTxt}
            onChange={((e)=>setEnteredOpenTxt(e.target.value))}/>
            <label htmlFor="releaseDate">Release Date:</label>
            <input 
            type="text" 
            id="releaseDate" 
            value={enteredDate}
            onChange={((e)=>setEnteredDate(e.target.value))}/>
            <button >Add Movie</button> 
        </form>
        </>
    )
}
export default AddMovie;