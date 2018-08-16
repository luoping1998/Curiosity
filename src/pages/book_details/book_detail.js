import React, { Component } from 'react'
import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'
import axios from 'axios'
import './book_detail.less'
import '../../App.less'
import { changeStyle } from '../../public/common.js'

import Commit from '../../components/commit/commit.js'

function ifFocused( arr, num) {
	let narr = arr.map(val => (val.bookId == num));
	return narr.indexOf(true);
}

class Author extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="author">
				<div className="infor_card">
					<img className="avater" />
					<h2 className="name">{this.props.username}</h2>
					<p className="sign">{this.props.sign}</p>
					<div className="details">
						<div className="de_card">
							<div className="icon start"></div>
							<p>发起数量</p>
							<p className="num">2</p>
						</div>
						<div className="de_card">
							<div className="icon jion"></div>
							<p>参与数量</p>
							<p className="num">2</p>
						</div>
						<div className="de_card">
							<div className="icon focus"></div>
							<p>关注数量</p>
							<p className="num">2</p>
						</div>
					</div>
				</div>
				<div className="more_card">
					<div className="header">更多作品</div>
					<div className="more_body"></div>
				</div>
			</div>
		)
	}
}

class BookDetails extends Component {
	constructor(props) {
		super(props);
		const bookId = this.props.location.search.split('=')[1];
		this.state = {
			bookId: bookId,	//当前展示的书id
			show: 0 ,		//0 则为作品信息展示 | 1 则为目录章节展示
			focused: (ifFocused(this.props.focus, bookId) !== -1),		//检测是否关注
			bookInfor: {},
			author: {},
			firstBranchId: 0 			//第一章的branchId
		}
		this.focusBook = this.focusBook.bind(this);
		this.unfocusBook = this.unfocusBook.bind(this);
		this.getBook = this.getBook.bind(this);
	}

	focusBook() {
		axios.put("http://47.95.207.40/branch/user/focusOn/book/" + this.state.bookId,
			{},
			{
				headers: {
					"Authorization": "Bearer " + this.props.token.access_token
				}
			}
		).then( res => {
			this.props.showSucPopup(res.data.message);
			this.props.getFocus(this.props.token);
			this.setState({
				focused: true
			})
		}).catch( err => {
			this.props.showFailPopup(err.response.data.message);
		})
	}

	unfocusBook() {
		axios.delete("http://47.95.207.40/branch/user/focusOn/book/" + this.state.bookId,
			{
				headers: {
					"Authorization": "Bearer " + this.props.token.access_token
				}
			}
		).then( res => {
			this.props.showSucPopup(res.data.message);
			this.props.getFocus(this.props.token);
			this.setState({
				focused: false
			})
		}).catch( err => {
			this.props.showFailPopup(err.response.data.message);
		})		
	}

	getBook() {
		axios.get("http://47.95.207.40/branch/book/" + this.state.bookId)
			 .then(res=> {
			 	this.setState({
			 		bookInfor: res.data.data,
			 		author: res.data.data.author
			 	})
			 })
			 .catch(err => {
				this.props.showFailPopup(err.response.data.message);
		})
	}

	getBranch() {
		axios.get("http://47.95.207.40/branch/book/"+this.state.bookId+"/branch",{
			"params": {
				parentId: 0
			}
		}).then( res => {
			this.setState({
				firstBranchId: res.data.data[0].branchId
			})
		}).catch( err => {
			this.props.showFailPopup(err.response.data.message);

		})
	}

	componentDidMount() {
		this.getBook();
		this.getBranch();
	}

	render() {
		const show = this.state.show;
		const bookInfor = this.state.bookInfor;
		const cont = changeStyle(bookInfor.bookType);
		const style = {
			border: '1px solid ' + cont.color,
			color: cont.color
		}
		return (
			<div className="main_body book_details">
				<p className="sub_nav"><a href="/">首页</a>><a href={"/all?type=" + cont.index}>{cont.words}</a>><a href="">{bookInfor.bookName}</a></p>
				<div className="book_intro">
					<img className="book_img" src={"http://47.95.207.40/branch/file/book/" + bookInfor.bookImage}/>
					<div className="book_infor">
						<h1 className="book_name">{bookInfor.bookName}<span className="author">{this.state.author.username} 发起</span></h1>
						<div className="types">
							<div className="type" style={style}>{cont.words}</div>
						</div>
						<div className="count">
							<div className="item">
								<span className="big">445</span>关注量
							</div>
							<div className="item">
								<span className="big">25</span>参与量
							</div>
							<div className="item no-border">
								<span className="big">4</span>阅读量
							</div>
						</div>
						<div className="intro">
							<div className="text">{bookInfor.content}</div>
						</div>
						<div className="actions">
							<a href={"/read?bookId=" + this.state.bookId + "&branchId=" + this.state.firstBranchId + "&bookName=" + bookInfor.bookName+ "&bookType=" + cont.index }><div className="btn">开始阅读</div></a>
							<a href="javascript:"><div className="btn more">参与续写</div></a>
							{
								this.state.focused === true ? (
									<a href="javascript:"><div className="btn more" onClick={this.unfocusBook}>√已关注</div></a>
								) : (
									<a href="javascript:"><div className="btn more" onClick={this.focusBook}>关注本书</div></a>
								)
							}
						</div>
					</div>
				</div>
				<ul className="book_sub">
					<a href="javascript:">
						<li className={show === 0 ? "active" : ""} onClick={()=>{this.setState({show: 0})}}>作品信息</li>
					</a>
					<a href="javascript:">
						<li className={show === 1 ? "active" : ""} onClick={()=>{this.setState({show: 1})}}>目录(xx章)</li>
					</a>
				</ul>
				{
					show === 0 ? 
					(
						<div className="book_show">
							<div className="commit_box">
								<Commit head= "作品评论区"/>
							</div>
							<Author 
								username={this.state.author.username}
							/>
						</div>
					) : (
						<div className="book_catalog">

						</div>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token,
	logif: state.logif,
	focus: state.focus
})

const mapDispatchToProps = dispatch => ({
	getFocus: token => dispatch(ACTIONS.FOCUS.getFocus(token)),
	showFailPopup: mes => dispatch(ACTIONS.POPUP.showFailPopup(mes)),
	showSucPopup: mes => dispatch(ACTIONS.POPUP.showSucPopup(mes))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BookDetails)