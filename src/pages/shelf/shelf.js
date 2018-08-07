import React, {Component} from 'react'
import {
	Link,
	Route,
	Redirect,
	Switch
} from 'react-router-dom'

import '../myself/myself.less'

import MyFollow from '../../components/my_follow/my_follow.js'
import SubLeader from '../../components/sub_leader/sub_leader.js'

class Shelf extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const lists = [
			{
				src : "/my/shelf/my_follow",
				words : "我的关注"
			},
			{
				src : "/my/shelf/my_collect",
				words : "我的收藏"
			},
			{
				src : "/my/shelf/my_jion",
				words : "我的参与"
			},
			{
				src : "/my/shelf/my_start",
				words : "我的发起"
			},
		]
		return (
			<div className="myself_cont">
				<SubLeader lists={lists} />
				<Switch>
					<Route path="/my/shelf/my_follow" component={MyFollow} />
					<Redirect exact path="/my/shelf" to={{pathname: "/my/shelf/my_follow"}} />
				</Switch>
			</div>
		)
	}
}

export default Shelf