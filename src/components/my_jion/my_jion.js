//我的收藏页面
import React , {Component} from 'react'
import '../my_collect/my_collect.less'

import { connect } from 'react-redux'
import ACTIONS from '../../actions/index.js'
import { withRouter } from 'react-router-dom'

class CollectItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props.author);
		const style = {
			background: "url(" + "http://47.95.207.40/branch/file/user/" + this.props.author.icon + ") no-repeat",
			backgroundSize: "100% 100%",
			backgroundPosition: "center"
		}
		return (
			<div className="collect_item">
				<div className="item_author">
					<div className="icon" style={style}></div>
					<p className="name">{this.props.author.username}</p>
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