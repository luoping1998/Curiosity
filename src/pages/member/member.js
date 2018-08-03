import React, {Component} from 'react'
import {
	Link,
	Route,
	NavLink
} from 'react-router-dom'

import '../myself/myself.less'
import './member.less'

class Member extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="myself_cont">member</div>
		)
	}
}

export default Member