import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'

import './author.less'
import '../../App.less'

class Author extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: window.location.href.split("=")[1],
			userMessage: {},
			simpleUserMessage: {}
		}
		this.getInfor = this.getInfor.bind(this);
		this.addFocus = this.addFocus.bind(this);
	}

	componentDidMount() {
		this.getInfor();	//先获取用户信息
	}

	getInfor() {
		axios.get(`http://47.95.207.40/branch/user/${this.state.userId}`)
			 .then(res => {
			 	console.log(res.data.data);
			 	this.setState({
			 		userMessage: res.data.data.userMessage,
			 		simpleUserMessage: res.data.data.simpleUserMessage
			 	})
			 })
			 .catch(err => {
			 	console.log(err);
			 })
	}

	addFocus() {
		if(!this.props.logif) {
			this.props.showFailPopup("用户未登录!");
			return ;
		}
		const token = this.props.token.access_token || "";
		const userId = this.state.userId;
		const data = { 
			groupId: 0,
			userById: userId,
		}
		axios.put("http://47.95.207.40/branch/user/follow", 
		data: data, 
		{
			headers: {
				"Authorization": `Bearer ${token}`
			}
		}).then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err.response);
		})
	}

	render() {
		return (
			<div className="main_body" id="author">
				<div className="upper">
					<div className="icon"><img src={"http://47.95.207.40/branch/file/user/" + (this.state.userMessage.icon || "default_avatr.jpg")}/></div>
					<div className="infor">
						<div className="inf_bd">
							<h2>{this.state.simpleUserMessage.username}</h2>
							<p></p>
							<p>
								<span>{this.state.userMessage.signText}</span>
							</p>
						</div>
						<div className="inf_dn">
							<div style={{"float": "left"}}>
								<span>关注<span className="num">{this.state.userMessage.followNum}</span></span> 
								<span>粉丝<span className="num">{this.state.userMessage.fansNum}</span></span>
							</div>
							<div className="act_sub">
								<div className="btn focued"><a href="javascript:;" onClick={this.addFocus}>关 注</a></div>
								<div className="btn"><a href="javascript:;">私 信</a></div>
								<div className="btn"><a href="javascript:;">举 报</a></div>
							</div>
						</div>
					</div>
				</div>
				<div className="show">
					<div className="lf_slider">

					</div>
					
					<div className="rt_slider">

					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token,
	logif: state.logif
})

const mapDispatchToProps = dispatch => ({
	showFailPopup: mes => dispatch(ACTIONS.POPUP.showFailPopup(mes)),
	showSucPopup: mes => dispatch(ACTIONS.POPUP.showSucPopup(mes))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Author)