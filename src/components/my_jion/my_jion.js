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
	if(val != "STATUS_DRAFT") {
		cont = {
			color: "blue",
			words: "已发布",
			status: 1
		}
	}
	return cont;
}

class Item extends Component {
	constructor(props) {
		super(props);
	}
	//待完善
	delItem() {
		axios.delete("http://47.95.207.40/branch/branch/" + this.props.branchId, {
			headers: {

			}
		})
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
					<div className="act_item">
						<a href="javascript:;">
							<div className="icon del"></div>
							<p className="words">删除</p>
						</a>
					</div>
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
		console.log(this.props);
		const List = this.props.chars.map((val) => (
			<Item {...val} key={val.branchId} bookName={this.props.book.bookName}/>
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
	}

	render() {
		console.log(this.props.writer);
		const List = this.props.writer.map(val => (
			<JionItem 
				chars={val.myWriteBranchDTOS} 
				key={val.simpleBookDTO.bookId} 
				book={val.simpleBookDTO}
			/>
		))
		return (
			<div className="jion_item">
				{List}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	writer: state.writer
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyJion)