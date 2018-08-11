import React, {Component} from 'react'
import {
	NavLink
} from 'react-router-dom'

import './infor_box.less'

class InforBox extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div className="infor_box">
				<div className="infor_bg">
					<div className="avatar">
						<img src={"http://47.95.207.40/branch/file/user/" + this.props.infor.icon} />
					</div>
					<div className="name">
						<div className="name_bd">{this.props.infor.username}</div>
					</div>
					<div className="infor_id">ID:{this.props.infor.account}</div>
				</div>
				<div className="infor_nav">
					<ul>
						<li><NavLink to="/my/shelf">
							<div className="icon_shelf"></div>
							<span>我的书架</span>
							</NavLink>
						</li>
						<li><NavLink to="/my/message">
							<div className="icon_mess"></div>
							<span>消息中心</span>
							</NavLink>
						</li>
						<li><NavLink to="/my/member">
							<div className="icon_user"></div>
							<span>用户中心</span>
							</NavLink>
						</li>
						<li><NavLink to="/my/safe">
							<div className="icon_safe"></div>
							<span>安全中心</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default InforBox