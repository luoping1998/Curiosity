import React, {Component} from 'react'
import {
	Link,
	Route,
	NavLink,
	Redirect,
	Switch
} from 'react-router-dom'

import SubLeader from '../../components/sub_leader/sub_leader.js'
import MyInform from '../../components/my_inform/my_inform.js'
import MyChat from '../../components/my_chat/my_chat.js'

import './message.less'

class Message extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const lists = [
			{
				src: "/my/message/inform",
				words : "通知"
			},
			{
				src: "/my/message/chat",
				words : "聊天"
			}
		]
		return (
			<div className="myself_cont">
				<SubLeader lists={lists} />
				<Switch>
					<Route path="/my/message/inform" component={MyInform} />
					<Redirect exact path="/my/message" to={{pathname: "/my/message/inform"}} />
					<Route path="/my/message/chat" component={MyChat} />
				</Switch>
			</div>
		)
	}
}

export default Message