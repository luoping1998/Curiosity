import React, { Component } from 'react'
import './commit.less'

class CommitItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="commit_item"></div>
		)
	}
}

class Commit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: 0 //0 为最新  1为热门
		}
	}

	render() {
		const show = this.state.show;
		return (
			<div className="commit">
				<h2>{this.props.head}</h2>
				<div className="do_commit">
					<img className="avater" />
					<div className="cmt_body">
						<textarea placeholder="输入评论内容"></textarea>
						<div className="footer">
							<a href="javascript:"><div className="btn">发 表</div></a>
							<a href="javascript:"><div className="btn cancle">取 消</div></a>
						</div>
					</div>
				</div>
				<div className="commit_list">
					<ul className="list_sub">
						<a href="javascript:">
							<li 
								className={show === 0 ? "active" : ""} 
								onClick={
									() => { 
										this.setState({
											show: 0
										})
									}
								}>最 新</li>
						</a>
						<a href="javascript:">
							<li 
								className={show === 1 ? "active" : ""} 
								onClick={
									() => { 
										this.setState({
											show: 1
										})
									}
								}>热 门</li>
						</a>
					</ul>
				</div>
			</div>
		)
	}
}

export default Commit