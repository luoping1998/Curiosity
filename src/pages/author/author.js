import React, {Component} from 'react'
import './author.less'
import '../../App.less'

class Author extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: window.location.href.split("=")[1]
		}
	}

	componentDidMount() {
		this.getInfor();	//先获取用户信息
	}

	getInfor() {

	}

	render() {
		return (
			<div className="main_body" id="author">
				<div className="upper">
					<div className="icon"><img /></div>
					<div className="infor">
						<div className="inf_bd">
							<h2></h2>
							<p></p>
							<p></p>
						</div>
						<p></p>
					</div>
				</div>
				<div className="show">
					<div className="lf_slider"></div>
					<div className="rt_slider"></div>
				</div>
			</div>
		)
	}
}

export default Author