import React, { Component } from 'react'
import './popup.less'

class Popup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const poper = this.props.popup;
		const {handleClick} = this.props;
		return (
			<div className="popup" style={{"display": (poper.show ? 'flex' : 'none')}}>
				<div className="pop_bd">
					<div className="pop_img">
						<div className="suc"></div>
					</div>
					<div className="pop_mes">
						<h1 className="mes_header">{poper.header}</h1>
						<p className="mes_reason">{poper.mess}</p>
					</div>
					<button className="pop_btn" onClick={handleClick} >确 定</button>
				</div>
			</div>
		)
	}
} 

export default Popup