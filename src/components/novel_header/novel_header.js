import React, { Component } from 'react'
import {
	Link, 
	NavLink
} from 'react-router-dom'

import './novel_header.less'

class AllList extends Component{
	render() {
		return (
			<ul className="all_list">
				<li>玄幻言情</li>
				<li>仙侠奇缘</li>
				<li>古代言情</li>
				<li>现代言情</li>
				<li>浪漫青春</li>
				<li>悬疑灵异</li>
				<li>科幻空间</li>
				<li>游戏竞技</li>
				<li>耽美小说</li>
			</ul>
		)
	}
}

class NoverHeader extends Component{
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="novel_header">
				<div className="section_inner">
					<div className="inner_nav">
						<div className="novel_logo">
							<NavLink exact to="/" activeClassName="active">
								<div className="logo"></div>
								<div className="back_icon"></div>
							</NavLink>
						</div>
						<div className="novel_search">
							<input></input>
							<button></button>
						</div>
						<div className="novel_infor">
							<div className="bookshelf_bar">
								{ 
									this.props.log === false ? 
									( <a href="javascript:" onClick = {this.props.handleClick} >
										<div className="bookshelf_icon"></div>
										<span>我的书架</span>
									</a> ) : 
									( <Link to="/my/shelf">
										<div className="bookshelf_icon"></div>
										<span>我的书架</span>
									</Link>)	
								}
							</div>
							<div className="message_icon">
								{ this.props.log === false ? (<a href="javascript:" onClick = {this.props.handleClick} title="消息中心"></a>) : (<Link to="/my/message" title="消息中心"></Link>)	}
							</div>
							<div className="my_infor_icon">
								{ this.props.log === false ? (<a href="javascript:" onClick = {this.props.handleClick} ></a>) : (<Link to="/my/member"></Link>)	}
							</div>
							{
								this.props.log === true ? (<div className="log_out_icon" onClick = {this.props.logOut} ><a href="javascript:">退出</a></div>) : ''
							}
						</div>
					</div>
					<ul>
						<li className="show">
							<NavLink activeClassName="active" to="/all">
								<div className="icon"></div>全部分类
							</NavLink>
							<AllList />
						</li>
						<li><NavLink activeClassName="active" to="/toplist">排行榜</NavLink></li>
						<li><NavLink activeClassName="active" to="/new">最新</NavLink></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default NoverHeader