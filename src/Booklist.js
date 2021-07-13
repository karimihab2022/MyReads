import React ,{ useEffect , useState } from 'react'
import BooksShelf from "./BooksShelf"
import { Link } from 'react-router-dom';

const Booklist = (props)=>{
   

  const [CurrentlyReading,setCurrentlyReading]= useState([]);
  const [WanttoRead,setWanttoRead]= useState([]);
  const [Read,setRead]= useState([]);


  useEffect(()=>{
   const currenyReading = props.books.filter((book=>{
       return(book.shelf==="currentlyReading");
   })
  );
    setCurrentlyReading(currenyReading);

  const wanttoread = props.books.filter((book=>{
    return(book.shelf==="wantToRead");
})
);
  setWanttoRead(wanttoread);

const read = props.books.filter((book=>{
    return(book.shelf==="read");
})
);
  setRead(read);

  },[props.books]);

  

 return(
     
     <div className="list-books">

          <div className="list-books-title">
              <h1>MyReads</h1>
           </div>

        <div className="list-books-content">
            <div>
            <BooksShelf books={CurrentlyReading} name="Currently Reading" onchange={props.onchange}/>
            <BooksShelf books={WanttoRead} name="Want to Read" onchange={props.onchange}/>
            <BooksShelf books={Read} name="Read"onchange={props.onchange} />
            </div>
       
        </div>
       
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
     </div>
   

 );
}
export default Booklist;