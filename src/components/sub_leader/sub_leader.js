import React, {Component} from 'react'
import {
	NavLink
} from 'react-router-dom'

import './sub_leader.less'

class SubLeader extends Component {
	constructor(props){
		super(props);
	}

	render() {
		const len = this.props.lists.length;
		const Lists = this.props.lists.map((val, index) => {
			return(
				<li key={index} className={ index === len-1 ? "no-border" :""}><NavLink to={val.src} activeClassName="active">{val.words}</NavLink></li>
			)
		})

		return (
			<ul className="sub_leader">
				{Lists}
			</ul>
		)
	}
}

export default SubLeader