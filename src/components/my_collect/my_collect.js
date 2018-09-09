//我的收藏页面
import React , {Component} from 'react'
import './my_collect.less'

import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'
import { withRouter } from 'react-router-dom'
import Paging from '../paging/paging.js'

class CollectItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const style = {
			background: "url(" + "http://47.95.207.40/branch/file/user/" + this.props.author.icon + ") no-repeat",
			backgroundSize: "100% 100%",
			backgroundPosition: "center"
		}
		return (
			<div className="collect_item">
				<div className="item_author">
					<div className="icon" style={style}></div>
					<p className="name"><a href={"/author?userId=" + this.props.author.userId}>{this.props.author.username}</a></p>
				</div>
				<div className="item_infor">
					<p className="tit"><a href={"/read?branchId="+this.props.branchId}>{this.props.title}</a></p>
					<p className="summary">{this.props.summary}</p>
					<p className="time">{this.props.createTime}</p>
				</div>
				<div className="item_action">
					<div className="act_item">
						<div className="icon cmt"></div>
						<p className="words">评论数</p>
						<p className="words">{this.props.commentNum}</p>
					</div>
					<div className="act_item">
						<div className="icon wri"></div>
						<p className="words">续写数</p>
						<p className="words">{this.props.branchNum}</p>
					</div>
					<div className="act_item">
						<div className="icon like"></div>
						<p className="words">点赞数</p>
						<p className="words">{this.props.likeNum}</p>
					</div>
				</div>
			</div>
		)
	}
}

class MyCollect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: Math.ceil(this.props.star.length / 10),
			pageNow: 1,
			pageShow: 1,
			book:[]
		}
		this.getBooks = this.getBooks.bind(this);
		this.goBack = this.goBack.bind(this);
		this.goNext = this.goNext.bind(this);
		this.goPage = this.goPage.bind(this);
		this.handleGo = this.handleGo.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	goBack() {
		let val = Number(this.state.pageNow) - 1;
		this.setState({
			pageNow: val,
			pageShow: val
		},()=>{
			this.getBooks();
		})
	}

	goNext() {
		let val = Number(this.state.pageNow) + 1;
		this.setState({
			pageNow: val,
			pageShow: val
		},()=>{
			this.getBooks();
		})
	}

	goPage(e) {
		let val = Number(e.target.innerHTML);
		
		this.setState({
			pageNow: val,
			pageShow: val
		},()=>{
			this.getBooks();
		})
	}

	getBooks() {
		if(this.props.star.length) {
			let start = (this.state.pageNow - 1) * 10;
			let end = (start + 10) > this.props.star.length ? this.props.star.length : (start + 10);
			this.setState({
				book: this.props.star.slice(start, end)
			})
		}
	}

	handleChange(e) {
		this.setState({
			pageShow: Number(e.target.value)
		})
	}

	handleGo() {
		if(this.state.pageShow > this.state.count || this.state.pageShow < 1) {
			this.setState({
				pageShow: ''
			})
		}else {
			this.setState({
				pageNow: this.state.pageShow
			},()=>{
				this.getBooks();
			})
		}
	}

	componentDidMount() {
		this.getBooks();
	}

	render() {
		const List = this.state.book.map( item => ( 
			<CollectItem {...item} key={item.branchId}/> 
		))
		return (
			<div className="collect">
				{List}
				<Paging 
					now={this.state.pageNow} 
					value={this.state.pageShow}
					count={this.state.count} 
					goBack={this.goBack}
					goNext={this.goNext}
					goPage={this.goPage}
					handleChange={this.handleChange}
					handleGo={this.handleGo}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	star: state.star
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyCollect)