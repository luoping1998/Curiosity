import React, {Component} from 'react'
import{Link, Route} from 'react-router-dom'


import './novel_bar.less'

class TopOne extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="top_one">
				<div className="top_infor">
					<div className="index">NO.1</div>
					<div className="title">{this.props.title}</div>
					<div className="name"><a href="/">{this.props.type}</a> · {this.props.name}</div>
				</div>
				<img src={this.props.src} />
			</div>
		)
	}
}

class ListItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="cont_item">
				<div className="index">{this.props.index}</div>
				<Link to={ "/book/"+this.props.bookID }><div className="title">{this.props.title}</div></Link>
				<div className="name">{this.props.name}</div>
			</div>
		)
	}
} 

class NovelNew extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="novel_new">
				<div className="inner_bd">
					<h2 className="tit">最新佳作</h2>
					<div className="inner_cont"></div>
				</div>
			</div>
		)
	}
}

class TopList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="novel_toplist">
				<div className="inner_bd">
					<h2 className="tit">排行榜
						<div className="more"><Link to="/toplist">更多></Link></div>
					</h2>
					<div className="inner_cont">
						<div className="top_one">
							<div className="top_infor">
								<div className="index">NO.1</div>
								<div className="title">这是一本输的名字</div>
								<div className="name"><a href="/">一个类型</a> · 一个名字</div>
							</div>
							<img src={require("../../imgs/90.jpg")} />
						</div>
						
						<div className="cont_item">
							<div className="index">3</div>
							<div className="title">这是一个书名</div>
							<div className="name">这是?????一个作a 者</div>
						</div>
						<div className="cont_item">
							<div className="index">4</div>
							<div className="title">这是一个书名</div>
							<div className="name">这是?????一个作a 者</div>
						</div>
						<div className="cont_item">
							<div className="index">5</div>
							<div className="title">这是一个书名</div>
							<div className="name">这是?????一个作a 者</div>
						</div>
						<div className="cont_item">
							<div className="index">6</div>
							<div className="title">这是一个书名</div>
							<div className="name">这是?????一个作a 者</div>
						</div>
						<div className="cont_item">
							<div className="index">7</div>
							<div className="title">这是一个书名</div>
							<div className="name">这是?????一个作a 者</div>
						</div>
						<div className="cont_item">
							<div className="index">8</div>
							<div className="title">这是一个书名</div>
							<div className="name">这是?????一个作a 者</div>
						</div>
						<div className="cont_item">
							<div className="index">9</div>
							<div className="title">这是一个书名</div>
							<div className="name">这是?????一个作a 者</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
class NovelBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="novel_bar">
				<NovelNew />
				<TopList />
			</div>
		)
	}
}

export default NovelBar