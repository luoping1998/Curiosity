import React, {Component} from 'react'
import{Link, Route} from 'react-router-dom'
import axios from 'axios'

import './home.less'
import '../../App.less'
import NovelFocus from '../../components/novel_focus/novel_focus.js'
import NovelNew from '../../components/novel_new/novel_new.js'
import NovelBar from '../../components/novel_bar/novel_bar.js'
import NewList from '../../components/new_list/new_list.js'

class Home extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="main_body">
				<NovelFocus />
				<NewList />
				<NovelBar />
				<NovelNew />				
			</div>
		)
	}
}

export default Home;