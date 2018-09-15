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
				<div className="upper"></div>
				<div className="show">
					<div className=""></div>
					<div className=""></div>
				</div>
			</div>
		)
	}
}

export default Author