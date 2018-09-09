import React, {Component} from 'react'
import './novel_card.less'
import {changeStyle} from '../../public/common.js'

class NovelCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const note = {
			'border' : 'none'
		}
		const style = changeStyle(this.props.bookType);
		const cont = {
			border: "1px solid " + style.color,
			color: style.color
		}
		const img = {
			background: "url(" + ("http://47.95.207.40/branch/file/book/" + (this.props ? this.props.bookImage : "default_book.jpg")) + ") no-repeat",
			backgroundPosition: "center",
			backgroundSize: "auto 100%"
		}
		return (
			<div className="novel_card" style={
				this.props.border==='none' ? note : {'':''}
			}>
				<div className="card_img" style={img}></div>
				<div className="card_infor">
					<div className="infor_tit"><a href={"/book_details?bookId=" + this.props.bookId}>{this.props.bookName}</a></div>
					<div className="infor_cont">{this.props.content}</div>
					<div className="infor_aut">
						<div className="aut_name">
							<div className="aut_icon"></div>
							<span><a href={"/author?userId=" + this.props.author.userId}>{this.props.author.username}</a></span>
						</div>
						<div className="aut_class" style={cont}>{style.words}</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NovelCard