import React, { Component } from 'react'
import './editor.less'
import { exec, qcstate } from '../../public/exec.js'
import autoTextarea from '../../public/autoText.js'

class Icon extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<a href="javascript:" onClick={this.props.handleClick} className={this.props.class}>
				<div className="icon" command={this.props.command}>
				{this.props.children}
				</div>
			</a>
		)
	}
}

class Editor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			tit: ''
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleFont = this.handleFont.bind(this);
		this.handleFamily = this.handleFamily.bind(this);
	}

	handleClick(e) {
		exec(e.target.className);
	}

	handleFont(e) {
		document.getElementById("text").style.fontSize = e.target.className.split('font')[1] + 'px';
	}

	handleFamily(e) {
		document.getElementById("text").style.fontFamily = e.target.className.split('f-')[1];
	}

	componentDidMount() {
		let text=document.getElementById("text");
        autoTextarea(text);
	}

	render() {
		return (
			<div className="editor">
				<div className="e_tit">
					<input type="text" placeholder="请输入标题" value={this.props.tit} onChange={this.props.handleTitle}/>
				</div>
				<div className="e_header">
					<a href="javascript:" className="family" >
						<div className="icon">F</div>
						<ul className="f_list" onClick={this.handleFamily}>
							<p>设置字体</p>
							<li className="f-SimSun">宋体</li>
							<li className="f-SimHei">黑体</li>
							<li className="f-Microsoft-YaHei">微软雅黑</li>
							<li className="f-KaiTi">楷体</li>
							<li className="f-FangSong">仿宋</li>
							<li className="f-PMingLiU">新细明体</li>
						</ul>
					</a>
					<a href="javascript:" className="font" >
						<div className="icon">T</div>
						<ul className="f_list" command="font" onClick={this.handleFont}>
							<p>设置字号</p>
							<li className="font13">xx-xxx</li>
							<li className="font16">xx-xxx</li>
							<li className="font18">xx-xxx</li>
							<li className="font20">xx-xxx</li>
							<li className="font23">xx-xxx</li>
							<li className="font25">xx-xxx</li>
							<li className="font30">xx-xxx</li>								
						</ul>
					</a>
					<Icon command="undo" handleClick={this.handleClick}>
						<div className="undo"></div>
					</Icon>
					<Icon command="redo" handleClick={this.handleClick}>
						<div className="redo"></div>
					</Icon>
					<Icon command="save" handleClick={this.handleClick}>
						<div className="save"></div>
					</Icon>
				</div>
				<div className="e_body">
					<textarea id="text" onChange={this.props.handleText} placeholder="快开始你的创作吧~" value={this.props.text}></textarea>
				</div>
				<div className="e_footer">
					<textarea className="summary" placeholder="请输入该章概述" value={this.props.summary} onChange={this.props.handleSummary}></textarea>
					<a href="javascript:" onClick={this.props.handleSend}><div className="btn">发 表</div></a>
					<a href="javascript:" onClick={this.props.handleBack}><div className="btn back">返 回</div></a>
				</div>
			</div>
		)
	}
}
export default Editor