import React from 'react'
import {Link, Route} from 'react-router-dom'
import SearchBar from './SearchBar'
import Shelf from './Shelf'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    
    books: [],
  }

  componentDidMount(){
    BooksAPI.getAll().then(books=>this.setState({books:books}));
  }

  update = (shelf, book) =>{
    
    BooksAPI.update(book, shelf).then( response => {
      //Why does BooksAPI return shelf arrays when GetAll returns a list of books? Two different hierarchies for data model
      //use Get on original book object
      BooksAPI.get(book.id).then( updatedBook =>{
       // console.log(updatedBook);
        var myCollection = this.state.books;
        if (updatedBook.shelf === "none"){
          var filter = myCollection.filter((myBook)=>myBook.id !== updatedBook.id);
          this.setState({books: filter});
          return;
        }
        else {
        let index = myCollection.findIndex(item=>item.id === updatedBook.id);
        if (index !== -1){
           myCollection[index] = updatedBook;
          this.setState({books:myCollection});
        }
        else {
          myCollection.push(updatedBook);
        }
       
        }
        this.setState({books:myCollection});
      });

      this.forceUpdate();
    });
      
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={()=>(<SearchBar update={this.update} books={this.state.books} />)}/>
        <Route exact path="/" render={()=> (
          <div className="list-books">
            <div className="list-books-title"><h1>MyReads</h1></div>
              <div className="list-books-content">
                <Shelf title="Currently Reading" shelf="currentlyReading" books={this.state.books} updateBook={this.update}/>
                <Shelf title="Want to Read" shelf="wantToRead" books={this.state.books} updateBook={this.update}/>
                <Shelf title="Read" shelf="read" books={this.state.books} updateBook={this.update}/>
              
                <div className="open-search">
                <Link to="/search">Add a book</Link>
                </div>
              </div>
            </div>
        )}/>

      </div>)
  }
}

export default BooksApp
