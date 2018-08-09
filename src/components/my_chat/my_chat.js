import React, {Component} from 'react'
import './my_chat.less'

class FriTalk extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="friend_box">
				<img className="avater"/>
				<div className="content">{this.props.words}</div>
			</div>
		)
	}
}

class MeTalk extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="me_box">
				<div className="content">{this.props.words}</div>
				<img className="avater"/>
			</div>
		)
	}
}

class ChatBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="chat_box">
				<div className="inner_box">
					<div className="box_header">
						<img className="avater"/>
						<div className="infor">
							<h3 className="name">这是一个好友的昵称</h3>
							<p className="sign">这是它的签名</p>
						</div>
					</div>
					<div className="box_body">
						<FriTalk words="哼╭(╯^╰)╮！"/>
						<FriTalk words="大傻逼！"/>
						<MeTalk words="略略略"/>
						<FriTalk words="balabalablablabalablablablabalablablablabalablabalablabalabla"/>	
						<MeTalk words="balabalablablabalablablablabalablablablabalablabalablabalabla"/>	
					</div>
					<div className="box_input">
						<input type="text" placeholder="输入你想说的话"/>
						<div className="btns">
							<div className="mood_btn"><a href="javascript:" title="表情"></a></div>
							<div className="send_btn"><a href="javascript:" title="发送"></a></div>
						</div>
					</div>
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
				<div className="item_data">1</div>
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
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
				</div>
			</div>
		)
	}
}

export default MyChat