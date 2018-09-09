//添加发起
import React, { Component } from 'react'
import Editor from '../editor/editor.js'

import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'

import { withRouter } from 'react-router-dom'

import axios from 'axios'
import './my_start.less'

import { changeStyle } from '../../public/common.js'

function upload(e, oImg, maxW, maxH){
}

class AddStart extends Component{
	constructor(props) {
		super(props);
		this.state = {
			write : false,
			name : '',
			type: "FantasySentiment",
			summary: '',
			intro: '',
			wValue: 0,
			vValue: 0,
			tit: '',
			text: '',
			blob: '',
			src: '',
			bookId: '',
			style: {}
		}
		this.writeFirst = this.writeFirst.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.handleWrite = this.handleWrite.bind(this);
		this.handleView = this.handleView.bind(this);
		this.handleType = this.handleType.bind(this);
		this.handleIntro = this.handleIntro.bind(this);
		this.handleSummary = this.handleSummary.bind(this);
		this.handleBookName = this.handleBookName.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleText = this.handleText.bind(this);
		this.handleImg = this.handleImg.bind(this);
	}

	handleImg(e) {
		let oImg = new Image();
		let files = e.target.files;    //为了获取存储图片的信息的File对象
  		let _this = this;
	    let reader = new FileReader();     //创建FileReader对象 
	    if(!files.length) return;

	    reader.readAsDataURL(files[0]);     //利用readerDtaURL将图片读成base64

	    reader.onload = function(e) {        //监听reader读取完成事件
	    //当读取完成时，reader.result就是要的base64
	        let style = {
		    	background: "url(" + this.result + ") no-repeat",
		    	backgroundSize: "auto 100%",
		    	backgroundPosition: "center"
		    }
	        _this.setState({
	        	src: this.result,
	        	style: style
	        })
	        oImg.src = this.result;
	    }


	    oImg.onload = () => {
	        let canvas = document.createElement("canvas");
	        let context = canvas.getContext('2d');           //为canvas设置上下文
	        let maxW = 180, maxH = 250;
	        //oImg的初始宽、高 
	        let originW = oImg.width;               
	        let originH = oImg.height;

	        //设置目标宽、高
	        let targW = originW, targH = originH;
	        //判断图片是否超过限制  等比缩放 
	        if(originW > maxW || originH > maxH) {
	            if(originH/originW > maxH/maxW) {
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
	    }
	}

	writeFirst() {
		if(this.state.name && this.state.intro) {
			this.setState({
				write : true
			})
		}else {
			this.props.showFailPopup("请先完善基础信息");
		}

	}

	handleBack() {
		this.setState({
			write: false
		})
	}

	handleText(e) {
		const val = e.target.value;
		this.setState({
			text: val
		})
	}

	handleTitle(e) {
		this.setState({
			tit: e.target.value
		})
	}

	handleWrite(e) {
		this.setState({
			wValue: e.target.value
		})
	}

	handleView(e) {
		this.setState({
			vValue: e.target.value
		})
	}

	handleBookName(e) {
		this.setState({
			name: e.target.value
		})
	}

	handleType(e) {
		const val = changeStyle(e.target.value)
		this.setState({
			type: val.trans
		})
	}

	handleIntro(e) {
		this.setState({
			intro: e.target.value
		})
	}

	handleSummary(e) {
		this.setState({
			summary: e.target.value
		})
	}

	handleSend() {
		const data = {
			"bookName": this.state.name,
		    "bookType": this.state.type,
		    "bookIntroduce": this.state.intro,
		    "firstTitle": this.state.tit,
		    "firstContent": this.state.text,
		    "firstSummary": this.state.summary
		}

		if(data.firstTitle && data.firstContent && data.firstSummary) {
			axios.put("http://47.95.207.40/branch/book",
				data: data,
				{
					headers: {
						"Authorization": "Bearer " + this.props.token.access_token
					}
				}
			)
			.then( res => {
				this.setState({
					bookId: res.data.data.bookId
				})
				this.props.showSucPopup(res.data.message);
				if(this.state.blob) {
					this.sendImg();	
				}else{
					this.props.history.push('/book_details?bookId='+this.state.bookId);				}
			})
			.catch( err => {
				this.props.showFailPopup(err.response.data.error_description);
			})
		}else {
			if(!data.firstTitle) {
				this.props.showFailPopup("请输入该章标题");
			}else if(!data.firstContent) {
				this.props.showFailPopup("请输入该章内容");
			}else {
				this.props.showFailPopup("请输入该章摘要")
			}
		}

	}

	sendImg() {
		let formData = new FormData();
		formData.append("file", this.state.blob);
		axios.post("http://47.95.207.40/branch/upload/book_image/" + this.state.bookId,
				formData ,{
					headers: {
						"Authorization": "Bearer " + this.props.token.access_token,
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}
		).then(res => {
			console.log(res);
			this.props.history.push('/book_details?bookId='+this.state.bookId);
		}).catch(err => {
			console.log(err);
		})
	}

	render() {
		console.log(this.state);
		return (
			<div className="my_start">
				{
					this.state.write === false ? 
					(
						<div className="add_infor">
							<div className="add_img">
								<div className="input_cover">
									<div id="bookimg" style={this.state.style}></div>
									<input type="file" onChange={this.handleImg}/>
								</div>
								<p>请选择一张图片作为书的封面</p>
							</div>
							<div className="add_detail">
								<div className="add_item">
									<div className="commit">书名</div>
									<input type="text" placeholder="请输入书名" value={this.state.name} onChange={this.handleBookName}/>
								</div>
								<div className="add_item">
									<div className="commit">类型</div>
									<select value={this.state.stype} onChange={this.handleType}>
										<option>玄幻言情</option>
										<option>仙侠奇缘</option>
										<option>古代言情</option>
										<option>现代言情</option>
										<option>浪漫青春</option>
										<option>悬疑灵异</option>
										<option>科幻空间</option>
										<option>游戏竞技</option>
										<option>耽美小说</option>
									</select>
								</div>
								<div className="add_item">
									<div className="commit">简介</div>
									<textarea placeholder="简介" value={this.state.intro} onChange={this.handleIntro}></textarea>
								</div>
							</div>
							<div className="add_footer">
								<div className="header">设置 ></div>
								<div className="item">
									指定可续写人群：
									<input type="radio" name="canwrite" id="write_common" value={0} onChange={this.handleWrite}/>
									<label htmlFor="write_common">公开</label>
									<input type="radio" name="canwrite" id="write_myself" value={1} onChange={this.handleWrite}/>
									<label htmlFor="write_myself">仅自己</label>
									<input type="radio" name="canwrite" id="write_friends" value={2} onChange={this.handleWrite}/>
									<label htmlFor="write_friends">仅好友</label>
									<input type="radio" name="canwrite" id="write_fans" value={3} onChange={this.handleWrite}/>
									<label htmlFor="write_fans">仅粉丝</label>
								</div>
								<div className="item">
									指定可观看人群：
									<input type="radio" name="canview" id="view_common" value={0} onChange={this.handleView}/>
									<label htmlFor="view_common">公开</label>
									<input type="radio" name="canview" id="view_myself" value={1} onChange={this.handleView}/>
									<label htmlFor="view_myself">仅自己</label>
									<input type="radio" name="canview" id="view_friends" value={2} onChange={this.handleView}/>
									<label htmlFor="view_friends">仅好友</label>
									<input type="radio" name="canview" id="view_fans" value={3} onChange={this.handleView}/>
									<label htmlFor="view_fans">仅粉丝</label>
								</div>
								<a href="javascript:"><div className="next" onClick={this.writeFirst}>下一步</div></a>
							</div>
						</div>
					) : (
						<Editor 
							handleBack={this.handleBack}
							handleSend={this.handleSend} 
							handleTitle={this.handleTitle} 
							handleText={this.handleText}
							handleSummary={this.handleSummary}
							summary={this.state.summary}
							text={this.state.text}
							tit={this.state.tit}
						/>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token,
	logif: state.logif
})

const mapDispatchToProps = dispatch => ({
	showSucPopup: mess => dispatch(ACTIONS.POPUP.showSucPopup(mess)),
	showFailPopup: mess => dispatch(ACTIONS.POPUP.showFailPopup(mess)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AddStart))