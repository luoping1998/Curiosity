import React, {Component} from 'react'

import './fade_slide.less'

let setOpacity = ((ele, num) => {
	let navStr = window.navigator.userAgent;
	if(navStr.indexOf('MSIE 6.0')!=-1 || navStr.indexOf('MSIE 7.0')!=-1 || navStr.indexOf('MSIE 8.0')!=-1){
		return (ele, num) => {
			ele.style.filter = "alpha(opacity=" + num + ")";
		}
	}else {
		return (ele, num) => {
			ele.style.opacity = num / 100;
		}
	}
})();


class FadeSlide extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lists : this.props.lists,
			imgs : this.props.imgs,
			now : 0,
			timer : 0
		}
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
	}

	autoChange() {

	}

	handleMouseEnter(e) {
		let index = e.target.getAttribute('index');
	}


	render() {
		const List = this.state.lists.map((val, index)=>{
			return (
				<li key={index} 
					onMouseEnter={this.handleMouseEnter} 
					index={index}>
					{val}
				</li>
			)
		})

		const Imgs = this.state.imgs.map((val, index)=>{
			return (
				<img  src={val} key={index} />
			)
		})
		return (
			<div className="focus_slide">
				{Imgs}
				<ul>
					{List}
				</ul>
			</div>
		)
	}
}

export default FadeSlide