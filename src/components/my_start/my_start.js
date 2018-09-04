//我的发起

import React, { Component } from 'react'
import {
	Route,
	Redirect,
	Switch,
	Link
} from 'react-router-dom'
import StartList from './start_list.js'
import AddStart from './add_start.js'

class MyStart extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch>
				<Route path="/my/shelf/my_start/list" component={StartList} />
				<Redirect exact path="/my/shelf/my_start" to={{pathname: "/my/shelf/my_start/list"}} />
				<Route path="/my/shelf/my_start/add" component={AddStart} />
			</Switch>
		)
	}
}

export default MyStart