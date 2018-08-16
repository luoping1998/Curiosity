import React, { Component } from 'react'
import './read.less'
import axios from 'axios'
import { changeStyle } from '../../public/common.js'
import Commit from '../../components/commit/commit.js'

function trans(cont) {
	let arr = cont.split("\n");
	arr = arr.filter( val => {
		return val!==""
	})
	let List = arr.map((val,index) => {
		return (
			<p key={index}>
				<pre>{val}</pre><br/>
			</p>
		)
	})
	return List
}

class Reader extends Component {
	constructor(props) {
		super(props)
		let arr = this.props.location.search.split('=');
		this.state = {
			branchId: arr[2].split("&")[0],
			bookId: arr[1].split("&")[0],
			bookName: arr[3].split('&')[0],
			bookType: changeStyle(arr[4]).words,
			data: [],
			List: [],
			author: {},
			num: 0
		}
		this.handleStyle = this.handleStyle.bind(this);
		console.log(this.state);
	}

	componentDidMount() {
		let index = this.state.index - 1;
		axios.get("http://47.95.207.40/branch/book/branch/"+this.state.branchId)
			 .then( res => {
				this.setState({
					data: res.data.data,
					List: trans(res.data.data.content),
					author: res.data.data.author,
					num: res.data.data.content.length
				})
			 })
			 .catch( err => {
				console.log(err);
			})
	}

	handleStyle(e) {
		console.log(e.target);
	}

	render() {
		const data = this.state.data;
		return (
			<div className="reader">
				<div className="sub_nav">
					<div className="nav_li"></div>
					<div className="nav_li"></div>
					<div className="nav_li"></div>
					<div className="nav_li"></div>
				</div>
				<div className="re_body">
					<div className="header">
						<a href="/">首页</a>
						<span className="split">></span>
						<a href={"/all?type=" + changeStyle(this.state.bookType.index)}>{this.state.bookType}</a>
						<span className="split">></span>
						<a href={ "/book_details?bookId=" + this.state.bookId }> {this.state.bookName} </a>
						<span className="split">></span>
						<a href="">第{data.parentId + 1}章</a>
					</div>
					<div className="inner_body">
						<h2>{data.title}</h2>
						<p className="link">
							<a href={ "/book_details?bookId=" + this.state.bookId }><span className="icon book"></span>{this.state.bookName}</a>
							<a><span className="icon author"></span>{this.state.author.username}</a>
							<a className="no-hover"><span className="icon length"></span>{this.state.num}字</a>
							<a className="no-hover"><span className="icon date"></span>{data.createTime}</a>
						</p>
						<div className="main">
							{this.state.List}
						</div>
					</div>
					<div className="re_footer">
						<div className="btn">
							<p>上一章</p>
						</div>
						<div className="btn">
							<p>目 录</p>
						</div>
						<div className="btn">
							<p>下一章</p>
						</div>
					</div>
					<Commit head="章节评论区"/>
				</div>
			</div>
		)
	}
}

export default Reader