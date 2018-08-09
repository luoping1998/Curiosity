import React, {Component} from 'react'
import{Link, Route} from 'react-router-dom'

import './new_list.less'

class NewList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="new_list">
				<div className="list_card color">
				</div>
				<div className="list_card blue">
				</div>
				<div className="list_card pink">
				</div>
				
			</div>
		)
	}
}

export default NewList