import React, { Component } from 'react'
import './read.less'
import axios from 'axios'
import { changeStyle } from '../../public/common.js'
import Commit from '../../components/commit/commit.js'
import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'

function ifFocused( arr, num) {
	let narr = arr.map(val => (val.bookId == num));
	return narr.indexOf(true);
}

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

class Reader extends Component {
	constructor(props) {
		super(props)
		let arr = this.props.location.search.split('=');
		let bookId = arr[1].split("&")[0];
		this.state = {
			branchId: arr[2].split("&")[0],
			bookId: bookId,
			bookName: decodeURI(arr[3].split('&')[0]),
			bookType: changeStyle(Number(arr[4])).words,
			bookIndex: Number(arr[4]),
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
			focused: (ifFocused(this.props.focus, bookId) !== -1),	//是否关注了此书
			started: false												//是否收藏了此书
		}
		this.handleStyle = this.handleStyle.bind(this);		//换class
		this.setFamliy = this.setFamliy.bind(this);			//换字体
		this.setSize = this.setSize.bind(this);				//换字体大小
		this.setWidth = this.setWidth.bind(this);			//换屏宽
		//关注书/取消关注
		this.setFocued = this.setFocued.bind(this);
		this.focusBook = this.focusBook.bind(this);
		this.unfocusBook = this.unfocusBook.bind(this);
	}

	componentDidMount() {
		let index = this.state.index - 1;
		axios.get("http://47.95.207.40/branch/book/branch/"+this.state.branchId)
			 .then( res => {
				this.setState({
					data: res.data.data,
					List: trans(res.data.data.content),
					author: res.data.data.author,
					num: res.data.data.content.length
				})
			 })
			 .catch( err => {
				console.log(err);
			})
	}

	//收藏本章节
	addStart() {
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

	handleStyle(e) {
		this.setState({
			class: e.target.className.split("_")[2],
			backnum: e.target.getAttribute("index")
		})
	}

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
		return (
			<div className={"reader " + this.state.class}>
				<div className="left_nav">
					<div className="nav_li">
						<a href="javascript:">
							<div className="icon list"></div>
							<div className="words">目录</div>
						</a>
					</div>
					
					<div className="nav_li">
						<a href="javascript:" onClick={() => this.setState({showSetup: !this.state.showSetup})}>
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

					<div className="nav_li">
						<a href="javascript:">
							<div className="icon star"></div>
							<div className="words">收藏本章</div>
						</a>					
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
					
					<div className="nav_li">
						<a href="#cmt_cover" >
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
						<a href={"/all?type=" + this.state.bookIndex}>{this.state.bookType}</a>
						<span className="split">></span>
						<a href={ "/book_details?bookId=" + this.state.bookId }> {this.state.bookName} </a>
						<span className="split">></span>
						<a href="">第{data.parentId + 1}章</a>
					</div>
					<div className="inner_body">
						<h2>{data.title}</h2>
						<p className="link">
							<a href={ "/book_details?bookId=" + this.state.bookId }><span className="icon book"></span>{this.state.bookName}</a>
							<a><span className="icon author"></span>{this.state.author.username}</a>
							<a className="no-hover"><span className="icon length"></span>{this.state.num}字</a>
							<a className="no-hover"><span className="icon date"></span>{data.createTime}</a>
						</p>
						<div className="main" style={this.state.style}>
							{this.state.List}
						</div>
					</div>
					<div className="re_footer">
						<div className="btn">
							<p>上一章</p>
						</div>
						<div className="btn">
							<p>目 录</p>
						</div>
						<div className="btn">
							<p>下一章</p>
						</div>
					</div>
					<div className="cmt_cover">
						<a name="cmt_cover"></a>
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
	focus: state.focus
})

const mapDispatchToProps = dispatch => ({
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