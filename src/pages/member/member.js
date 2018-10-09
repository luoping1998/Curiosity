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


function move(obj) {
    obj.onmousedown = function(e) { //鼠标按下事件
        e = e || window.event; //事件对象
        let x_down = e.clientX; //鼠标按下X的坐标
        let y_down = e.clientY; //鼠标按下Y的坐标
        let leftDown = this.offsetLeft; //获取盒子的初始left值
        let topDown = this.offsetTop; //获取盒子的初始top值

        document.onmousemove = function(e) { //鼠标移动事件
            e = e || window.event;
            let x_move = e.clientX; //鼠标移动X的坐标
            let y_move = e.clientY; //鼠标移动Y的坐标
            //移动的减去按下的坐标坐标 = 移动的距离
            let x_now = x_move - x_down;
            let y_now = y_move - y_down;
            let ow = obj.offsetWidth;
			let oh = obj.offsetHeight;

            if(ow + leftDown + x_now <= 160) {
	            obj.style.left = 160 - ow + 'px';
	        }else if(leftDown + x_now >= 0){
	            obj.style.left = '0px';
	        }
	        else{
	            obj.style.left = leftDown + x_now + 'px';
            }

            if(oh + topDown + y_now <= 160) {
            	obj.style.top = 160 - oh + 'px';
            }else if(topDown + y_now >= 0) {
            	obj.style.top = '0px';
            }else {
            	obj.style.top = topDown + y_now + 'px';
        	}
    	}
        document.onmouseup = function() { //鼠标抬起事件
            //清除移动和抬起事件
            this.onmousemove = this.onmouseup = null;
        }
        return false //阻止默认事件
    }
}

class Member extends Component {
	constructor(props) {
		super(props);
		this.state = {
			change : false,
			pre: this.props.infor,
			icon: false,
			blob: {}
		}

		this.handleSignin = this.handleSignin.bind(this);
		this.handleNamein = this.handleNamein.bind(this);
		this.handleIcon = this.handleIcon.bind(this);
		this.updateToken = this.updateToken.bind(this);
		this.updateImg = this.updateImg.bind(this);
		this.change = this.change.bind(this);
		this.loadImg = this.loadImg.bind(this);
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

	handleIcon() {
		let canvas = document.getElementsByTagName('canvas')[0];

		let icon = document.createElement('canvas');
		let context = icon.getContext('2d');
		icon.width = 160;
		icon.height = 160;
		let sx = -canvas.offsetLeft;
		let sy = -canvas.offsetTop;

		let _this = this;

		context.drawImage(canvas, sx, sy, 160, 160, 0, 0, 160, 160);
		icon.toBlob(function (blob) {
			let formData = new FormData();
			formData.append("file", blob);
           axios.post('http://47.95.207.40/branch/upload/avatar',
			formData, {
				headers: {
					"Authorization": 'Bearer ' + _this.props.token.access_token,
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
			})
        },'image/jpg');
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
		if(this.props.infor !== this.state.pre) {
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
					this.props.getInfor();
					this.setState({
						change: false
					})
				}else {
					this.props.showFailPopup(res.data.message);
				}
			}).catch(err => {
				this.props.showFailPopup(err.message);
			})
		}else {
			this.setState({
				change: false
			})
		}
	}

	loadImg(e) {
		let oImg = new Image();
		let files = e.target.files;    //为了获取存储图片的信息的File对象
  		let _this = this;
	    let reader = new FileReader();     //创建FileReader对象 
	    if(!files.length) return;

	    reader.readAsDataURL(files[0]);     //利用readerDtaURL将图片读成base64

	    reader.onload = function(e) {        //监听reader读取完成事件
	    //当读取完成时，reader.result就是要的base64
	        oImg.src = this.result;
	    }


	    oImg.onload = () => {
	        let canvas = document.createElement("canvas");
		    let point = document.getElementById('circle');

	        let context = canvas.getContext('2d');           //为canvas设置上下文
	        let maxW = 160, maxH = 160;
	        //oImg的初始宽、高 
	        let originW = oImg.width;               
	        let originH = oImg.height;

	        //设置目标宽、高
	        let targW = originW, targH = originH;

	        //判断图片是否超过限制  等比缩放 
	        if(originW > maxW || originH > maxH) {
	            if(originH/originW < maxH/maxW) {
	                targH = maxH;
	                targW = Math.round(maxH * (originW / originH));
	            }else {
	                targW = maxW;
	 	            targH = Math.round(maxW * (originH / originW));
	            }
	        }
	        //设置canvas的宽、高
	        canvas.width = targW;
	        canvas.height = targH;
	        //清除画布
	        context.clearRect(0,0,targW,targH);
	        //利用drawImage将图片oImg按照目标宽、高绘制到画布上
	        context.drawImage(oImg,0,0,targW,targH);

	        canvas.toBlob(function (blob) {
                _this.setState({
                	blob: blob
                })
            },files.type || 'image/jpg');
	        let inner =  document.getElementById("inner");
	        inner.appendChild(canvas);
	        canvas.style.left = targW <= 160 ? ((80 - targW/2) + 'px') : ((-targW/2 + 80) + 'px');
	        canvas.style.top = targH <= 160 ? ((80 - targH/2) + 'px') : ((-targH/2 + 80) + 'px');

	        move(canvas);
		    point.onmousedown = function(e) { 
		        e = e || window.event; 
		        let x_down = e.clientX; //鼠标按下X的坐标
		        let leftDown = this.offsetLeft; //获取初始left值

		        document.onmousemove = function(e) { //鼠标移动事件
		            e = e || window.event;
		            let x_move = e.clientX; 
		            let x_now = x_move - x_down;
					let left = 0;
		            //赋值给left和top
		            if(leftDown + x_now >= 245) {
		            	left = 245;
		            }else if(leftDown + x_now <= 0) {
		            	left = 0;
		            }else {
		            	left = leftDown + x_now;
		        	}

		        	point.style.left = left + 'px';
		        	let tW = targW * (1 + (left/245));
		        	let tH = targH * (1 + (left/245));
					 canvas.width = tW;
					 canvas.height = tH;
					 //清除画布
					 context.clearRect(0,0,tW,tH);
					 //利用drawImage将图片oImg按照目标宽、高绘制到画布上
					 context.drawImage(oImg,0,0,tW,tH);

					 canvas.toBlob(function (blob) {
				        _this.setState({
				     	blob: blob
				     })
				    },files.type || 'image/jpg');

		    	}
		        document.onmouseup = function() { //鼠标抬起事件
		            //清除移动和抬起事件
		            this.onmousemove = this.onmouseup = null;
		        }
		        return false //阻止默认事件
	    	}
	    }
	}

	updateImg() {
		axios.post('http://47.95.207.40/branch/upload/avatar', {
			file: this.state.blob
		},{
			headers: {
				"Authorization": 'Bearer ' + this.props.token.access_token
			}
		}).then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err);
		})
	}

	render() {
		return (
			<div className="myself_cont member">
				<div className="inner_box">
					{
						this.state.icon ? 
						(
							<div className="box_cover">
								<div className="box_bd">
									<h2>编辑头像</h2>
									<p>调整头像尺寸和位置</p>
									<div className="box_img">
										<div id="inner"></div>
									</div>
									<div className="box_close" onClick={() => this.setState({icon:false})}></div>
									<div className="box_line">
										<div className="line">
											<div id="circle"></div>
										</div>
									</div>
									<div className="btn" onClick={this.handleIcon}>保存</div>
								</div>
							</div>						
						) : ""
					}
					{
						this.state.change ? 
						(
							<div className="box_header">
								<div id="test"></div>
								<div className="save_icon" onClick={this.save}>
									<a href="javascript:" title="保存"></a>
								</div>
								<div className="avater">
									<img src={"http://47.95.207.40/branch/file/user/" + this.props.infor.icon} />
									<div className="cover" onClick={()=>this.setState({icon: true})}>
										<input type="file" onChange={this.loadImg}/>
										<p>点击修改头像</p>
									</div>

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
						<div className="card">
							<div className="card_cvr">
								<div className="uper">
									<div className="icon prod"></div>
									<p>我的作品</p>
								</div>
								<div className="num">{this.props.infor.bookNum}</div>
							</div>
						</div>
						<div className="card">
							<div className="card_cvr">
								<div className="uper">
									<div className="icon focs"></div>
									<p>我的关注</p>
								</div>
								<div className="num">{this.props.infor.focusOnNum}</div>
							</div>
						</div>
						<div className="card">
							<div className="card_cvr">
								<div className="uper">
									<div className="icon fans"></div>
									<p>我的粉丝</p>
								</div>
								<div className="num">{this.props.infor.fansNum}</div>
							</div>
						</div>
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
	getInfor: token => dispatch(ACTIONS.INFOR.getInfor(token)),
	showSucPopup: mess => dispatch(ACTIONS.POPUP.showSucPopup(mess)),
	showFailPopup: mess => dispatch(ACTIONS.POPUP.showFailPopup(mess)),
	updateSign: sign => dispatch(ACTIONS.INFOR.updateSign(sign)),
	updateToken: token => dispatch(ACTIONS.TOKEN.updateToken(token))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Member)