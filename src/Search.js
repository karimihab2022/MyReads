import React from "react"
import { Link } from "react-router-dom";
import Book from "./Book";
 const Search =(props)=>{
     

    const handelsearchchange=(value)=>{
        props.onsearchchange(value.target.value)
        
    }

    const handelclose =()=>{
        props.close();
    }
    return(
        <div className="search-books">
            <div className="search-books-bar">
                 <Link to="/" className="close-search"  onClick={handelclose} >Close</Link>

                <div className="search-books-input-wrapper">
                 <input onChange={handelsearchchange} type="text" placeholder="Search by title or author"/>
                </div>
             </div>

            <div className="search-books-results">
                 <ol className="books-grid">
                     {props.books.map((book)=>(
                            <li key={book.id}>
                                <Book book={book} onchange={props.onupdatebook}/>
                          </li>
                     ))}

                 </ol>
             </div>
      </div>
    );

 }

 export default Search;