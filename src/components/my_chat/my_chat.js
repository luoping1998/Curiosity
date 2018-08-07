import React, {Component} from 'react'
import './my_chat.less'

class ChatBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="chat_box">
				<div className="inner_box">
					<div className="box_header"></div>
					<div className="box_body"></div>
					<div className="box_input"></div>
				</div>
			</div>
		)
	}
}

class ChatItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="chat_item">
				<img className="item_img" />
				<div className="item_infor">
					<h3 className="infor_name">一个好友的名字</h3>
					<p className="infor_mess">上一次的话balabalabalabala</p>
				</div>
				<div className="item_data">昨天</div>
			</div>
		)
	}
}

class MyChat extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="my_chat">
				<ChatBox />
				<div className="chat_list">
					<ChatItem />
				</div>
			</div>
		)
	}
}

export default MyChat