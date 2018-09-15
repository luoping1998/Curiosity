import React, { Component } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'
import Paging from '../paging/paging.js'
import { changeStyle } from '../../public/common.js'

import './my_start.less'

class StartCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const cont = changeStyle(this.props.bookType);
		const style = {
			border: '1px solid ' + cont.color,
			color: cont.color
		}
		return (
				<div className="start_item">
					<div className="item_infor">
						<a href={"/book_details?bookId=" + this.props.bookId}>
							<img className="item_img" src={"http://47.95.207.40/branch/file/book/" + this.props.bookImage }/>
						</a>
						<div className="infor_detail">
							<a href={"/book_details?bookId=" + this.props.bookId}>
								<h2 className="infor_name">
								{this.props.bookName}
								</h2>
							</a>
							<div className="type" style={style}>{cont.words}</div>
							{
								this.props.status == "PUBLISH" ? (<div className="pub">已发布</div>) : (<div className="notpub">未发布</div>)
							}
						</div>
					</div>
					<div className="details">
						<p>当前共{this.props.joinUsers}人参与续写&nbsp;&nbsp;最快续写至第{this.props.maxLayer}章</p>
						<div className="infor_intro">{this.props.content}</div>
					</div>
					<div className="actions">
						<a href={"/book_details?bookId=" + this.props.bookId}><div className="btn">查看详情</div></a>
						<p>
							<a href="javascript:">编辑</a>
							<a href="javascript:">删除</a>
						</p>
					</div>
				</div>
		)
	}
}

//展示列表
class StartList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arr: [],
			count: 0,
			pageNow: 1,
			pageShow: 1,
			book:[]
		}
		this.getBooks = this.getBooks.bind(this);
		this.goBack = this.goBack.bind(this);
		this.goNext = this.goNext.bind(this);
		this.goPage = this.goPage.bind(this);
		this.handleGo = this.handleGo.bind(this);
	}
	goBack() {
		let val = Number(this.state.pageNow) - 1;
		this.setState({
			pageNow: val,
			pageShow: val
		},()=>{
			this.getBooks();
		})
	}

	goNext() {
		let val = Number(this.state.pageNow) + 1;
		this.setState({
			pageNow: val,
			pageShow: val
		},()=>{
			this.getBooks();
		})
	}

	goPage(e) {
		let val = Number(e.target.innerHTML);
		
		this.setState({
			pageNow: val,
			pageShow: val
		},()=>{
			this.getBooks();
		})
	}

	getBooks() {
		if(this.state.arr.length) {
			let start = (this.state.pageNow - 1) * 10;
			let end = (start + 10) > this.state.arr.length ? this.state.arr.length : (start + 10);
			this.setState({
				book: this.state.arr.slice(start, end + 1)
			})
		}
	}

	handleGo() {
		if(this.state.pageShow > this.state.count || this.state.pageShow < 1) {
			this.setState({
				pageShow: this.state.pageNow
			})
		}else {
			this.setState({
				pageNow: this.state.pageShow
			},()=>{
				this.getBooks();
			})
		}
	}

	componentWillMount() {
		axios.get("http://47.95.207.40/branch/user/book",{
			headers: {
				Authorization: "Bearer " + this.props.token.access_token
			}
		}).then(res => {
			this.setState({
				arr: res.data.data,
				count: Math.ceil(res.data.data.length / 10)
			},()=>{
				this.getBooks();
			})
		}).catch(err => {
			let mes = '';
			if(err.response) {
				if(err.response.data.error === "invalid_token") {
					mes= "用户未登录或者登录过期";
				}else {
					mes = err.response.data.message;
				}
			}else {
				mes = '网络异常！';
			}
			this.props.showFailPopup(mes);
		})
	}

	render() {
		const List = this.state.book.map( val => (
			<StartCard {...val} key={val.bookId}/>
		))
		return (
			<div className="my_start">
				<div className="start_header">
					<Link to="/my/shelf/my_start/add">
						<div className="btn"> <span className="big">+</span> 添加发起</div>
					</Link>
				</div>
				{List}
				<Paging 
					now={this.state.pageNow} 
					show={this.state.pageShow}
					count={this.state.count} 
					goBack={this.goBack}
					goNext={this.goNext}
					goPage={this.goPage}
					handleChange={this.handleChange}
					handleGo={this.handleGo}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	showSucPopup: mess => dispatch(ACTIONS.POPUP.showSucPopup(mess)),
	showFailPopup: mess => dispatch(ACTIONS.POPUP.showFailPopup(mess)),
}) 

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StartList)