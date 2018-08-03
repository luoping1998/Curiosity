import React, {Component} from 'react'
import{ BrowserRouter, Route} from 'react-router-dom'
import './App.less'

import NoverHeader from './components/novel_header/novel_header.js'
import Footer from './components/footer/footer.js'
import Cover from './components/cover/cover.js'
import LoginBox from './components/login_box/login_box.js'

import Home from './pages/home/home.js'
import Myslef from './pages/myself/myself.js'


class App extends Component{
	constructor(props) {
		super(props);

		this.state = {
			log : false,
			show : false
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({
			show : !this.state.show
		})
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					{ this.state.show ? (<Cover box={ <LoginBox />} handleClick = {this.handleClick} show={this.state.show}/>) : '' }
					<NoverHeader log={this.state.log} handleClick={this.handleClick}/>
					<Route exact path="/" component={Home} />
					<Route path="/my" component={Myslef} />
					<Footer />
				</div>
			</BrowserRouter>
		)
	}
}

export default App;