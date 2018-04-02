import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class SearchBar extends Component{
	state = {
    query: '',
    results: [], 
    books: [],
	}

  componentDidMount(){
    if (this.props.books){
      if (this.props.books.length === 0){
        //BooksAPI.getAll().then(all=>console.log(all));
        BooksAPI.getAll().then(all=>{this.setState({books: all})});
      }
      else {
        this.setState({books: this.props.books});
      }
    }
  }


  updateQuery = (query) => {
    this.setState({query: query});
    if (query.length <= 0) {
      this.setState({results:[]});
      return;
    }
    BooksAPI.search(query).then(results=>{
      //console.log(results);
      if (results.length > 0)
        this.setState({results:results});
      else 
        this.setState({results:[]});
    })
  }

  updateBook = (shelf, book) => {
    this.props.update(shelf, book);
  }

	render() {
		return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                  value={this.state.query}
                  onChange={(event)=>this.updateQuery(event.target.value)} 
                  placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.results.map(book=>
                  (<li key={book.id}><Book book={book} myCollection={this.state.books} onChangeShelf={this.updateBook}/></li>)
                )}
              </ol>
            </div>
          </div>
		)
	}
}

export default SearchBar