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
						<img className="item_img" src={"http://47.95.207.40/branch " + this.props.bookImage}/>
						<div className="infor_detail">
							<h2 className="infor_name">
							{this.props.bookName}
							</h2>
							<div className="type" style={style}>{cont.words}</div>
							<div className="pub">已发布</div>
						</div>
					</div>
					<div className="details">
						<p>共xxx字 共xxx人参与续写</p>
						<div className="infor_intro">{this.props.content}</div>
					</div>
					<div className="actions">
						<a href="javascript:"><div className="btn">查看详情</div></a>
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
			arr: []
		}
	}

	componentWillMount() {
		axios.get("http://47.95.207.40/branch/user/book",{
			headers: {
				Authorization: "Bearer " + this.props.token.access_token
			}
		}).then(res => {
			this.setState({
				arr: res.data.data
			})
		}).catch(err => {
			if(err.response.data.error === "invalid_token") {
				this.props.showFailPopup("用户未登录或者登录过期")
			}
		})
	}

	render() {
		const List = this.state.arr.map( val => (
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
				<Paging />
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