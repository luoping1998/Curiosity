import React, {Component} from 'react'

import{ BrowserRouter, Route} from 'react-router-dom'
import './App.less'

import NoverHeader from './components/novel_header/novel_header.js'
import Footer from './components/footer/footer.js'
import Cover from './components/cover/cover.js'
import LoginBoxContainer from './containers/login_box_container.js'
import PopupContainer from './containers/popup_container.js'

import Home from './pages/home/home.js'
import Myslef from './pages/myself/myself.js'
import All from './pages/all/all.js'

import { connect } from 'react-redux'
import ACTIONS from './actions/index.js'

import { hiddenPopup, generatGuID, logOut } from './actions/index.js'

class App extends Component{
	constructor(props) {
		super(props);

		this.state = {
			show : false
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick() {
		this.setState({
			show : !this.state.show
		})
	}

	handleChange(value) {
		this.setState({
			show: value
		})
	}

	componentDidMount() {
		this.props.generatGuID();
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<PopupContainer />
					{ this.state.show ? (<Cover box={ <LoginBoxContainer handleChange={this.handleChange}/>} handleClick = {this.handleClick} show={this.state.show}/>) : '' }
					<NoverHeader log={this.props.logif} handleClick={this.handleClick} logOut={this.props.logOut} />
					<Route exact path="/" component={Home} />
					<Route path="/my" component={Myslef} />
					<Route path="/all" component={All} />
					<Footer />
				</div>
			</BrowserRouter>
		)
	}
}

const mapStateToProps = state => ({
	logif: state.logif
}) 

const mapDispatchToProps = dispatch => ({
	hiddenPopup: cont => dispatch(ACTIONS.POPUP.hiddenPopup(cont)),
	generatGuID: () => dispatch(ACTIONS.OTHER.generatGuID()),
	logOut: () => dispatch(ACTIONS.OTHER.logOut())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);