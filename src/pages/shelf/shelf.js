import React, {Component} from 'react'
import {
	Link,
	Route,
	NavLink,
	Switch,
	Redirect
} from 'react-router-dom'

import '../myself/myself.less'
import './shelf.less'

import MyFollow from '../../components/my_follow/my_follow.js'

class Shelf extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="myself_cont shelf">
				<ul>
					<li><NavLink to="/my/shelf/my_follow" activeClassName="active">我的关注</NavLink></li>|
					<li><NavLink to="/my/shelf/my_collect" activeClassName="active">我的收藏</NavLink></li>|
					<li><NavLink to="/my/shelf/my_jion" activeClassName="active">我的参与</NavLink></li>|
					<li><NavLink to="/my/shelf/my_start" activeClassName="active">我的发起</NavLink></li>
				</ul>
				<Switch>
					<Route path="/my/shelf/my_follow" component={MyFollow} />
					<Redirect exact path="/my/shelf" to={{pathname: "/my/shelf/my_follow"}} />
				</Switch>
			</div>
		)
	}
}

export default Shelf