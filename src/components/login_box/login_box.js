import React, { Component } from 'react';
import client from '../../api';
import { handleImg, isPoneAvailable, isPassAvailabel } from '../../public/common.js';
import { UsernameBox, SucBox, RegBox, AccountBox } from './boxs';
import './login_box.less';

const initialState = {
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
};

//登录注册外部box
class LoginBox extends Component{
	constructor(props) {
		super(props);
		this.state = initialState;
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

		this.renderType = this.renderType.bind(this);
		this.renderSuc = this.renderSuc.bind(this);
		this.renderBox = this.renderBox.bind(this);
	}
	
	componentDidMount() {
		this.getImgCode();
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
		if(isPoneAvailable(this.state.account) && this.state.vcode.length === 6) {
			this.veriFacate();
		}else {
			this.showFailPopup("请检查您的注册信息！");
		}
	}

	//以下依次为输入的onChange函数对应的处理事件
	handlePassone(e) {
		let val = e.target.value;
		this.setState({
			passone : val
		}, ()=>{
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

	//验证验证码
	veriFacate() {
		const { uid } = this.props;
		const { vcode, account } = this.state;
		client.veriFacate(uid, vcode, account)
		.then(res => {
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
	
	//获取验证码
	getVcode() {
		if(isPoneAvailable(this.state.account)){
			client.getVcode(this.props.uid, this.state.account)
			.then(res => {
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
		client.getImgCode(this.props.uid)
		.then(res => {
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
		const { uid, saveToken, hasLogin, handleChange} = this.props;
		const { username, pass, validateCode } = this.state;
		if(isPoneAvailable(this.state.username) && isPassAvailabel(this.state.pass)){
			const data = {
				account: username,
				password: pass
			};

			client.login(uid, data, validateCode)
			.then(res=>{
				if(res.status === 200) {
					let time = (new Date().getTime()) / 1000;
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
					this.props.getDraft(this.props.token);
					this.props.getRecycle(this.props.token);
				}
			}).catch(err=>{
				console.error(err);
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

	//注册
	register() {
		const { canreg, username, account, passone, key } = this.state;
		if(canreg) {
			const data = {
				username,
				account,
				password: passone
			};
			
			client.register(this.props.uid, data, key)
			.then(res=>{
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

	//初始化（清除）state
	clear() {
		this.setState(initialState)
	}

	renderType() {
		const {
			account,
			codeSrc,
			type,
			pass,
			getv,
			username,
			vcode,
			validateCode
		} = this.state;

		if (type === 0) {
			return (
				<UsernameBox 								
					username={username} 
					pass={pass} 
					codeSrc={codeSrc}
					validateCode={validateCode}
					toLogp={this.toLogp} 
					toReg={this.toReg} 
					handleUsernamein={this.handleUsernamein} 
					handlePassin={this.handlePassin}
					handlevalidateCodein={this.handlevalidateCodein}
					loginWithu={this.loginWithu}
					getImgCode={this.getImgCode}
				/>
			)
		}
		return (
			<AccountBox 							
				vcode={vcode} 
				account={account} 
				getv={getv} 
				toLoga={this.toLoga} 
				toReg={this.toReg} 
				handleAccountin={this.handleAccountin} 
				handleVcodein={this.handleVcodein} 
				getVcode={this.getVcode}
			/>
		) 
	}

	renderSuc() {
		const {
			account,
			commitone,
			committwo,
			pass,
			getv,
			suc,
			username,
			vcode
		} = this.state;

		if (suc) {
			return (
				<SucBox 
					username={username} 
					commitone={commitone} 
					committwo={committwo}
					handlePassone={this.handlePassone} 
					handlePasstwo={this.handlePasstwo} 
					handleUsernamein={this.handleUsernamein} 
				register={this.register}
				/>
			)
		}

		return (
			<RegBox 
				getv={getv} 
				account={account} 
				username={username} 
				pass={pass} 
				vcode={vcode} 
				toLoga={this.toLoga} 
				toLogp={this.toLogp} 
				toSuc={this.toSuc} 
				handleAccountin={this.handleAccountin}
				handlePassin={this.handlePassin} 
				handleUsernamein={this.handleUsernamein} 
				handleVcodein={this.handleVcodein} 
				getVcode={this.getVcode}
			/>
		)
	}

	renderBox() {
		if (this.state.log) {
			return this.renderType();
		}
		return this.renderSuc();
	}

	render() {
		const { log } = this.state;
		return (
			<div className="login_box" onClick={(e)=>e.stopPropagation()}>
				<ul className="box_header">
					<div className="close"></div>
					<li>
						<a href="javascript:" 
							className={ log ? "active" : "outline"} onClick={this.toLoga}>
							登 录
						</a>
					</li>
					<li>
						<a href="javascript:"
							className={ log ? "outline" : "active"} onClick={this.toReg}>
							注 册
						</a>
					</li>
				</ul>
				{ this.renderBox() }
			</div>
		)
	}
}

export default LoginBox