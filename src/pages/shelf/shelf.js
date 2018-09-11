import React, {Component} from 'react'
import {
	Link,
	Route,
	Redirect,
	Switch
} from 'react-router-dom'

import '../myself/myself.less'

import MyFollow from '../../components/my_follow/my_follow.js'	//我的关注
import SubLeader from '../../components/sub_leader/sub_leader.js'		
import MyStart from '../../components/my_start/my_start.js'		//我的发起
import MyCollect from '../../components/my_collect/my_collect.js' 	//收藏
import MyJion from '../../components/my_jion/my_jion.js'	//我的参与
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
					<Route path="/my/shelf/my_start" component={MyStart} />
					<Route path="/my/shelf/my_collect" component={MyCollect} />
					<Route path="/my/shelf/my_jion" component={MyJion} />
				</Switch>
			</div>
		)
	}
}

export default Shelf