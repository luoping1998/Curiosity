import React, {Component} from 'react'
import './my_inform.less'

class InformItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="inform_item">
			</div>
		)
	}
}

class MyInform extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="my_inform">
				<InformItem />
			</div>
		)
	}
}

export default MyInform