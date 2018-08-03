import React, {Component} from 'react'
import{Link, Route} from 'react-router-dom'

import './footer.less'
import '../../App.less'

class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="footer">
				<div className="main_body footer_inner">
					<p>
						<a href="/about_us">关于我们</a>
						<a href="/about_us">联系我们</a>
						<a href="/about_us">帮助中心</a>
						<a href="/about_us">加入我们</a>
						<a href="/about_us">举报中心</a>
					</p>
				</div>
			</div>
		)
	}
}

export default Footer