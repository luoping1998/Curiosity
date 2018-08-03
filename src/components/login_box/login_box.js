import React, { Component } from 'react'
import './login_box.less'

class AccountBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="box_log">
				<div className="box_input">
					<div className="icon log_icon"></div>
					<input type="text" placeholder="账号登录"/>
				</div>
				<div className="box_input">
					<div className="icon pass_icon"></div>
					<input type="password" placeholder="输入密码"/>
				</div>
				<p>
					<label><input type="checkbox"/>自动登录</label>
					<a href="javascript:">忘记密码?</a>
				</p>
				<a href="javascript:"><div className="btn">登 录</div></a>
				<p className="center">
					<a href="javascript:" className="left" onClick={this.props.toLogp}>手机验证码登录</a>
					<a href="javascript:" className="right" onClick={this.props.toReg}>免费注册账号</a>
				</p>
			</div>
		)
	}
}

class PhoneBox extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="log_box">
				<div className="box_input">
					<div className="icon phone_icon"></div>
					<input type="text" placeholder="输入手机号"/>
				</div>
				<div className="btn_input">
					<input type="text" placeholder="输入验证码"/>
					<a href="javascript:">获取验证码</a>
				</div>
				<p></p>
				<a href="javascript:"><div className="btn">登录</div></a>
				<p className="center">
					<a href="javascript:" className="left" onClick={this.props.toLoga}>账号登录</a>
					<a href="javascript:" className="right" onClick={this.props.toReg}>免费注册账号</a>
				</p>
			</div>
		)
	}
}

class RegBox extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="reg_box">
				<div className="box_input">
					<div className="icon phone_icon"></div>
					<input type="text" placeholder="输入手机号"/>
				</div>
				<div className="btn_input">
					<input type="text" placeholder="输入验证码"/>
					<a href="javascript:">获取验证码</a>
				</div>
				<p></p>
				<a href="javascript:"><div className="btn" onClick={this.props.toSuc} >下一步</div></a>
				<p className="center">
					<a href="javascript:" className="left" onClick={this.props.toLogp}>手机验证码登录</a>
					<a href="javascript:" className="right" onClick={this.props.toLoga}>账号登录</a>
				</p>
			</div>
		)
	}
}

class SucBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			passone : '',
			passtwo : '',
			commitone : {
				words : '',
				color : 'red'
			},
			committwo : {
				words : '',
				color : 'red'
			}
		}
		this.handlePassone = this.handlePassone.bind(this);

		this.handlePasstwo = this.handlePasstwo.bind(this);
	}

	handlePassone(e) {
		let val = e.target.value;
		this.setState({
			passone : val
		},()=>{
			let commit = '';
			let color = "red";
			if(!val) {
				commit = '* 密码不能为空';
			}else if(val.length < 2) {
				commit = '* 密码不能少于2位';
			}else {
				commit = '* 通过';
				color = 'green';
			}

			let twords = '';
			let tcolor = '';
			if(!this.state.passtwo) {
				twords = '密码不能为空',
				tcolor = 'red';
			}else if(val !== this.state.passtwo) {
				twords = '* 两次密码不一致';
				tcolor = 'red';
			}else {
				twords ='* 通过';
				tcolor = 'green';
			}

			this.setState({
				commitone : {
					"words" : commit,
					"color" : color
				},
				committwo : {
					"words" : twords,
					"color" : tcolor
				}
			})
			
		})
	}

	handlePasstwo(e) {
		let val = e.target.value;
		this.setState({
			passtwo : val
		},()=>{
			let words = '';
			let color = 'red';
			if(!val) {
				words = '* 密码不能为空';
			}else if(val !== this.state.passone){
				words = '* 两次密码不一致';
			}else {
				words = '* 通过';
				color = 'green';

			}
			this.setState({
				committwo : {
					"words" : words,
					"color" : color
				}
			})
			
		})
	}

	render() {
		return (
			<div className="box_log">
				<div className="box_input">
					<div className="icon log_icon"></div>
					<input type="text" placeholder="输入用户名"/>
				</div>
				
				<div className="box_input">
					<div className={"commit_" + this.state.commitone.color} >{this.state.commitone.words}</div>
					<div className="icon pass_icon"></div>
					<input type="password" placeholder="输入密码" onChange={this.handlePassone} value={this.state.passone}/>
				</div>

				<div className="box_input">
					<div className={"commit_" + this.state.committwo.color} >{this.state.committwo.words}</div>
					<div className="icon pass_icon"></div>
					<input type="password" placeholder="确认密码" onChange={this.handlePasstwo} value={this.state.passtwo}/>
				</div>

				<p></p>
				<a href="javascript:"><div className="btn">注册</div></a>
			</div>
		)
	}
}

class LoginBox extends Component{
	constructor(props) {
		super(props);
		this.state = {
			log : true,
			type : 0,	//默认账号登录
			suc : false
		}
		this.toLoga = this.toLoga.bind(this);
		this.toLogp = this.toLogp.bind(this);
		this.toReg = this.toReg.bind(this);
		this.toSuc = this.toSuc.bind(this);
	}

	toLoga() {
		this.setState({
			log : true,
			type : 0,
			suc : false
		})
	}

	toLogp() {
		this.setState({
			log : true,
			type : 1,
			suc : false
		})
	}

	toReg() {
		this.setState({
			log : false,
			type : 0,
			suc : false
		})
	}

	toSuc() {
		this.setState({
			suc : true,
			log : false,
			type : 0
		})
	}

	render() {
		return (
			<div className="login_box" onClick={(e)=>e.stopPropagation()}>
				<ul className="box_header">
					<div className="close"></div>
					<li>
						<a href="javascript:" 
							className={ this.state.log===true ? "active" : "outline"} onClick={this.toLoga}>
							登 录
						</a>
					</li>
					<li>
						<a href="javascript:"
							className={ this.state.log===true ? "outline" : "active"} onClick={this.toReg}>
							注 册
						</a>
					</li>
				</ul>
				{ 
					this.state.log === true ? ( 
						this.state.type === 0 ? (<AccountBox toLogp={this.toLogp} toReg={this.toReg} />) : (<PhoneBox toLoga={this.toLoga} toReg={this.toReg} />) 
						) :(
							this.state.suc === false ? (<RegBox toLoga={this.toLoga} toLogp={this.toLogp} toSuc={this.toSuc} />) : (<SucBox />) 
						)
					}
				
			</div>
		)
	}
}

export default LoginBox