//我的收藏页面
import React , {Component} from 'react'
import './my_jion.less'
import {changeStyle} from '../../public/common.js'
import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'
import { withRouter } from 'react-router-dom'

import axios from 'axios'

function getStatus(val) {
	let cont = {
		color: "red",
		words: "未发布",
		status: 0
	}
	if(val == "STATUS_ONLINE") {
		cont = {
			color: "blue",
			words: "已发布",
			status: 1
		}
	}else if(val == 'STATUS_RECYCLE') {
		cont = {
			color: "gray",
			words: "回收站",
			status: 2
		}
	}
	return cont;
}

class Item extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const cont = getStatus(this.props.status);
		const style = {
			color: cont.color,
			border: "1px solid " + cont.color
		}
		return (
			<div className="item_body">
				<p className="status" style={style}>{cont.words}</p>
				<h3>
					{
						cont.status ? (
								<a href={"/read?branchId=" + this.props.branchId}>{this.props.title}</a>
							) : (
								<a href={"/write?branchId=" + this.props.branchId + "&bookName=" + this.props.bookName + "&id=" + this.props.branchId}>{this.props.title}</a>
							)
					}
				</h3>
				<div className="cont">
					<p className="intro">{this.props.summary}</p>
					<p className="time">{this.props.createTime}</p>
				</div>
				<div className="action">
					<div className="act_item">
						<div className="icon like"></div>
						<p className="words">点赞数</p>
						<p className="words">{this.props.likeNum}</p>
					</div>
					<div className="act_item">
						<div className="icon tucao"></div>
						<p className="words">吐槽数</p>
						<p className="words">{this.props.dislikeNum}</p>
					</div>
					{
						(cont.status == 0) ? (
							<div className="act_item" >
								<a href="javascript:;" onClick={this.props.delItem} index={this.props.branchId}>
									<div className="icon del" index={this.props.branchId}></div>
									<p className="words" index={this.props.branchId}>删除</p>
								</a>
							</div>
						) : ((cont.status == 2) ? (
							<div className="act_item" >
								<a href="javascript:;" onClick={this.props.reStore} index={this.props.branchId}>
									<div className="icon res" index={this.props.branchId}></div>
									<p className="words" index={this.props.branchId}>恢复</p>
								</a>
							</div>
							): "")
					}

				</div>
			</div>
		)
	}
}

class JionItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}
	render() {
		const List = this.props.chars.map((val) => (
			<Item 
				{...val} 
				key={val.branchId} 
				bookName={this.props.book.bookName}
				delItem={this.props.delItem}
				reStore={this.props.reStore}
			/>
		))
		const cont = changeStyle(this.props.book.bookType);
		const style = {
			color: cont.color,
			border: "1px solid " + cont.color
		}
		return (
			<div className="book_item">
				<div className="book_item">
					<div className="book_header">
						<h2>{this.props.book.bookName}<span className="type" style={style}>{cont.words}</span></h2>
						<p>{this.props.book.author.username}</p>
						{
							this.state.show ? 
							(<a href="javascript:;" onClick={()=>{this.setState({show: false})}}><div className="show">▼</div></a>) 
							:(<a href="javascript:;" onClick={()=>{this.setState({show: true})}}><div className="show">▶</div></a>) 
						}
					</div>
					{ this.state.show ? List : ""}
				</div>
			</div>
		)
	}
}

class MyJion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 1
		}
		this.delItem = this.delItem.bind(this);
		this.reStore = this.reStore.bind(this);
	}

	delItem(e) {
		const branchId = e.target.getAttribute("index");
		axios.delete("http://47.95.207.40/branch/branch/" + branchId, {
			headers: {
				"Authorization": "Bearer " + this.props.token.access_token
			}
		}).then(res => {
			this.props.getDraft(this.props.token);
			this.props.getRecycle(this.props.token);
			this.props.showSucPopup(res.data.message);
		}).catch(err => {
			console.log(err);
		})
	}

	reStore(e) {
		const branchId = e.target.getAttribute("index");
		axios({
			method: "POST",
				url: `http://47.95.207.40/branch/branch/${branchId}/restore`,
				headers: {
					"Authorization": "Bearer " + this.props.token.access_token
				}
		}).then(res => {
			this.props.getRecycle(this.props.token);
			this.props.getDraft(this.props.token);
			this.props.showSucPopup(res.data.message);
		}).catch(err => {
			console.log(err);
		})
	}

	render() {
		const pubList = this.props.writer.map(val => (
			<JionItem 
				chars={val.myWriteBranchDTOS} 
				key={val.simpleBookDTO.bookId} 
				book={val.simpleBookDTO}
				token={this.props.token.access_token}
				delItem={this.delItem}
			/>
		))

		const draList = this.props.draft.map(val => (
			<JionItem 
				chars={val.myWriteBranchDTOS} 
				key={val.simpleBookDTO.bookId} 
				book={val.simpleBookDTO}
				token={this.props.token.access_token}
				delItem={this.delItem}
			/>
		))

		const reList = this.props.recycle.map(val => (
			<JionItem 
				chars={val.myWriteBranchDTOS} 
				key={val.simpleBookDTO.bookId} 
				book={val.simpleBookDTO}
				token={this.props.token.access_token}
				reStore={this.reStore}
			/>
		))

		return (
			<div className="jion_item">
				<ul className="jion_header">
					<a href="javascript:;" onClick={()=>{this.setState({index: 1})}}>
						<li className={ (this.state.index == 1) ? "active" : ""}>
							<span className="show">√ </span>已发布
						</li>
					</a> 
					<a href="javascript:;" onClick={()=>{this.setState({index: 2})}}>
						<li className={ (this.state.index == 2) ? "active" : ""}>
							<span className="show">√ </span>草稿箱
						</li>
					</a>
					<a href="javascript:;" onClick={()=>{this.setState({index: 3})}}>
						<li className={ (this.state.index == 3) ? "active" : ""}>
							<span className="show">√ </span>回收站
						</li>
					</a>
				</ul>
				{
					this.state.index == 1 ? (pubList) : (this.state.index == 2 ? (draList) : (reList))
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	writer: state.writer,
	draft: state.draft,
	recycle: state.recycle,
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	showSucPopup: mess => dispatch(ACTIONS.POPUP.showSucPopup(mess)),
	showFailPopup: mess => dispatch(ACTIONS.POPUP.showFailPopup(mess)),
	getWriter: token => dispatch(ACTIONS.WRITER.getWriter(token)),
	getDraft: token => dispatch(ACTIONS.DRAFT.getDraft(token)),
	getRecycle: token => dispatch(ACTIONS.RECYCLE.getRecycle(token))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyJion)