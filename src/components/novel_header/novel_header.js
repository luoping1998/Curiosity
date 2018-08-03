import React, { Component } from 'react'
import {
	Link, 
	NavLink
} from 'react-router-dom'

import './novel_header.less'


class NoverHeader extends Component{
	constructor(props) {
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
								<Link to="/my/shelf">
									<div className="bookshelf_icon"></div>
									<span>我的书架</span>
								</Link>
							</div>
							<div className="message_icon">
								<Link to="/my/message" title="消息中心"></Link>
							</div>
							<div className="my_infor_icon">
								{ this.props.log === false ? (<a href="javascript:" onClick = {this.props.handleClick} ></a>) : (<Link to="/my/member"></Link>)	}
							</div>
						</div>
					</div>
					<ul>
						<li><NavLink activeClassName="active" to="/all_styles"><div className="icon"></div>全部分类</NavLink></li>
						<li><NavLink activeClassName="active" to="/toplist">排行榜</NavLink></li>
						<li><NavLink activeClassName="active" to="/ended">完结</NavLink></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default NoverHeader