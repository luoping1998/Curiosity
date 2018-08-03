import React, {Component} from 'react'
import './cover.less'

class Cover extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(this.props.show){
			return (
				<div className="cover" onClick={this.props.handleClick}>
					{this.props.box}
				</div>
			)
		}else {
			return (
				''
			)
		}
	}
}

export default Cover;