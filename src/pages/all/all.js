import React, { Component } from 'react'

import '../../App.less'
import './all.less'
import Paging from '../../components/paging/paging.js'

class AllNav extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let index = this.props.index;
		return (
			<ul className="all_nav">
				<div className="selected">
					<p>已选</p>
					<a href="javascript:">
						<span className="now">
							{this.props.value}
							{	
								index === -1 ? "" : (<span style={{"fontSize":"20px"}} onClick={this.props.toAll}> ×</span>)
							}
						</span>
					</a>
				</div>
				<a href="javascript:">
					<li index={0} 
						className={ index===0 ? "li_active" : ""} 
						onClick={this.props.handleClick}
					>
						玄幻言情
					</li>
				</a>
				<a href="javascript:">
					<li index={1} 
						className={ index===1 ? "li_active" : ""} 
						onClick={this.props.handleClick}
					>
						仙侠奇缘
					</li>
				</a>
				<a href="javascript:">
					<li index={2} 
						className={ index===2 ? "li_active" : ""} 
						onClick={this.props.handleClick}
					>
						古代言情
					</li>
				</a>
				<a href="javascript:">
					<li index={3} 
						className={ index===3 ? "li_active" : ""} 
						onClick={this.props.handleClick}
					>
						现代言情
					</li>
				</a>
				<a href="javascript:">
					<li index={4} 
						className={ index===4 ? "li_active" : ""} 
						onClick={this.props.handleClick}
					>
						浪漫青春
					</li>
				</a>
				<a href="javascript:">
					<li index={5} 
						className={ index===5 ? "li_active" : ""} 
						onClick={this.props.handleClick}
					>
						悬疑灵异
					</li>
				</a>
				<a href="javascript:">
					<li index={6} 
						className={ index===6 ? "li_active" : ""} 
						onClick={this.props.handleClick}
					>
						科幻空间
					</li>
				</a>
				<a href="javascript:">
					<li index={7} 
						className={ index===7 ? "li_active" : ""} 
						onClick={this.props.handleClick}
					>
						游戏竞技
					</li>
				</a>
				<a href="javascript:">
					<li index={8} 
						className={ index===8 ? "li_active" : ""} 
						onClick={this.props.handleClick}
					>
						耽美小说
					</li>
				</a>
			</ul>
		)
	}
}
class AllHeader extends Component {
	constructor(props){
		super(props);
		this.state = {
			now: 0
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.setState({
			now: e.target.parentNode.getAttribute('index') - 0
		})
	}

	render() {
		const now = this.state.now;
		return (
			<ul className="page_header">
				<li className={now === 0 ? "active" : ''} index={0} onClick={this.handleClick}>
					<a href="javascript:">综合</a>
				</li>
				<li className={now === 1 ? "active" : ''} index={1} onClick={this.handleClick}>
					<a href="javascript:">字数</a>
				</li>
				<li className={now === 2 ? "active" : ''} index={2} onClick={this.handleClick}>
					<a href="javascript:">参与</a>
				</li>
				<li className={now === 3 ? "active" : ''} index={3} onClick={this.handleClick}>
					<a href="javascript:">时间</a>
				</li>
			</ul>
		)
	}
}

class AllPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: -1,
			value: '全部'
		}
		this.handleClick = this.handleClick.bind(this);
		this.toAll = this.toAll.bind(this);
	}

	handleClick(e) {
		this.setState({
			index: Number(e.target.getAttribute('index')),
			value: e.target.innerHTML
		})
	}

	toAll() {
		this.setState({
			index: -1,
			value: '全部'
		})
	}

	render() {
		return (
			<div className="main_body all">
				<AllNav 
					handleClick={this.handleClick} 
					toAll={this.toAll}
					index={this.state.index} 
					value={this.state.value}
				/>
				<div className="all_page">
					<AllHeader />
					<div className="page_body">

					</div>
					<Paging now={1} count={4} />
				</div>
			</div>
		)
	}
}

export default AllPage