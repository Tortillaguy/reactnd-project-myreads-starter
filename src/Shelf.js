import React, {Component} from 'react'
import Book from './Book'

class Shelf extends Component {
	
	render() { 
		return (
			<div className="bookshelf">
			<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
					{this.props.books.map((book)=>(
						<li key={book.id}>
							<Book title={book.title} author={book.authors[0]} coverURL={book.imageLinks.thumbnail}/>
						</li>
						))}
					</ol>
				</div>
			</div>
		)	
	}
}

export default Shelf