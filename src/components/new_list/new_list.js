import React, {Component} from 'react'
import{Link, Route} from 'react-router-dom'

import './new_list.less'

class NewList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="new_list">新书</div>
		)
	}
}

export default NewList