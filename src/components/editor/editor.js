import React, { Component } from 'react'
import './editor.less'
import { exec } from '../../public/exec.js'

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
		this.handleClick = this.handleClick.bind(this);
		this.handleHeading = this.handleHeading.bind(this);
		this.handleFont = this.handleFont.bind(this);
	}

	handleClick(e) {
		let target = e.target || e.srcElement;
		if(target.className !== 'icon') {
			target = target.parentNode;
		}
      	exec(target.getAttribute("command"));
	}

	handleHeading(e) {
		let target = e.target || e.srcElement;
		exec('heading', target.parentNode.getAttribute("index"));
	}

	handleFont(e) {
		let target = e.target || e.srcElement;
		exec('fontSize',target.getAttribute('index'));
	}

	render() {
		return (
			<div className="editor">
				<div className="e_header">
					<a href="javascript:" className="heading" >
						<div className="icon">H</div>
						<ul className="h_list" command="heading" onClick={this.handleHeading}>
							<p>设置标题</p>
							<li className="h_li" index="H1"><h1>H1</h1></li>
							<li className="h_li" index="H2"><h2>H2</h2></li>
							<li className="h_li" index="H3"><h3>H3</h3></li>
							<li className="h_li" index="H4"><h4>H4</h4></li>
							<li className="h_li" index="H5"><h5>H5</h5></li>
							<li className="h_li" index="H6"><h6>H6</h6></li>
						</ul>
					</a>
					<Icon command="Bold" handleClick={this.handleClick}>
						<b>B</b>
					</Icon>
					<Icon command="Bold" handleClick={this.handleClick}>F</Icon>
					<a href="javascript:" className="font" >
						<div className="icon">T</div>
						<ul className="f_list" command="font" onClick={this.handleFont}>
							<p>设置字号</p>
							<li className="font13" index="1">xx-xxx</li>
							<li className="font16" index="3">xx-xxx</li>
							<li className="font20" index="4">xx-xxx</li>
							<li className="font25" index="5">xx-xxx</li>
							<li className="font30" index="6">xx-xxx</li>
							<li className="font40" index="7">xx-xxx</li>				
						</ul>
					</a>
					<Icon command="Underline" handleClick={this.handleClick}><u>U</u></Icon>
					<Icon command="italic" handleClick={this.handleClick}><i>I</i></Icon>
					<Icon command="StrikeThrough" handleClick={this.handleClick}><s>S</s></Icon>	
					<Icon command="Bold" handleClick={this.handleClick}>—</Icon>
					<Icon command="Bold" handleClick={this.handleClick}>a</Icon>
					<Icon command="undo" handleClick={this.handleClick}>
						<div className="undo"></div>
					</Icon>
					<Icon command="redo" handleClick={this.handleClick}>
						<div className="redo"></div>
					</Icon>
				</div>
				<div className="e_body" contentEditable="true">
				</div>
			</div>
		)
	}
}
export default Editor