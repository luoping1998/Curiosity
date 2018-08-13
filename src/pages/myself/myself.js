import React, {Component} from 'react'
import {
	Link,
	Route,
	Redirect,
	NavLink,
	Switch
} from 'react-router-dom'
import PropTypes from 'prop-types';

import '../../App.less'
import './myself.less'

import Cover from '../../components/cover/cover.js'
import InforBox from '../../components/infor_box/infor_box.js'

import Shelf from '../../pages/shelf/shelf.js'
import Message from '../../pages/message/message.js'
import Member from '../../pages/member/member.js'
import Safe from '../../pages/safe/safe.js'


import { connect } from 'react-redux'

const mapStateToProps = state => ({
	logif: state.logif,
	infor: state.infor
})


class Myslef extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// if(!this.props.logif) {
		// 	this.context.router.history.push('/');
		// }
	}

	render(){
		return (
			<div className="main_body myself">
				<InforBox infor={ this.props.infor } />
				<Route path="/my/shelf" component={Shelf} />
				<Route path="/my/message" component={Message} />
				<Route path="/my/member" component={Member} />
			</div>
		)
	}
}

export default connect(
	mapStateToProps
)(Myslef)