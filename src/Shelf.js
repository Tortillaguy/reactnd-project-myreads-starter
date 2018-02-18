import React, {Component} from 'react'
import Book from './Book'

class Shelf extends Component {

	onShelfChange(book){
		console.log(book);
	}

	updateShelf = (shelf, book)=>{
		console.log("Shelf Component called")
		this.props.updateBook(shelf, book);
	}

	render() { 
		return (
			<div className="bookshelf">
			<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
					{this.props.books.filter((book)=>(book.shelf === this.props.shelf)).map((book)=>(
						<li key={book.id}>
							<Book 
								book={book}
								onChangeShelf={this.updateShelf}
							/>
						</li>
						))}
					</ol>
				</div>
			</div>
		)	
	}
}

export default Shelf