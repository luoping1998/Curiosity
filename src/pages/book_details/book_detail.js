import React, { Component } from 'react'
import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'

import './book_detail.less'
import '../../App.less'

import Commit from '../../components/book_commit/commit.js'

class Author extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="author">
				<div className="infor_card">
					<img className="avater" />
					<h2 className="name">罗萍</h2>
					<p className="sign">签名哈哈哈哈或或</p>
					<div className="details">
						<div className="de_card">
							<div className="icon start"></div>
							<p>发起数量</p>
							<p className="num">2</p>
						</div>
						<div className="de_card">
							<div className="icon jion"></div>
							<p>参与数量</p>
							<p className="num">2</p>
						</div>
						<div className="de_card">
							<div className="icon focus"></div>
							<p>关注数量</p>
							<p className="num">2</p>
						</div>
					</div>
				</div>
				<div className="more_card">
				</div>
			</div>
		)
	}
}
class BookDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookId: this.props.location.search.split('=')[1],	//当前展示的书id
			show: 0 		//0 则为作品信息展示 | 1 则为目录章节展示
		}
	}


	render() {
		const show = this.state.show;
		return (
			<div className="main_body book_details">
				<div className="book_intro">
					<div className="book_img"></div>
					<div className="book_infor">
						<h1 className="book_name">这是书名<span className="author">作者 发起</span></h1>
						<div className="types">
							<div className="type">玄幻言情</div>
							<div className="type">玄幻言情</div>
							<div className="type">玄幻言情</div>
						</div>
						<div className="count">
							<div className="item">
								<span className="big">445</span>关注量
							</div>
							<div className="item">
								<span className="big">25</span>参与量
							</div>
							<div className="item no-border">
								<span className="big">4</span>阅读量
							</div>
						</div>
						<div className="intro">
							<div className="text">
								简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
							</div>
						</div>
						<div className="actions">
							<a href="javascript:"><div className="btn">开始阅读</div></a>
							<a href="javascript:"><div className="btn more">参与续写</div></a>
							<a href="javascript:"><div className="btn more">关注本书</div></a>
						</div>
					</div>
				</div>
				<ul className="book_sub">
					<a href="javascript:">
						<li className={show === 0 ? "active" : ""} onClick={()=>{this.setState({show: 0})}}>作品信息</li>
					</a>
					<a href="javascript:">
						<li className={show === 1 ? "active" : ""} onClick={()=>{this.setState({show: 1})}}>目录(xx章)</li>
					</a>
				</ul>
				{
					show === 0 ? 
					(
						<div className="book_show">
							<Commit />
							<Author />
						</div>
					) : (
						<div className="book_catalog">

						</div>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token
})

export default connect(
	mapStateToProps,
)(BookDetails)