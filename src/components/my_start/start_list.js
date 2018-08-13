import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Paging from '../paging/paging.js'
import './my_start.less'
class StartCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div className="start_item">
					<div className="item_infor">
						<img className="item_img"/>
						<div className="infor_detail">
							<h2 className="infor_name">
							这是书名啊兄弟
							</h2>
							<div className="type">古代言情</div>
							<div className="pub">已发布</div>
						</div>
					</div>
					<div className="details">
						<p>共xxx字 共xxx人参与续写</p>
						<div className="infor_intro"></div>
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
	}

	render() {
		return (
			<div className="my_start">
				<div className="start_header">
					<Link to="/my/shelf/my_start/add">
						<div className="btn"> <span className="big">+</span> 添加发起</div>
					</Link>
				</div>
				<StartCard/>
				<StartCard/>
				<StartCard/>
				<Paging />
			</div>
		)
	}
}

export default StartList