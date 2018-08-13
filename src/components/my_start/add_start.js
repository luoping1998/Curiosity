import React, { Component } from 'react'
import Editor from '../editor/editor.js'

import './my_start.less'
class AddStart extends Component{
	constructor(props) {
		super(props);
		this.state = {
			write : false
		}
		this.writeFirst = this.writeFirst.bind(this);
	}

	writeFirst() {
		this.setState({
			write : true
		})
	}

	render() {
		return (
			<div className="my_start">
				// {
				// 	this.state.write === false ? 
				// 	(
				// 		<div className="add_infor">
				// 			<div className="add_img">
				// 				<div className="input_cover">
				// 					<img />
				// 					<input type="file"/>
				// 				</div>
				// 				<p>请选择一张图片作为书的封面</p>
				// 			</div>
				// 			<div className="add_detail">
				// 				<div className="add_item">
				// 					<div className="commit">书名</div>
				// 					<input type="text" />
				// 				</div>
				// 				<div className="add_item">
				// 					<div className="commit">类型</div>
				// 					<select>
				// 						<option>玄幻言情</option>
				// 						<option>仙侠奇缘</option>
				// 						<option>古代言情</option>
				// 						<option>现代言情</option>
				// 						<option>浪漫青春</option>
				// 						<option>悬疑灵异</option>
				// 						<option>科幻空间</option>
				// 						<option>游戏竞技</option>
				// 						<option>耽美小说</option>
				// 					</select>
				// 				</div>
				// 				<div className="add_item">
				// 					<div className="commit">简介</div>
				// 					<textarea></textarea>
				// 				</div>
				// 			</div>
				// 			<div className="add_footer">
				// 				<div className="header">设置 ></div>
				// 				<div className="item">
				// 					指定可续写人群：
				// 					<input type="radio" name="canwrite" id="write_common" />
				// 					<label for="write_common">公开</label>
				// 					<input type="radio" name="canwrite" id="write_myself" />
				// 					<label for="write_myself">仅自己</label>
				// 					<input type="radio" name="canwrite" id="write_friends" />
				// 					<label for="write_friends">仅好友</label>
				// 					<input type="radio" name="canwrite" id="write_fans" />
				// 					<label for="write_fans">仅粉丝</label>
				// 				</div>
				// 				<div className="item">
				// 					指定可观看人群：
				// 					<input type="radio" name="canview" id="view_common" />
				// 					<label for="view_common">公开</label>
				// 					<input type="radio" name="canview" id="view_myself" />
				// 					<label for="view_myself">仅自己</label>
				// 					<input type="radio" name="canview" id="view_friends" />
				// 					<label for="view_friends">仅好友</label>
				// 					<input type="radio" name="canview" id="view_fans" />
				// 					<label for="view_fans">仅粉丝</label>
				// 				</div>
				// 				<a href="javascript:"><div className="next" onClick={this.writeFirst}>下一步</div></a>
				// 			</div>
				// 		</div>
				// 	) : (
						<Editor />
					// )
				}
			</div>
		)
	}
}

export default AddStart