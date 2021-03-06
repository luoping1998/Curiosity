import React, { Component } from 'react'
import axios from 'axios'

import '../../App.less'
import './all.less'
import Paging from '../../components/paging/paging.js'

import { changeStyle } from '../../public/common.js'
function transSort(num) {
	switch(num) {
		case 0:
			return 'CREATE_TIME'
		case 1:
			return 'FOUCUS_ON'
		case 2:
			return 'COMMENT'
		case 3:
			return 'WORDS'
	}
}
class AllNav extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let index = this.props.index - 0;
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
	}

	render() {
		const now = this.props.now;
		return (
			<ul className="page_header">
				<a href="javascript:">
				<li className={now === 0 ? "active" : ''} index={0} onClick={this.props.handleSort}>
					更新时间{ now === 0 ? " ↓" : ""}
				</li>
				</a>
				<a href="javascript:">
				<li className={now === 1 ? "active" : ''} index={1} onClick={this.props.handleSort}>
					总关注{ now === 1 ? " ↓" : ""}
				</li>
				</a>
				<a href="javascript:">
				<li className={now === 2 ? "active" : ''} index={2} onClick={this.props.handleSort}>
					总评论{ now === 2 ? " ↓" : ""}
				</li>
				</a>
				<a href="javascript:">
				<li className={now === 3 ? "active" : ''} index={3} onClick={this.props.handleSort}>
					总字数{ now === 3 ? " ↓" : ""}
				</li>
				</a>
			</ul>
		)
	}
}

class PageItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const book = this.props.book;
		let cont = changeStyle(book.bookType);
		let style = {
			color: cont.color,
			border: "1px solid " + cont.color
		}
		const note = {
			background: 'url(' + ("http://47.95.207.40/branch/file/book/" + (book.bookImage || "default_book.jpg")) + ') no-repeat',
			backgroundSize: 'auto 100%',
			backgroundPosition: 'center'
		}
		return (
			<div className="page_item">
				<div className="item_img" style={note}>
					<a href={ "/book_details?bookId=" + book.bookId } target="_blank">
					</a>
				</div>
				<div className="item_infor">
					<div className="item tit">
						<a href={ "/book_details?bookId=" + book.bookId }>
							{book.bookName}
						</a>
					</div>
					<div className="item author">{book.author.username}</div>
					<span className="type" style={style}>{cont.words}</span>
					<div className="intor">{book.content}</div>
				</div>
			</div>
		)
	}
}

class AllBody extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const List = this.props.books.map(val => {
			return (
				<PageItem book={val} key={val.bookId}/>
			)			
		});
		return (
			<div className="page_body">
				{List}
			</div>
		)
	}
}

class AllPage extends Component {
	constructor(props) {
		super(props);
		let val = this.props.location.search.split("=")[1] || -1;
		const index = Number(val);
		this.state = {
			index: index,	//类型
			count: 0,		//共count页
			value: changeStyle(index).words || '全部',	//当前类型
			books: [],		//当前页展示的book数组
			pageNow: 1,		//当前页
			pageShow: 1, 	//当前框显示数字
			sort: 'CREATE_TIME',	//排序内容
			sortType: 1,	//默认排序方式
			now: 0
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleGo = this.handleGo.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.toAll = this.toAll.bind(this);
		this.getBooks = this.getBooks.bind(this);
		this.goBack = this.goBack.bind(this);
		this.goNext = this.goNext.bind(this);
		this.goPage = this.goPage.bind(this);
	}

	handleClick(e) {
		window.location.href = "/all?type=" + Number(e.target.getAttribute('index'));
	}

	handleSort(e) {
		let now = e.target.getAttribute('index') - 0;
		this.setState({
			sort: transSort(now),
			now: now,
			pageNow: 1,
			pageShow: 1
		},()=>{
			this.getBooks();
		})
	}

	toAll() {
		this.setState({
			index: -1,
			value: '全部'
		},()=>{
			this.getBooks();
		})
	}

	getBooks() {
		let params = (this.state.index === -1) ? {
			pageNo: this.state.pageNow,
			pageSize: 10,
			sort: this.state.sort,
			sortType: this.sortType
		} : {
			pageNo: this.state.pageNow,
			pageSize: 10,
			type: this.state.index,
			sort: this.state.sort,
			sortType: this.sortType
		}
		axios.get("http://47.95.207.40/branch/book",{
			params: params
		}).then(res => {
			const data = res.data.data;
			this.setState({
				books: data.list,
				count: Math.ceil(data.total/10)
			})
		}).catch(err => {
			console.log(err);
		})
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

	handleChange(e) {
		this.setState({
			pageShow: Number(e.target.value)
		})
	}

	handleGo() {
		if(this.state.pageShow > this.state.count || this.state.pageShow < 1) {
			this.setState({
				pageShow: this.state.pageNow
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
		return (
			<div className="main_body all">
				<AllNav 
					handleClick={this.handleClick} 
					toAll={this.toAll}
					index={this.state.index} 
					value={this.state.value}
				/>
				<div className="all_page">
					<AllHeader now={this.state.now} handleSort={this.handleSort}/>
					<AllBody books={this.state.books} />
					<Paging 
						now={this.state.pageNow} 
						show={this.state.pageShow}
						count={this.state.count} 
						goBack={this.goBack}
						goNext={this.goNext}
						goPage={this.goPage}
						handleChange={this.handleChange}
						handleGo={this.handleGo}
					/>
				</div>
			</div>
		)
	}
}


export default AllPage