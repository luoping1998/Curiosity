import React, { Component } from 'react'
import axios from 'axios'

import {changeStyle} from '../../public/common.js'
import '../../App.less'
import './toplist.less'

function chanList(type) {
	switch(type) {
		case 0: 
			return {
				header: "阅读榜",
				num: "阅读量",
				proper: "readNum"				
			}
		case 1:
			return {
				header: "评论榜",
				num: "评论量",
				proper: "commentNum"				
			}
		case 2:
			return {
				header: "关注榜",
				num: "关注量",
				proper: "focusOnNum"							
			}
		case 3:
			return {
				header: "续写榜",
				num: "续写量",
				proper: "branchNum"							
			}
		case 4:
			return {
				header: "进度榜",
				num: "进度量",
				proper: "maxLayer"							
			}
		case 5:
			return {
				header: "参与榜",
				num: "参与量",
				proper: "joinUsers"							
			}
		case 6:
			return {
				header: "字数榜",
				num: "总字数",
				proper: "allWords"							
			}
		case 7:
			return {
				header: "新书榜",
				proper: ""							
			}
	}
}

class ListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}

		this.getReads = this.getReads.bind(this);
		this.getFocus = this.getFocus.bind(this);
		this.getComment = this.getComment.bind(this);
		this.getBranch = this.getBranch.bind(this);
		this.getLayer = this.getLayer.bind(this);
		this.getUsers = this.getUsers.bind(this);
		this.getWords = this.getWords.bind(this);
		this.getTimes = this.getTimes.bind(this);
	
	}

	getReads() {
		const params = {
			pageSize: 10,
			sort: 'READ_NUM',
			sortType: '1'
		}
		axios.get("http://47.95.207.40/branch/book",{
			params
		}).then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}

	getFocus() {
		const params = {
			pageSize: 10,
			sort: 'FOUCUS_ON',
			sortType: '1'
		}
		axios.get("http://47.95.207.40/branch/book",{
			params
		}).then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}

	getComment() {
		const params = {
			pageSize: 10,
			sort: 'COMMENT',
			sortType: '1'
		}
		axios.get("http://47.95.207.40/branch/book",{
			params
		}).then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}

	getBranch() {
		const params = {
			pageSize: 10,
			sort: 'BRANCH_NUM',
			sortType: '1'
		}
		axios.get("http://47.95.207.40/branch/book",{
			params
		}).then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}

	getLayer() {
		const params = {
			pageSize: 10,
			sort: 'LAYER',
			sortType: '1'
		}
		axios.get("http://47.95.207.40/branch/book",{
			params
		}).then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}

	getUsers() {
		const params = {
			pageSize: 10,
			sort: 'JOIN_USERS',
			sortType: '1'
		}
		axios.get("http://47.95.207.40/branch/book",{
			params
		}).then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}

	getWords() {
		const params = {
			pageSize: 10,
			sort: 'WORDS',
			sortType: '1'
		}
		axios.get("http://47.95.207.40/branch/book",{
			params
		}).then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}

	getTimes() {
		const params = {
			pageSize: 10,
			sort: 'CREATE_TIME',
			sortType: '1'
		}
		axios.get("http://47.95.207.40/branch/book",{
			params
		}).then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}

	componentWillMount(){
		switch(this.props.type) {
			case 0: 
				this.getReads();
				break;
			case 1:
				this.getComment();
				break;
			case 2:
				this.getFocus();
				break;
			case 3:
				this.getBranch();
				break;
			case 4:
				this.getLayer();
				break;
			case 5:
				this.getUsers();
				break;
			case 6:
				this.getWords();
				break;
			case 7:
				this.getTimes();
				break;
		}
	}

	render() {
		const per = chanList(this.props.type);
		const One = this.state.list.length ? this.state.list[0] : {};
		const Lists = this.state.list.length ? (this.state.list.splice(1,9).map((val, index) => {
			console.log(val);
			return (
				<div className="other" key={val.bookId}>
					<div className={"num" + ((index <= 1) ? (index + 2) : "")}>{index + 2}</div>
					<div className="infor"><a href={"/book_details?bookId="+One.bookId}>{val.bookName}</a><div className="r_num">{val[per.proper]}</div></div>
				</div>
			)
		})) : []
		return (
			<div className="list_item">
				<h2>{per.header}</h2>
				<div className="first">
					<div className="infor">
						<div className="num">No.1</div>
						<h3 className="i_hd"><a href={"/book_details?bookId="+One.bookId}>{One.bookName}</a></h3>
						<div className="i_hd special">{One[per.proper]}<span className="small">{per.num}</span></div>
						<div className="author">{changeStyle(One.bookType).words}·<a href={"/author?userId=" + (One.author ? One.author.userId :"")}>{One.author ? One.author.username : ""}</a></div>
					</div>
					<img src={"http://47.95.207.40/branch/file/book/" + (One.bookImage ? One.bookImage : "default_book.jpg")}/>
				</div>
				{Lists}
			</div>
		)
	}
}

class Toplist extends Component{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="main_body toplist">
				<ListItem type={0}/>
				<ListItem type={1}/>
				<ListItem type={2}/>
				<ListItem type={3}/>
				<ListItem type={4}/>
				<ListItem type={5}/>
				<ListItem type={6}/>
				<ListItem type={7}/>
			</div>
		)
	}
}

export default Toplist