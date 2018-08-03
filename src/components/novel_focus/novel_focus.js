import React, {Component} from 'react'
import{Link, Route} from 'react-router-dom'

import FadeSlide from '../fade_slide/fade_slide.js'

import './novel_focus.less'

import r0 from '../../imgs/slide/0.jpg';
import r1 from '../../imgs/slide/1.jpg';
import r2 from '../../imgs/slide/2.jpg';
import r3 from '../../imgs/slide/3.jpg';
import r4 from '../../imgs/slide/4.jpg';

class FocusNotice extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="focus_notice">
				<h2 className="notice_header">公告</h2>
				<p className="notice_item"><a href="javscript:" className="first">[公告] 巴拉巴拉巴拉巴拉啊</a></p>
				<p className="notice_item"><a href="javscript:">[公告] 巴拉巴拉巴拉巴拉啊</a></p>
				<p className="notice_item"><a href="javscript:">[公告] 巴拉巴拉巴拉巴拉啊</a></p>
				<p className="notice_item"><a href="javscript:">[公告] 巴拉巴拉巴拉巴拉啊</a></p>
				<p className="notice_item"><a href="javscript:">[公告] 巴拉巴拉巴拉巴拉啊</a></p>
				<p className="notice_item no-border"><a href="javscript:">[公告] 巴拉巴拉巴拉巴拉啊</a></p>
			</div>
		)
	}
}

class NovelFocus extends Component{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="novel_focus">
				<FadeSlide 
					lists = {['豪豪豪豪好','咿呀咿呀呦','巴拉拉本来','哈哈哈哈哈哈','哦哦哦哦哦']} 
					imgs = {[ r0, r1, r2, r3, r4]}
				/>

				<FocusNotice />
			</div>
		)
	}
}

export default NovelFocus