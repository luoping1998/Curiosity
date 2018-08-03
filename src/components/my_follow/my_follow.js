import React, {Component} from 'react'
import {
	Link,
	Route,
	NavLink
} from 'react-router-dom'

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
				<input type="checkbox" className="check"/>全选
				</label>
				<a href="javascript:">置顶</a>
				<a href="javascript:">删除</a>
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
			"background" : "url(" + require("../../imgs/90.jpg") + ") no-repeat",
			"backgroundSize": "100% auto",
			"backgroundPosition": "center"
		}

		return (
			<div className="my_follow_item">
				<div className="item_infor">
					<input type="checkbox" className="check" />
					<div className="item_img" style={style}>
						<div className={"item_state"+"_updating"}>更新中</div>
					</div>
					<div className="infor">
						<h3 className="tit">
							<a href="javascript:">首长的异能小均系</a>
						</h3>
						<p className="name">小唐瑶瑶</p>
					</div>
				</div>

				<div className="more">
					<div className="more_infor">当前共xx字 共2人参与</div>
					<div className="history">
						<a href="javascript:">读至 xxx章 xxx作</a>
					</div>
				</div>

				<div className="continue">
					<a href="javascript:">继续阅读</a>
					<div className="small">
						<a href="javascript:">置顶</a>
						<a href="javascript:">删除</a>
					</div>
				</div>
			</div>
		)
	}
}

class MyFollow extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="my_follow">
				<FollowItem />
				<Paging count={9} now={2} />
				<Tab />
			</div>
		)
	}
}

export default MyFollow