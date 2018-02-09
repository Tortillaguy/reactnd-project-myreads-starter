import React, {Component} from 'react'
import './App.css'

class Book extends Component {
	state = {
	}

	change(event) {
		console.log(event.target.value);
	}

	changeShelf = (event) => {
		console.log("Book Component called")
		let shelf = event.target.value
		this.props.onChangeShelf(shelf, this.props.book.id)
	}

	render() {
		return (
			<div className="book">
	          <div className="book-top">
	            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
	            <div className="book-shelf-changer">
	              <select value="none" onChange={this.changeShelf}>
	                <option value="none" disabled>Move to...</option>
	                <option value="currentlyReading">Currently Reading</option>
	                <option value="wantToRead">Want to Read</option>
	                <option value="read">Read</option>
	                <option value="none">None</option>
	              </select>
	            </div>
	          </div>
	          <div className="book-title">{this.props.book.title}</div>
	          <div className="book-authors">{this.props.book.authors[0]}</div>
	        </div>
        )
	} 
}

export default Book