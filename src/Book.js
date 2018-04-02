import React, {Component} from 'react'
import './App.css'

class Book extends Component {
	state = {
		shelf: '',
	}



	componentDidMount(){
		if (this.props.myCollection){
			var item = this.props.myCollection.findIndex(item=>{return item.id === this.props.book.id});
			if (item > -1){
				this.setState({shelf: this.props.myCollection[item].shelf});
			}
		}
		else {
			this.setState({shelf: this.props.shelf});
		}
	}

	change(event) {
		console.log(event.target.value);
	}

	changeShelf = (event) => {
		let shelf = event.target.value
		
		this.setState({shelf: shelf});
		this.props.onChangeShelf(shelf, this.props.book)
	}

	checkShelf = (shelf) =>{
		 if (this.state.shelf === shelf){
			return "\u2714";
		}
	}

	render() {
		var bookUrl = "";
		if (this.props.book.imageLinks)
			bookUrl = this.props.book.imageLinks.thumbnail;
		//var bookUrl = this.props.book.imageLinks.thumbnail;
		return (
			<div className="book">
	          <div className="book-top">
	            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookUrl})` }}></div>
	            <div className="book-shelf-changer">
	              <select value="" onChange={this.changeShelf}>
	                <option value="" disabled >Move to...</option>
	                <option value="currentlyReading">Currently Reading {this.checkShelf("currentlyReading")}</option>
	                <option value="wantToRead">Want to Read {this.checkShelf("wantToRead")}</option>
	                <option value="read">Read {this.checkShelf("read")}</option>
	                <option value="none">None {this.checkShelf("none")}</option>
	              </select>
	            </div>
	          </div>
	          <div className="book-title">{this.props.book.title}</div>
	          <div className="book-authors">{this.props.book.authors ? this.props.book.authors[0] : ''}</div>
	        </div>
        )
	}
}

export default Book