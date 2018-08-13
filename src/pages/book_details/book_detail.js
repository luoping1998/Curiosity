import React, { Component } from 'react'
import './book_detail.less'
import '../../App.less'

class BookDetails extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="main_body book_details">
				<div className="book_intro">
					<div className="book_img"></div>
				</div>
			</div>
		)
	}
}

export default BookDetails