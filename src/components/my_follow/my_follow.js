import React, {Component} from 'react'
import {
	Link,
	Route,
	NavLink
} from 'react-router-dom'
import { connect } from 'react-redux'
import ACTIONS from '../../actions/index'

import '../my_follow/my_follow.less'
import Paging from '../paging/paging.js'

class Tab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="tab">
				<label>
				<input 
					type="checkbox" 
					className="check" 
					onClick={this.props.selectAll}
				/>全选
				</label>
				<a href="javascript:">置顶</a>
				<a href="javascript:" onClick={this.props.delSel}>删除</a>
			</div>
		)
	}
}

class FollowItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const style = {
			"background" : "url(" + "http://47.95.207.40/branch/file/book/" + this.props.bookImage + ") no-repeat",
			"backgroundSize": "100% auto",
			"backgroundPosition": "center"
		}
		return (
			<div className="my_follow_item">
				<div className="item_infor">
					<input type="checkbox" className="check" onClick={this.props.selectOne} index={this.props.bookId}/>
					<div className="item_img" style={style}>
						<div className={"item_state"+"_updating"}>更新中</div>
					</div>
					<div className="infor">
						<h3 className="tit">
							<a href={"/book_details?bookId=" + this.props.bookId}>{this.props.bookName}</a>
						</h3>
						<p className="name">{this.props.author.username}</p>
					</div>
				</div>

				<div className="more">
					<div className="more_infor">当前共{this.props.allWords}字 共{this.props.joinUsers}人参与</div>
					<div className="history">
						<a href="javascript:">读至 xxx章 xxx作</a>
					</div>
				</div>

				<div className="continue">
					<a href="javascript:">继续阅读</a>
					<div className="small">
						<a href="javascript:">置顶</a>
						<a href="javascript:" index={this.props.bookId} onClick={this.props.cancelFocus}>删除</a>
					</div>
				</div>
			</div>
		)
	}
}

class MyFollow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: Math.ceil(this.props.focus.length / 10),
			pageNow: 1,
			pageShow: 1,
			book:[],
			selbook:[]
		}
		this.getBooks = this.getBooks.bind(this);
		this.goBack = this.goBack.bind(this);
		this.goNext = this.goNext.bind(this);
		this.goPage = this.goPage.bind(this);
		this.handleGo = this.handleGo.bind(this);
		this.cancelFocus = this.cancelFocus.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.selectOne = this.selectOne.bind(this);
		this.delSel = this.delSel.bind(this);
	}

	delSel() {
		const arr = this.state.selbook;
		for( let i = 0; i < arr.length; i ++) {
			this.props.cancelFocus(arr[i], this.props.token, ()=>{
				this.props.getFocus(this.props.token);
			})
		}	
	}

	selectAll() {
		const arr = this.state.book.map( val => {
			return val.bookId;
		})
		const carr = document.getElementsByClassName("check");
		const len = carr.length;
		if(this.state.selbook.length == len - 1) {
			for( let i = 0; i < len; i ++) {
				carr[i].checked = false;
			}
		}else {
			for( let i = 0; i < len; i ++) {
				carr[i].checked = true;
			}
		}
		this.setState({
			selbook: (this.state.selbook.length == len - 1) ? [] : arr
		})
	}

	selectOne(e) {
		const index = Number(e.target.getAttribute("index"));
		let arr = this.state.selbook;
		let arr2;
		if(arr.indexOf(index) == -1) {
			arr.push(Number(index));
		}else {
			arr = arr.filter( val => {
				return val !== Number(index)
			})
		}
		this.setState({
			selbook: arr
		}) 
	}

	cancelFocus(e) {
		let bookId = e.target.getAttribute("index");
		this.props.cancelFocus(bookId, this.props.token,()=>{
			this.props.getFocus(this.props.token);
		})
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
		console.log(this.props.focus.length);
		if(this.props.focus.length) {
			let start = (this.state.pageNow - 1) * 10;
			let end = (start + 10) > this.props.focus.length ? this.props.focus.length : (start + 10);
			this.setState({
				book: this.props.focus.slice(start, end)
			})
		}
	}

	handleChange(e) {
		this.setState({
			pageShow: Number(e.target.value)
		})
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

	componentDidMount() {
		this.getBooks();
	}

	render() {
		const List = this.state.book.map(val => {
			return (
				<FollowItem 
					{...val} 
					key={val.bookId} 
					selectOne={this.selectOne} 
					cancelFocus={this.cancelFocus}
				/>
			)
		})
		return (
			<div className="my_follow">
				{ List }
				<Paging 
					now={this.state.pageNow} 
					show={this.state.pageShow}
					count={this.state.count} 
					goBack={this.goBack}
					goNext={this.goNext}
					goPage={this.goPage}
					handleChange={this.handleChange}
					handleGo={this.handleGo}/>
				<Tab 
					selectAll={this.selectAll}
					delSel={this.delSel}
					/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	focus: state.focus,
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	getFocus: token => dispatch(ACTIONS.FOCUS.getFocus(token)),
	cancelFocus: ( bookId, token, callback) => dispatch(ACTIONS.FOCUS.cancelFocus(bookId, token, callback))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyFollow)