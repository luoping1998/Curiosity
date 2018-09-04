//我的收藏页面
import React , {Component} from 'react'
import './my_collect.less'

import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'
import { withRouter } from 'react-router-dom'

class CollectItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="collect_item">
				<h3 className="item_tit"><a href={"/read?branchId="+this.props.branchId}>{this.props.title}</a></h3>
				<div className="item_infor">
					<p className="infor_summary">{this.props.summary}</p>
					<div className="infor_other">
						<p className="name">{this.props.author.username}</p>
						<p className="time">{this.props.createTime}</p>
					</div>
				</div>
				<div className="item_count">
					<div className="count_item">{this.props.commentNum}评论数</div>
					<div className="count_item">{this.props.branchNum}分支数</div>
					<div className="count_item">{this.props.likeNum}点赞数</div>
				</div>
			</div>
		)
	}
}

class MyCollect extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const List = this.props.star.map( item => ( 
			<CollectItem {...item} key={item.branchId}/> 
		))
		return (
			<div className="collect">
				{List}
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