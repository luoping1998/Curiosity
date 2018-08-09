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
	logif: state.logif
})

class ChangeBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="change_box" onClick={(e)=>e.stopPropagation()}>
				<div className="box_header">
					<h2 className="header_tit">修改资料</h2>
					<a href="javascript:" onClick ={ this.props.handleClick }>
						<img src={require("../../imgs/icons/close.png")} />
					</a>
				</div>
			</div>
		)
	}
}

class Myslef extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			infor : {
				username : '一个书友的名字',
				account : '12312319',
				signText : '一个书友'
			},
			show : false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount() {
		if(!this.props.logif) {
			this.context.router.history.push('/');
		}
	}

	handleClick() {
		this.setState({
			show : !this.state.show
		})
	}

	render(){
		return (
			<div className="main_body myself">
				<Cover 
					box = { <ChangeBox handleClick={this.handleClick}/> } 
					show = { this.state.show } 
					handleClick = { this.handleClick }
				/>
				<InforBox infor={ this.state.infor } handleClick={this.handleClick}/>
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