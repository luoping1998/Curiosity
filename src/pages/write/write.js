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
			bookName: arr[2].split('&')[0],
			layer: '',		//续写章节
			lastTitle: '',	//续写章节标题
			bookId:'',		//书id
			tit: '',
			text: '',
			summary: '',
			pretext: "",
			id: arr[3] ? arr[3] : '',
			first: arr[3] ? false : true
		}
		this.handleTitle = this.handleTitle.bind(this);
		this.handleText = this.handleText.bind(this);
		this.handleSummary = this.handleSummary.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.saveDraft = this.saveDraft.bind(this);
		this.getDetails = this.getDetails.bind(this);
	}

	componentDidMount() {
		if(this.state.first) {
			this.getDetails();
		}else {
			axios.get("http://47.95.207.40/branch/branch/branch_edit/" + this.state.id, {
				headers: {
					Authorization: "Bearer" + this.props.token.access_token
				}
			}).then(res => {
				this.setState({
					data: res.data.data,
					bookId: res.data.data.bookId,
					branchId: res.data.data.parentId,
					tit: res.data.data.title,
					summary: res.data.data.summary,
					text: res.data.data.content,
					pretext: res.data.data.content
				},() => {
					this.getDetails();
				})
			}).catch( err => {
				console.log(err);
			})
		}

	}

	getDetails() {
		axios.get("http://47.95.207.40/branch/book/branch/" + this.state.branchId)
			.then( res => {
				this.setState({
				data : res.data.data,
				layer: res.data.data.layer,
				lastTitle: res.data.data.title,
				bookId: res.data.data.bookId
			})
		}).catch( err => {
			console.log(err);
		})
	}
	handleSend() {
		const data = {
			"parentId": this.state.branchId,
			"bookId": this.state.bookId,
			"title": this.state.tit,
			"content": this.state.text,
			"summary": this.state.summary,
			"status": 'STATUS_ONLINE',
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
		const cont = this.state.text;
		this.setState({
			pretext: cont,
			text: e.target.value
		})
	}

	handleTitle(e) {
		this.setState({
			tit: e.target.value
		})
	}

	saveDraft() {
		if(!this.state.tit && !this.state.text) return;
		this.setState({
			pretext: this.state.text
		})
		const newdata = {
			"parentId": this.state.branchId,
			"bookId": this.state.bookId,
			"title": this.state.tit,
			"content": this.state.text,
			"summary": this.state.summary,
			"status": 'STATUS_DRAFT'
		}

		const updata = {
			...newdata,
			branchId: this.state.id
		}

		const data = this.state.first ? newdata : updata;
		axios.put("http://47.95.207.40/branch/branch",
			data: data,
			{
				headers: {
					"Authorization": "Bearer " + this.props.token.access_token
				}
			}).then(res => {
				if(!res.data.status) {
					if(res.data.data) {
						this.setState({
							id: res.data.data.branchId,
							first: false
						})
					}
				}
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

	render() {
		return (
			<div className="main_body writer">
				<p className="header">正在续写 <a href={"/book_details?bookId=" + this.state.bookId}>《{decodeURI(this.state.bookName)}》</a> <a href={"/read?branchId="+this.state.branchId} className="cont">第{this.state.layer}章 {this.state.lastTitle}</a></p>
				<Editor 
					tit={this.state.tit}
					text={this.state.text}
					summary={this.state.summary}
					pretext={this.state.pretext}
					handleTitle={this.handleTitle}
					handleText={this.handleText}
					handleSummary={this.handleSummary}
					handleBack={this.handleBack}
					handleSend={this.handleSend}
					saveDraft={this.saveDraft}
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