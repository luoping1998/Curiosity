import React, {Component} from 'react'
import{Link, Route} from 'react-router-dom'
import axios from 'axios'
import { changeStyle } from '../../public/common.js'
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

class NovelRcmd extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="novel_rcmd">
				<div className="inner_bd">
					<h2 className="tit">热门推荐</h2>
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
		const one = this.props.List[0];
		let href = "/book_details?bookId=" + (one ? one.bookId : "");
		let cont = changeStyle((one ? one.bookType : ""))
		let style = {
			border: "1px solid " + cont.color,
			color: cont.color,
			padding: "3px 5px"
		}
		const List = this.props.List.splice(1).map( (val, index) => {
			let href = "/book_details?bookId=" + (val ? val.bookId : "")
			return (
					<div className="cont_item">
						<div className={ "index" + (index + 2)}>{index + 2 }</div>
						<div className="title">
							<a href={href}>{ val ? val.bookName : "" }</a>
						</div>
						<div className="name">
							<a>{ val ? val.author.username : "" }</a>
						</div>
					</div>	
				)
		})
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
								<div className="title">
									<a href={href}>{ one ? one.bookName : ""}</a>
								</div>
								<div className="name">
									<a href="/" style={style}>{ one ? cont.words : ""}</a> · <a className="author" href="/">{one ? one.author.username : ""}</a>
								</div>
							</div>
							<img src={ "http://47.95.207.40/branch/file/book/" + (one ? one.bookImage : "default_book.jpg")} />
						</div>
						{ List }
					</div>
				</div>
			</div>
		)
	}
}
class NovelBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}
	componentDidMount() {
		axios.get("http://47.95.207.40/branch/book",{
			params: {
				pageNo: 1,
				pageSize: 9,
				sort: 'READ_NUM',
				sortType: 1
			}
		}).then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}
	render() {
		return (
			<div className="novel_bar">
				<NovelRcmd />
				<TopList List={this.state.list}/>
			</div>
		)
	}
}

export default NovelBar