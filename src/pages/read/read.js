import React, { Component } from 'react'
import './read.less'
import axios from 'axios'
import { changeStyle } from '../../public/common.js'
import Commit from '../../components/commit/commit.js'
import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'

//是否关注了该书
function ifFocused( arr, num) {
	let narr = arr.map(val => (val.bookId == num));
	return narr.indexOf(true);
}

//是否收藏了该章节
function ifStared(arr, num) {
	if(!arr) {
		return -1;
	}else {
		let narr = arr.map(val => (val.branchId == num));
		return narr.indexOf(true);
	}
}

//转成文本展示
function trans(cont) {
	let arr = cont.split("\n");
	arr = arr.filter( val => {
		return val!==""
	})
	let List = arr.map((val,index) => {
		return (
			<p key={index}>
				{val}<br/>
			</p>
		)
	})
	return List
}

//过滤数组 除本章外的其他章节
function filterArr ( arr, num) {
	let narr = arr.filter( val => {
		return val.branchId != num
	})
	return narr;
}

//跳转到某top值
function starmove(top){
 	let timer = '';
   	let  speed = 1;
    timer = setInterval(function(){
	  	var t = document.documentElement.scrollTop || document.body.scrollTop;
	   	if(t < top){
	       	speed += Math.ceil((top - t)/5) ;
	       	document.documentElement.scrollTop = speed;
	   	}else{
	       	clearInterval(timer);
	   	}
	},10);
}

//给a链接绑定跳转
function skipToCmt() {
	let oSkip = document.getElementById("tocmt");
   	let oTarget = document.getElementById("cmt_cover");
   	oSkip.onclick = function(){
   		let oTarget_Top = oTarget.offsetTop;
     	starmove(oTarget_Top);
   	}
}

class Reader extends Component {
	constructor(props) {
		super(props)
		let arr = this.props.location.search.split('=');
		this.state = {
			token: JSON.parse(localStorage.getItem("token")),
			branchId: arr[1].split("&")[0],
			bookId: 0,
			bookName: '',		//书名
			bookType: '',	//书类型中文changeStyle(Number(arr[4])).words
			bookIndex: 0,		//书类型的index Number(arr[4])
			data: [],
			List: [],
			author: {},
			num: 0,
			class: 'normal',	//当前样式
			readW: 800,
			fontSize: 16,
			fontFamily: 0, 		//字体family 0雅黑 1宋体 2楷书
			style: {			//正文样式
				fontFamily: "Yahei",
				fontSize: '16px',
				color: "black",
				lineHeight: '25px'
			},
			canAdd: true,		//字体是否可以继续变大
			canDel: false,		//字体是否可以继续变小
			canKuo: true,		//是否可以变宽
			canSuo:false,		//是否可以变窄
			fastyle: {			//右部样式
				width: '800px'
			},
			backnum: 0, 		//主题id
			showSetup: false, 	//是否展示设置
			showCatlog: false,	//是否展示目录
			focused: false,	//是否关注了此书
			stared: false,											//是否收藏了此书
			nextChapter: [],	//下一章数组
			sameChapter: [],	//当前章其他续写
			lastChapter: {},	//上一章
			catShow: false 		//下一章目录是否展示
		}
		this.handleStyle = this.handleStyle.bind(this);		//换class
		this.setFamliy = this.setFamliy.bind(this);			//换字体
		this.setSize = this.setSize.bind(this);				//换字体大小
		this.setWidth = this.setWidth.bind(this);			//换屏宽

		//喜欢该章
		this.Like = this.Like.bind(this);

		//关注书/取消关注
		this.setFocued = this.setFocued.bind(this);
		this.focusBook = this.focusBook.bind(this);
		this.unfocusBook = this.unfocusBook.bind(this);

		//收藏该章/取消收藏
		this.addStar = this.addStar.bind(this);
		this.cancelStar = this.cancelStar.bind(this);

		//获取当前章，上一章，下一章
		this.getNext = this.getNext.bind(this);				//获取下一章
		this.getSame = this.getSame.bind(this);				//获取当前章其他续写
		this.getLast = this.getLast.bind(this);				//获取上一章
		
		//获取书的信息
		this.getBook = this.getBook.bind(this);
	}

	componentDidMount() {
		skipToCmt();
		let index = this.state.index - 1;
		axios.get(`http://47.95.207.40/branch/book/branch/${this.state.branchId}`,
			{
				headers: {
					"Authorization": this.state.token.access_token
				}
			}).then( 
			res => {
				console.log(res);
				const data = res.data.data;
				this.setState({
					stared: (ifStared(this.props.star, this.state.branchId) !== -1),
					data:data,
					List: trans(data.content),
					author: data.author,
					num: data.content.length,
					bookId: data.bookId,
					focused: (ifFocused(this.props.focus, data.bookId) !== -1)
				},()=>{
					this.getBook();
					this.getNext();
					this.getSame();
					this.getLast();
				})
			}).catch( err => {
				console.log(err);
			})
	}

	getBook() {
		axios.get(`http://47.95.207.40/branch/book/${this.state.bookId}`)
			 .then(res=> {
			 	const type = changeStyle(res.data.data.bookType);
			 	this.setState({
			 		bookName: res.data.data.bookName,
			 		bookType: type.words,
			 		bookIndex: type.index
			 	})
			 })
			 .catch(err => {
			 	let mes = '';
			 	if(err.response.data) {
			 		mes = err.response.data.message;
			 	}else {
			 		mes= '网络异常！';
			 	}
				this.props.showFailPopup(mes);
		})
	}

	getNext() {
		axios.get(`http://47.95.207.40/branch/book/${this.state.bookId}/branch`,
		{
			params : {
				parentId: this.state.data.branchId
			}
		}).then(res => {
			this.setState({
				nextChapter: res.data.data
			})
		}).catch(err => {
			console.log(err);
		})
	}

	getSame() {
		axios.get(`http://47.95.207.40/branch/book/${this.state.bookId}/branch`,
		{
			params : {
				parentId: this.state.data.parentId
			}
		}).then(res => {
			console.log(res);
			this.setState({
				sameChapter: filterArr(res.data.data, this.state.branchId)
			})
		}).catch(err => {
			console.log(err);
		})
	}

	getLast() {
		axios.get(`http://47.95.207.40/branch/book/branch/${this.state.data.parentId}`).then( 
			res => {
				this.setState({
					lastCharpter: res.data.data
				})
			}).catch(err =>{
				console.log(err);
			})
	}
	//收藏本章节
	addStar() {
		axios.put(`http://47.95.207.40/branch/user/collection/${this.state.data.branchId}`, 
			{},
			{
				headers: {
					"Authorization": `Bearer ${this.props.token.access_token}`
				}
			}).then(res => {
				this.props.showSucPopup(res.data.message);
				this.setState({
					stared: true
				},()=>{
					this.props.getStar(this.props.token);
				})
			}).catch(err => {
				let mes = '';
				if(err.response) {
					if(err.response.data.error == "invalid_token") {
						mes = "用户未登录！";
					}else {
						mes = err.response.data.message || err.data.error
					}
				}else {
					mes= '网络异常！';
				}
				this.props.showFailPopup(mes);
			})
	}

	//取消收藏
	cancelStar() {
		axios.delete(`http://47.95.207.40/branch/user/collection/${this.state.data.branchId}`, {
			headers: {
				"Authorization": `Bearer ${this.props.token.access_token}`
			}
		}).then(res => {
			this.props.showSucPopup(res.data.message);
			this.setState({
				stared: false
			},()=>{
				this.props.getStar(this.props.token);
			})
		}).catch( err => {
			let mes = '';
			if(err.response) {
				mes = err.response.data.message || err.data.error;
			}else {
				mes= '网络异常！';
			}
			this.props.showFailPopup(mes);
		})
	}

	setFocued(val) {
		this.setState({
			focused: val
		})
	}

	//关注本书
	focusBook() {
		if(this.props.logif) {
			this.props.addFocus(this.state.bookId, this.props.token,()=>{
				this.props.getFocus(this.props.token);
				this.setFocued(true);
			});
		}else {
			this.props.showFailPopup("您还没有登录呢！");
		}
	}

	//取消关注
	unfocusBook() {
		this.props.cancelFocus(this.state.bookId, this.props.token, ()=>{
			this.props.getFocus(this.props.token);
			this.setFocued(false);	
		});
	}

	//喜欢 点赞
	Like() {
		const data = {
			status:1
		}
		axios.post(`http://47.95.207.40/branch/user/${this.state.branchId}/vote`,
		data: data,
		{
			headers: {
				"Authorization": `Bearer ${this.props.token.access_token}`
			}
		}).then(res => {
			this.props.showSucPopup("点赞成功！");
		}).catch(err => {
			if(err.response.data.error_description) {
				this.props.showFailPopup("用户未登录或身份过期");				
			}else {
				let mes = '';
				if(err.response) {
					mes = err.response.data.message || err.data.error;
				}else {
					mes= '网络异常！';
				}
				this.props.showFailPopup(mes);
			}
		})
	}

	//设置背景（主题）
	handleStyle(e) {
		this.setState({
			class: e.target.className.split("_")[2],
			backnum: e.target.getAttribute("index")
		})
	}

	//设置字体
	setFamliy(e) {
		let index = e.target.getAttribute("index");
		this.setState({
			fontFamily: index,
			style: {
				...this.state.style,
				fontFamily: e.target.className.split(" ")[1].split("_")[1]
			}
		})
	}

	//设置字体大小
	setSize(e) {
		let index = e.target.getAttribute("index") - 0;
		let font = index + this.state.fontSize;
		let canAdd = (font === 48 ? false : true);
		let canDel = (font === 16 ? false : true);
		this.setState({
			fontSize: font,
			canAdd: canAdd,
			canDel: canDel,
			style: {
				...this.state.style,
				fontSize: font + 'px',
				lineHeight: font * 1.8 + 'px'
			}
		})
	}

	//设置宽度
	setWidth(e) {
		let index = e.target.getAttribute("index") - 0;
		let readW = index + this.state.readW;
		let canKuo = (readW === 1200 ? false : true);
		let canSuo = (readW === 800 ? false : true);
		this.setState({
			readW: readW,
			canKuo: canKuo,
			canSuo: canSuo,
			fastyle: {
				width: readW + 'px'
			}
		})
	}

	render() {
		const data = this.state.data;
		const nextList = this.state.nextChapter.map( val => {
			return (
				<a href={"read?branchId=" + val.branchId} key={val.branchId}>
					<li>{val.title}</li>
				</a>
			)
		})

		const sameList =  this.state.sameChapter.map( val => {
			return (
				<a href={"read?&branchId=" + val.branchId} key={val.branchId}>
					<li>{val.title}</li>
				</a>
			)
		})

		const CatList = this.state.nextChapter.map( val => {
			return (
				<li key={val.branchId}>
					<a href={`read?branchId=${val.branchId}`}><h3>{ val.title }</h3></a>
					<p>{ val.summary }</p>
					<div className="author">
						<a href="javascript:"><img className="avater" src={"http://47.95.207.40/branch/file/user/" + (val.author.icon || "default_avatr.jpg") }/></a>
						<a href="javascript:"><p>{val.author.username}</p></a>
					</div>
				</li>
			)
		})

		return (
			<div className={"reader " + this.state.class}>
				<div className="left_nav">
					<div className="nav_li">
						<a href="javascript:" onClick={() => this.setState({showCatlog: !this.state.showCatlog, showSetup: false})}>
							<div className="icon list"></div>
							<div className="words">目录</div>
						</a>
						{
							this.state.showCatlog ? 
							(	
								<div className="gap"></div>
							) : ""
						}
						{
							this.state.showCatlog ? 
							(
								<div className="catalog">
									<li>
										<h2>目 录</h2>
										<a href="javascript:" onClick={()=> this.setState({showCatlog: false})}><div className="close"></div></a>
									</li>
									<ul className="cat_main">
										<li className="chapter">
											<h3>上一章<div></div></h3>
										</li>
										<ul className="details">
											{ this.state.data.parentId == 0 ? 
												( <li className="nothing">无上一章</li> ) : 
												(
													<a href={"/read?branchId=" + this.state.lastCharpter.branchId}><li>{this.state.lastCharpter.title}</li></a>
												)
											}
										</ul>
										<li className="chapter">
											<h3>该章其他续写 <a href="javascript:">更多</a></h3>
										</li>
										<ul className="details">
											<a href={`/read?branchId=${this.state.data.branchId}`} key={this.state.data.branchId}>
												<li className="now_active">{this.state.data.title}</li>
											</a>
											{ sameList.splice(0,4) }
										</ul>
										<li className="chapter">
											<h3>下一章 <a href="#next_char" onClick={()=>{this.setState({catShow: true, showCatlog: false})}}>更多</a></h3>
										</li>
										<ul className="details">
											{ nextList.length ? nextList.splice(0,5) : (<li className="nothing">暂无下一章</li>) }
										</ul>
									</ul>
								</div>
							) : ""
						}
					</div>

					<div className="nav_li">
						<a href="javascript:" onClick={() => this.setState({showSetup: !this.state.showSetup, showCatlog: false})}>
							<div className="icon shezhi"></div>
							<div className="words">设置</div>
						</a>
						{
							this.state.showSetup ? 
							(	
								<div className="gap"></div>
							) : ""
						}
						{
							this.state.showSetup ? 
							(	
								<ul className="setup">
									<li>
										<h2>设置</h2>
										<div className="close" onClick={()=>{this.setState({showSetup: false})}}></div>
									</li>
									<li>
										<div className="name_sub">阅读背景</div>
										<div className={"c_circle c_normal" + (this.state.backnum == 0 ? " c_active" : "")} index={0} onClick={this.handleStyle}></div>
										<div className={"c_circle c_kraft" + (this.state.backnum == 1 ? " c_active" : "")} index={1} onClick={this.handleStyle}></div>
										<div className={"c_circle c_eye" + (this.state.backnum == 2 ? " c_active" : "")} index={2} onClick={this.handleStyle}></div>
										<div className={"c_circle c_pink" + (this.state.backnum == 3 ? " c_active" : "")} index={3} onClick={this.handleStyle}></div>
										<div className={"c_circle c_pure" + (this.state.backnum == 4 ? " c_active" : "")} index={4} onClick={this.handleStyle}></div>
										<div className={"c_circle c_blue" + (this.state.backnum == 5 ? " c_active" : "")} index={5} onClick={this.handleStyle}></div>
										</li>
									<li>
										<div className="name_sub">正文字体</div>
										<a href="javascript:"><div 
											className={"font_item font_Yahei" + (this.state.fontFamily == 0 ? " font_active" : "")} 
											onClick={this.setFamliy}
											index={0}
											>雅黑
										</div></a>
										<a href="javascript:"><div 
											className={"font_item font_SimSun" + (this.state.fontFamily == 1 ? " font_active" : "")} 
											onClick={this.setFamliy}
											index={1}
											>宋体
										</div></a>
										<a href="javascript:"><div 
											className={"font_item font_Kaiti" + (this.state.fontFamily == 2 ? " font_active" : "")} 
											onClick={this.setFamliy}
											index={2}
											>楷书
										</div></a>
									</li>
									<li>
										<div className="name_sub">字体大小</div>
										<div className="con_nav">
											{
												this.state.canAdd ? 
												( <a href="javascript:"className="con_nav_li canadd" onClick={this.setSize} index={2}></a> ) : 
												( <div className="con_nav_li notadd" index={0}></div> )
											}
											<div className="con_nav_li">{this.state.fontSize}</div>
											{
												this.state.canDel ? 
												( <a href="javascript:" className="con_nav_li candel" onClick={this.setSize} index={-2}></a> ) : 
												( <div className="con_nav_li notdel" index={0}></div> )
											}
										</div>
									</li>
									<li>
										<div className="name_sub">页面宽度</div>
										<div className="con_nav">
											{
												this.state.canKuo ? 
												( <a href="javascript:"className="con_nav_li vadd" onClick={this.setWidth} index={100}></a> ) : 
												( <div className="con_nav_li nadd"></div> )
											}
											<div className="con_nav_li">{this.state.readW}</div>
											{
												this.state.canSuo ? 
												( <a href="javascript:" className="con_nav_li vdel" onClick={this.setWidth} index={-100}></a> ) : 
												( <div className="con_nav_li nvdel"></div> )
											}
										</div>
									</li>
								</ul>
							) : ""
						}
					</div>

					<div className="nav_li" >
						{
							(this.state.stared === true && this.props.logif) ?
							(
								<a href="javascript:" onClick={this.cancelStar}> 
									<div className="icon hasstar"></div>
									<div className="words">√已收藏</div>
								</a>			
							):
							(
								<a href="javascript:" onClick={this.addStar}>
									<div className="icon star"></div>
									<div className="words">收藏本章</div>
								</a>
							)
						}
		
					</div>

					<div className="nav_li">
					{
						(this.state.focused === true && this.props.logif) ? 
						(
							<a href="javascript:" onClick={this.unfocusBook}>
								<div className="icon hasfoc"></div>
								<div className="words">√已关注</div>
							</a>
						):
						(
							<a href="javascript:" onClick={this.focusBook}>
								<div className="icon foc"></div>
								<div className="words">关注本书</div>
							</a>
						) 
					}
					</div>		
					
					<div className="nav_li" id="tocmt">
						<a href="javascript:">
							<div className="icon cmt"></div>
							<div className="words">评论</div>
						</a>
					</div>	

					<div className="nav_li">
						<a href="#">
							<div className="icon top"></div>
							<div className="words">置顶</div>
						</a>
					</div>	
				</div>
				<div className="re_body" style={this.state.fastyle}>
					<div className="header">
						<a href="/">首页</a>
						<span className="split">></span>
						<a href={`/all?type=${this.state.bookIndex}`}>{this.state.bookType}</a>
						<span className="split">></span>
						<a href={`/book_details?bookId=${this.state.bookId}`}> {this.state.bookName} </a>
						<span className="split">></span>
						<a href="">第{data.layer}章</a>
					</div>
					<div className="inner_body">
						<h2>{data.title}</h2>
						<p className="link">
							<a href={ `/book_details?bookId=${this.state.bookId}`}><span className="icon book"></span>{this.state.bookName}</a>
							<a href="javascript:"><span className="icon author"></span>{this.state.author.username}</a>
							<a className="no-hover"><span className="icon length"></span>{this.state.num}字</a>
							<a className="no-hover"><span className="icon date"></span>{data.createTime}</a>
						</p>
						<div className="main" style={this.state.style}>
							{this.state.List}

							<div className="author_card">
								<div className="card">
									<img className="avater" src={"http://47.95.207.40/branch/file/user/" + (this.state.author.icon || 'default_avatr.jpg')}/>
									<div className="infor">
										<h3><a href="javascript:">{this.state.author.username}</a></h3>
										<p>{this.state.author.signText}</p>
									</div>
									<a href="javascript:"><div className="focus">+ 关 注</div></a>
								</div>
								<p>{this.state.author.signText}</p>
							</div>
							<div className="add_footer">
								<a href="javascript:;" onClick={this.Like}><div className="btn"><div className="like"></div><span>喜欢|{this.state.data.likeNum}</span></div></a>
								<a href={"/write?branchId=" + this.state.branchId + "&bookName=" +this.state.bookName}><div className="jion">续写该章</div></a>
							</div>
						</div>
					</div>
					<a name="next_char"></a>
					<div className="re_footer">
						{
							this.state.data.parentId == 0 ? 
							( 
								<div className="btn nothing">
									<p>上一章</p>
								</div>
							) : 
							(
								<div className="btn">
									<a href="javascript:"><p>上一章</p></a>
								</div>
							)
						}
						
						<div className="btn">
							<a href="javascript:"><p>目 录</p></a>
						</div>
						{
							this.state.nextChapter.length ? 
							(
								<div className="btn" onClick={()=>{this.setState({ catShow : true })}}>
									<a href="javascript:"><p className="noborder">下一章</p></a>
								</div>
							) :
							(
								<div className="btn nothing">
									<p className="noborder">暂无下一章</p>
								</div>
							)

						}
					</div>
					{
						this.state.catShow && this.state.nextChapter.length? 
						(
							<ul className="next_char">
								<h2>下一章 <div className="close" onClick={()=>{this.setState({catShow: false})}}></div></h2>
								{ CatList }
							</ul>
						) : ""
					}

					<div id="cmt_cover">
						<Commit head="章节评论区" />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token,
	logif: state.logif,
	focus: state.focus,
	star: state.star
})

const mapDispatchToProps = dispatch => ({
	saveStar: stars => dispatch(ACTIONS.STAR.saveStar(stars)),
	getStar: token => dispatch(ACTIONS.STAR.getStar(token)),
	getFocus: token => dispatch(ACTIONS.FOCUS.getFocus(token)),
	addFocus: (focused, token, callback) => dispatch(ACTIONS.FOCUS.addFocus(focused, token, callback)),
	cancelFocus: (bookId, token, callback) => dispatch(ACTIONS.FOCUS.cancelFocus(bookId, token, callback)),
	showFailPopup: mes => dispatch(ACTIONS.POPUP.showFailPopup(mes)),
	showSucPopup: mes => dispatch(ACTIONS.POPUP.showSucPopup(mes))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Reader)