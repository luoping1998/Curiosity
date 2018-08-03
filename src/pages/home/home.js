import React, {Component} from 'react'
import{Link, Route} from 'react-router-dom'
import axios from 'axios'

import './home.less'
import '../../App.less'
import NovelFocus from '../../components/novel_focus/novel_focus.js'
import NovelRecmd from '../../components/novel_recmd/novel_recmd.js'
import NovelBar from '../../components/novel_bar/novel_bar.js'
import NewList from '../../components/new_list/new_list.js'

class Home extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		axios.get("http://47.95.207.40/branch/book").then((res)=>{
			console.log(res);
		}).catch(err=>{
			console.log(err);
		})
	}

	render(){
		return (
			<div className="main_body">
				<NovelFocus />
				<NewList />
				<NovelBar />
				<NovelRecmd />
				
				
			</div>
		)
	}
}

export default Home;