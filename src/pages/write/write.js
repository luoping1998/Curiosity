//参与续写页面
import React,{Component} from 'react'
import './write.less'
import '../../App.less'

import axios from 'axios'

import {connect} from 'react-redux'
import ACTIONS from '../../actions/index.js'
import Editor from '../../components/editor/editor.js'

class Write extends Component {
	constructor(props) {
		super(props);
		const arr =  this.props.location.search.split('=');
		this.state = {
			branchId: arr[1].split('&')[0],
			bookName: arr[2],
			data: {},
			tit: '',
			text: '',
			summary: ''
		}
		this.handleTitle = this.handleTitle.bind(this);
		this.handleText = this.handleText.bind(this);
		this.handleSummary = this.handleSummary.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.handleBack = this.handleBack.bind(this);
	}

	componentDidMount() {
		axios.get("http://47.95.207.40/branch/book/branch/" + this.state.branchId).then( 
			res => {
				this.setState({
					data : res.data.data
				})
			}).catch( err => {
				console.log(err);
			})
	}

	handleSend() {
		const data = {
			"parentId": this.state.branchId,
			"bookId": this.state.data.bookId,
			"title": this.state.tit,
			"content": this.state.text,
			"summary": this.state.summary
		}
		axios.put("http://47.95.207.40/branch/branch",
			data: data,
			{
				headers: {
					"Authorization": "Bearer " + this.props.token.access_token
				}
			}).then(res => {
				this.props.showSucPopup("发布成功！");
				window.location.href = "/read?branchId="+ this.state.branchId;
			}).catch(err => {
				if(err.response) {
					if(err.response.data.error == 'invalid_token') {
						this.props.showFailPopup("用户未登录！");
					}
				}else {
					let mes = '';
					if(err.response) {
						mes = err.response.data.message;
					}else {
						mes = '网络异常！';
					}
					this.props.showFailPopup(mes);
				}
			})
	}

	handleBack() {
		window.location.href = "/read?branchId="+ this.state.branchId;
	}

	handleSummary(e) {
		this.setState({
			summary: e.target.value
		})
	}

	handleText(e) {
		this.setState({
			text: e.target.value
		})
	}

	handleTitle(e) {
		this.setState({
			tit: e.target.value
		})
	}

	render() {
		return (
			<div className="main_body writer">
				<p className="header">正在续写 <a href={"/book_details?bookId=" + this.state.data.bookId}>《{decodeURI(this.state.bookName)}》</a> <a href={"/read?branchId="+this.state.branchId} className="cont">第{this.state.data.layer}章 {this.state.data.title}</a></p>
				<Editor 
					tit={this.state.tit}
					text={this.state.text}
					summary={this.state.summary}
					handleTitle={this.handleTitle}
					handleText={this.handleText}
					handleSummary={this.handleSummary}
					handleBack={this.handleBack}
					handleSend={this.handleSend}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	showSucPopup: mess => dispatch(ACTIONS.POPUP.showSucPopup(mess)),
	showFailPopup: mess => dispatch(ACTIONS.POPUP.showFailPopup(mess))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Write)