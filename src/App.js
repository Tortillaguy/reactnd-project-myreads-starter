import React from 'react'
import {Link, Route} from 'react-router-dom'
import SearchBar from './SearchBar'
import Shelf from './Shelf'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll().then(books=>this.setState({books:books}));

  }

  update = (shelf, book) =>{
    console.log("App Component called")
    // var books = this.state.books
    // let index = books.findIndex((book)=>book.id === id)
    // books[index].shelf = shelf
    // this.setState({books:books})
    BooksAPI.update(book, shelf).then(
      BooksAPI.get(book.id).then( updatedBook =>{
        var collection = this.state.books;
        let index = collection.findIndex(item=>item.id === updatedBook.id);
        collection[index] = updatedBook;
        this.setState({books:collection});
      })
        
      );
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" component={SearchBar} />

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
