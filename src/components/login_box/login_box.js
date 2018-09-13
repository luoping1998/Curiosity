import React, { Component } from 'react'
import axios from 'axios'

import './login_box.less'

import { handleImg, isPoneAvailable, isPassAvailabel } from '../../public/common.js'

//用户名登录box
class UsernameBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="box_log">
				<div className="box_input">
					<div className="icon log_icon"></div>
					<input type="text" placeholder="请输入用户名" value={this.props.username} onChange={this.props.handleUsernamein}/>
				</div>
				<div className="box_input">
					<div className="icon pass_icon"></div>
					<input type="password" placeholder="请输入密码" value={this.props.pass} onChange={this.props.handlePassin}/>
				</div>
				<div className="btn_input">
					<input type="text" placeholder="请输入验证码" value={this.props.validateCode} onChange={this.props.handlevalidateCodein}/>
					<div className="vcode" onClick={this.props.getImgCode}>
						<a href="javascript:"><img src={this.props.codeSrc} /></a>
					</div>
				</div>
				<p>
					<label><input type="checkbox"/>自动登录</label>
					<a href="javascript:">忘记密码?</a>
				</p>
				<a href="javascript:"><div className="btn" onClick={this.props.loginWithu}>登 录</div></a>
				<p className="center">
					<a href="javascript:" className="left" onClick={this.props.toLogp}>手机验证码登录</a>
					<a href="javascript:" className="right" onClick={this.props.toReg}>免费注册账号</a>
				</p>
			</div>
		)
	}
}

//手机验证登录box
class AccountBox extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="log_box">
				<div className="box_input">
					<div className="icon phone_icon"></div>
					<input type="text" placeholder="输入手机号" value={this.props.account} onChange={this.props.handleAccountin}/>
				</div>
				<div className="btn_input">
					<input type="text" placeholder="输入验证码" value={this.props.vcode} onChange={this.props.handleVcodein}/>
					{
						this.props.getv === false ? 
						(<a href="javascript:" onClick={this.props.getVcode}>获取验证码</a>) : 
						(<div className="wait">请输入验证码</div>)
					}
				</div>
				<p></p>
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

//注册box
class RegBox extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="reg_box">
				<div className="box_input">
					<div className="icon phone_icon"></div>
					<input type="text" placeholder="输入手机号" value={this.props.account} onChange={this.props.handleAccountin}/>
				</div>
				<div className="btn_input">
					<input type="text" placeholder="输入验证码" value={this.props.vcode} onChange={this.props.handleVcodein}/>
					{
						this.props.getv === false ? 
						(<a href="javascript:" onClick={this.props.getVcode}>获取验证码</a>) : 
						(<div className="wait">请输入验证码</div>)
					}
				</div>
				<p></p>
				<p></p>
				<a href="javascript:"><div className="btn" onClick={this.props.toSuc} >下一步</div></a>
				<p className="center">
					<a href="javascript:" className="left" onClick={this.props.toLogp}>手机验证码登录</a>
					<a href="javascript:" className="right" onClick={this.props.toLoga}> 账 号 登 录 </a>
				</p>
			</div>
		)
	}
}

//注册验证成功后的box
class SucBox extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="box_log">
				<div className="box_input">
					<div className="icon log_icon"></div>
					<input type="text" placeholder="输入用户名" value={this.props.username} onChange={this.props.handleUsernamein}/>
				</div>
				
				<div className="box_input">
					<div className={"commit_" + this.props.commitone.color} >{this.props.commitone.words}</div>
					<div className="icon pass_icon"></div>
					<input type="password" placeholder="输入密码" onChange={this.props.handlePassone} value={this.props.passone}/>
				</div>

				<div className="box_input">
					<div className={"commit_" + this.props.committwo.color} >{this.props.committwo.words}</div>
					<div className="icon pass_icon"></div>
					<input type="password" placeholder="确认密码" onChange={this.props.handlePasstwo} value={this.props.passtwo}/>
				</div>

				<p></p>
				<a href="javascript:"><div className="btn" onClick={this.props.register}>注册</div></a>
			</div>
		)
	}
}

//登录注册外部box
class LoginBox extends Component{
	constructor(props) {
		super(props);
		this.state = {
			log : true, 	//选择登录？
			type : 0,		//0:默认账号登录   1:手机号登录
			suc : false,	//验证码验证是否成功
			username: '',	//用户名
			account : '',	//手机号
			vcode : '',		//验证码
			codeSrc: '',	//图片验证码src
			validateCode: '', 	//用户输入的图片验证码
			pass: '',		//密码
			passone : '',	//注册验证时的首次密码
			passtwo : '',	//重复密码
			key: '',		//验证码验证成功返回值
			commitone : {		//提示语句1
				words : '',
				color : 'red'
			},
			committwo : {		//提示语句2
				words : '',
				color : 'red'
			},
			canreg : false,		//是否能注册  检测注册信息是否合法
			getv : false		//是否获取了验证码
		}
		this.toLoga = this.toLoga.bind(this);
		this.toLogp = this.toLogp.bind(this);
		this.toReg = this.toReg.bind(this);
		this.toSuc = this.toSuc.bind(this);

		this.handlePassone = this.handlePassone.bind(this);
		this.handlePasstwo = this.handlePasstwo.bind(this);
		this.handleUsernamein = this.handleUsernamein.bind(this);
		this.handlePassin = this.handlePassin.bind(this);
		this.handleVcodein = this.handleVcodein.bind(this);
		this.handleAccountin = this.handleAccountin.bind(this);
		this.handlevalidateCodein = this.handlevalidateCodein.bind(this);
		this.showFailPopup = this.showFailPopup.bind(this);
		this.showSucPopup = this.showSucPopup.bind(this);

		this.getImgCode = this.getImgCode.bind(this);
		this.getVcode = this.getVcode.bind(this);
		this.register = this.register.bind(this);
		this.clear = this.clear.bind(this);
		this.loginWithu = this.loginWithu.bind(this);
		this.veriFacate = this.veriFacate.bind(this);
	}

	//跳转至账号登录页面
	toLoga() {
		this.setState({
			log : true,
			type : 0,
			suc : false
		})
	}

	//跳转至手机验证登录页面
	toLogp() {
		this.setState({
			log : true,
			type : 1,
			suc : false
		})
	}

	//跳转至注册页面
	toReg() {
		this.setState({
			log : false,
			type : 0,
			suc : false
		})
	}

	//跳转至注册信息页面
	toSuc() {
		//验证验证码然后注册个人信息
		
		if(isPoneAvailable(this.state.account)&&this.state.vcode.length===6){
			this.veriFacate();
		}else {
			this.showFailPopup("请检查您的注册信息！");
		}
	}

	//验证验证码
	veriFacate() {
		axios.get("http://47.95.207.40/branch/code/sms/verificate", {
			headers: {
				deviceId: this.props.uid,
				validateCode: this.state.vcode,
			},
			params: {
				phoneNum: this.state.account
			}
		}).then(res => {
			console.log(res);
			if(!res.status) {
				this.setState({
					suc : true,
					log : false,
					type : 0,
					key: res.message
				})
			}
		}).catch( err => {
			this.showFailPopup(err.response.data.message);
		})
	}

	//以下依次为输入的onChange函数对应的处理事件
	handlePassone(e) {
		let val = e.target.value;
		this.setState({
			passone : val
		},()=>{
			let commit = '';
			let canreg = false;
			let color = "red";
			if(!val) {
				commit = '* 密码不能为空';
			}else if(val.length < 6 || val.length > 30) {
				commit = '* 密码必须在6~30位之间';
			}else {
				commit = '* 通过';
				color = 'green';
				canreg = true;
			}

			let twords = '';
			let tcolor = '';
			if(!this.state.passtwo) {
				twords = '密码不能为空',
				tcolor = 'red';
				canreg = false;
			}else if(val !== this.state.passtwo) {
				twords = '* 两次密码不一致';
				tcolor = 'red';
				canreg = false;
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
				},
				canreg : canreg
			})
			
		})
	}

	handlePasstwo(e) {
		let val = e.target.value;
		this.setState({
			passtwo : val
		},()=>{
			let canreg = false;
			let words = '';
			let color = 'red';
			if(!val) {
				words = '* 密码不能为空';
			}else if(val !== this.state.passone){
				words = '* 两次密码不一致';
			}else {
				words = '* 通过';
				color = 'green';
				canreg = true;

			}

			this.setState({
				committwo : {
					"words" : words,
					"color" : color
					
				},
				"canreg" : canreg
			})
			
		})
	}

	handleUsernamein(e){
		this.setState({
			username: e.target.value
		})
	}

	handleVcodein(e) {
		this.setState({
			vcode: e.target.value
		})
	}

	handlePassin(e) {
		if(e.target.value.length <= 30) {
			this.setState({
				pass: e.target.value
			})
		}
	}

	handleAccountin(e) {
		this.setState({
			account: e.target.value
		})
	}

	handlevalidateCodein(e) {
		this.setState({
			validateCode: e.target.value
		})
	}

	//获取验证码
	getVcode() {
		if(isPoneAvailable(this.state.account)){
			axios.get("http://47.95.207.40/branch/code/phone", {
				headers: {
					deviceId: this.props.uid
				},
				params: {
					phoneNum: this.state.account
				}
			}).then(res => {
				this.showSucPopup(res.data.message);
				this.setState({
					getv : true
				})
			}).catch( err=> {
				this.showFailPopup(err.response.data.message);
			})
			
		}else {
			this.showFailPopup("手机号不合法！");
		}		
	}

	//获取登录验证码
	getImgCode() {
		axios.get("http://47.95.207.40/branch/code/image",{
			headers : {
				"deviceId":this.props.uid
			},
			responseType: 'arraybuffer'
		}).then(res => {
			return handleImg(res.data)
		}).catch(err => {
			console.log(err);
		}).then(data => 
			this.setState({
				codeSrc: data
			})
		)
	}

	//方便组件内部调用
	showSucPopup(mess) {
		this.props.showSucPopup(mess);
	}

	showFailPopup(mess) {
		this.props.showFailPopup(mess);
	}

	//账号登录
	loginWithu() {
		//引入store中的需要用的action
		let { saveToken, hasLogin, handleChange} = this.props;
		if(isPoneAvailable(this.state.username) && isPassAvailabel(this.state.pass)){
			let data = {
				"account": this.state.username,
				"password": this.state.pass
			}
			axios.post("http://47.95.207.40/branch/login",
				data: data,
				{
					headers: {
						"Content-Type" : "application/json",
						"Authorization" : 'Basic YnJhbmNoOnhpeW91M2c=',
						"deviceId" : this.props.uid,
						"validateCode" : this.state.validateCode
					}
				}
			)
			.then(res=>{
				if(res.status === 200) {
					let time = (new Date().getTime())/1000;
					let token = res.data;
					token.time = time;
					saveToken(res.data);
					hasLogin();
					handleChange(false);
					this.showSucPopup("登录成功！");
					this.props.getInfor(this.props.token);
					this.props.getFocus(this.props.token);
					this.props.getStar(this.props.token);
					this.props.getWriter(this.props.token);
				}
			}).catch(err=>{
				console.log(err);
				let mes = '';
				 if(err.response) {
				 	mes = err.response.data.message || err.data.error;
				 }else {
				 	mes= '网络异常！';
				 }
				this.showFailPopup(mes);
				this.getImgCode();
			})

		}else {
			this.showFailPopup("请检查您的登录信息！");
		}
	}

	//手机号登录
	loginWitha(){
	}

	//初始化（清除）state
	clear() {
		this.setState({
			log : true,
			type : 0,	
			suc : false,	
			username: '',	
			account : '',	
			vcode : '',		
			pass: '',		
			passone : '',	
			passtwo : '',	
			commitone : {	
				words : '',
				color : 'red'
			},
			committwo : {	
				words : '',
				color : 'red'
			},
			canreg : false,		
			getv : false	
		})
	}

	//注册
	register() {
		if(this.state.canreg) {
			let data = {
				"username": this.state.username,
				"account": this.state.account,
				"password": this.state.passone
			}
			axios({
				method: "POST",
				url: "http://47.95.207.40/branch/user/register",
				data: data,
				headers: {
					deviceId: this.props.uid,
					key: this.state.key
				}
			}).then(res=>{
				if(!res.data.status) {
					this.showSucPopup("注册成功：快去登录吧！");
					this.clear();
					this.toLoga();
				}else {
					this.showFailPopup(res.data.message);
				}
			}).catch(err=>{
				this.showFailPopup(err.response.data.message);
			})
		}else {
			this.showFailPopup("请检查注册信息");
		}
		this.clear();
	}

	componentDidMount() {
		this.getImgCode();
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
						this.state.type === 0 ? (
							<UsernameBox 								
								username={this.state.username} 
								pass={this.state.pass} 
								codeSrc={this.state.codeSrc}
								validateCode={this.state.validateCode}
								toLogp={this.toLogp} 
								toReg={this.toReg} 
								handleUsernamein={this.handleUsernamein} 
								handlePassin={this.handlePassin}
								handlevalidateCodein={this.handlevalidateCodein}
								loginWithu={this.loginWithu}
								getImgCode={this.getImgCode}
								/>
							) : (
							<AccountBox 							
								vcode={this.state.vcode} 
								account={this.state.account} 
								getv={this.state.getv} 
								toLoga={this.toLoga} 
								toReg={this.toReg} 
								handleAccountin={this.handleAccountin} 
								handleVcodein={this.handleVcodein} 
								getVcode={this.getVcode}
								/> ) 
						) : (
							this.state.suc === false ? (
								<RegBox 
									getv={this.state.getv} 
									account={this.state.account} 
									username={this.state.username} 
									pass={this.state.pass} 
									vcode={this.state.vcode} 
									toLoga={this.toLoga} 
									toLogp={this.toLogp} 
									toSuc={this.toSuc} 
									handleAccountin={this.handleAccountin}
									handlePassin={this.handlePassin} 
									handleUsernamein={this.handleUsernamein} 
									handleVcodein={this.handleVcodein} 
									getVcode={this.getVcode}/>
								) : (
								<SucBox 
									username={this.state.username} 
									commitone={this.state.commitone} 
									committwo={this.state.committwo}
									handlePassone={this.handlePassone} 
									handlePasstwo={this.handlePasstwo} 
									handleUsernamein={this.handleUsernamein} 
									register={this.register}/>
								) 
						)
					}
				
			</div>
		)
	}
}

export default LoginBox