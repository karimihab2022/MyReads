import React ,{ useEffect , useState } from 'react'
import * as BooksAPI from "./BooksAPI"
import Booklist from "./Booklist"
import { Route, Switch } from "react-router-dom";
import Search from './Search';
import './App.css'



const App =()=>{

  const [books,setBooks]= useState([]);
  const [searchbooks,setSearchbooks]= useState([]);
 

  useEffect(()=>{
    BooksAPI.getAll().then((Books)=>{
      setBooks(Books);
    }
  )
  },[]);


  const handelshelfchange = (book, status) => {
    setBooks(books.map((oldbook) => {
          if (oldbook.id === book.id) {
                oldbook.shelf = status;
              }
          return oldbook;
      }));

    BooksAPI.update(book,status)
   
  };

  const handelsearchchange =(value)=>{
    if(value){
      BooksAPI.search(value)
      .then(searchresult=>{
        if(searchresult.length){
          searchresult = searchresult.map((book) => {
            if (book.shelf === undefined){
                  book.shelf = "none";
               }
            
            for(let i=0; i< books.length; i++) {
              
                if (books[i].id === book.id) {
                      book.shelf = books[i].shelf;
                   }
            }
           
            return book;
          });
          setSearchbooks(searchresult);
        }
        else{
          setSearchbooks([]);
        }
      })
    }
    else{
      setSearchbooks([]);

    }
   

  };


  const UpdateBook = (book, status) => {
      book.shelf=status;
      setBooks(books.filter((oldbook)=>((book.id!==oldbook.id))).concat([book]));
      setSearchbooks(searchbooks.filter((oldbook)=>((book.id!==oldbook.id))).concat([book]));
      BooksAPI.update(book, status);
  };

  const handelclose=()=>{
    setSearchbooks([]);
  };



  return(
      <div>

        <Switch>   
           <Route   exact path="/">
              <Booklist books={books} onchange={handelshelfchange}/> 
          </Route>

           <Route path="/search">
              <Search books={searchbooks} onsearchchange={handelsearchchange} onupdatebook={UpdateBook} close={handelclose}/> 
            </Route>

         </Switch> 
            
      </div>
  );

}


export default App;
