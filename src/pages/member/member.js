import React, {Component} from 'react'
import {
	Link,
	Route,
	NavLink
} from 'react-router-dom'
import axios from 'axios'

import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'

import '../myself/myself.less'
import './member.less'

class Member extends Component {
	constructor(props) {
		super(props);
		this.state = {
			change : false
		}

		this.handleSignin = this.handleSignin.bind(this);
		this.handleNamein = this.handleNamein.bind(this);
		this.updateToken = this.updateToken.bind(this);
		this.change = this.change.bind(this);
		this.save = this.save.bind(this);
	}

	handleNamein(e) {
		this.setState({
			name: e.target.value
		})
	}

	handleSignin(e) {
		this.props.updateSign(e.target.value);
	}

	change() {
		this.setState({
			change: true
		})
	}

	updateToken() {
		this.props.updateToken(this.props.token);
	}

	save() {
		axios.post("http://47.95.207.40/branch/me",
			{
				signText: this.props.infor.signText
			},
			{
				headers: {
					Authorization: "Bearer " + this.props.token.access_token
				}
			}
		).then(res => {
			if(!res.data.status) {
				this.props.showSucPopup("修改成功！");
				this.setState({
					change: false
				})
			}else {
				this.props.showFailPopup(res.data.message);
			}
		}).catch(err => {
			this.props.showFailPopup(err.message);
		})
	}

	render() {
		return (
			<div className="myself_cont member">
				<div className="inner_box">
					{
						this.state.change ? 
						(
							<div className="box_header">
								<div className="save_icon" onClick={this.save}>
									<a href="javascript:" title="保存"></a>
								</div>
								<div className="avater">
									<img src={"http://47.95.207.40/branch/file/user/" + this.props.infor.icon} />
									<input type="file"/>
								</div>
								<div className="box_infor">
									<input className="name" type="text" value={this.props.infor.username} onChange={this.handleNamein} />
									<p className="id">{this.props.infor.account}</p>
									<input className="sign" type="text" value={this.props.infor.signText} onChange={this.handleSignin} />
								</div>
							</div>
						) : (
							<div className="box_header">
								<div className="change_icon" onClick={this.change}>
									<a href="javascript:" title="修改"></a>
								</div>
								<div className="avater">
									<img src={"http://47.95.207.40/branch/file/user/" + this.props.infor.icon}/>
								</div>
								<div className="box_infor">
									<h1 className="name">{this.props.infor.username} </h1>
									<p className="id" style={{"paddingTop":"10px"}}>{this.props.infor.account} </p>
									<p className="sign" style={{"paddingTop":"10px"}}>{this.props.infor.signText}</p>
								</div>
							</div>
						)
					}
					<div className="box_cards">
						<div className="card"></div>
						<div className="card"></div>
						<div className="card"></div>
					</div>
					<div className="box_works">
						<h2 className="works_header">
							我的足迹:
						</h2>
						<div className="works_lists">
							<div className="list_item"></div>
							<div className="list_item"></div>
							<div className="list_item"></div>
							<div className="list_item"></div>
							<div className="list_item"></div>
							<div className="list_item"></div>
							<div className="list_item"></div>
							<div className="list_item"></div>
						</div>
					</div>
				</div>
				<a href="javascript:" onClick={this.updateToken}>updateToken</a>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	infor: state.infor,
	token: state.token,
	uid: state.guid
})

const mapDispatchToProps = dispatch => ({
	saveInfor: infor => dispatch(ACTIONS.INFOR.saveInfor(infor)),
	showSucPopup: mess => dispatch(ACTIONS.POPUP.showSucPopup(mess)),
	showFailPopup: mess => dispatch(ACTIONS.POPUP.showFailPopup(mess)),
	updateSign: sign => dispatch(ACTIONS.INFOR.updateSign(sign)),
	updateToken: token => dispatch(ACTIONS.TOKEN.updateToken(token))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Member)