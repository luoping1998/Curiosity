import React, {Component} from 'react'
import {
	Link,
	Route,
	NavLink
} from 'react-router-dom'

import './paging.less'

class Nothing extends Component {
	render() {
		return (
			<div className="nothing">
				<img src={require("../../imgs/others/cry.jpg")} />
				<p>暂时什么都没有哦~</p>	
			</div>
		)
	}
}

class Paging extends Component {
	constructor(props){
		super(props);
	}

	render() {
		//分页器代码
		const now = this.props.now;
		const count = this.props.count;
		let footer = [];
		if(count === 0) {
			footer.push(<Nothing key={0} />);
		}else {
			//总页数少于5页时
			if(count < 5) {
				let start = 1, end = count;

				if(now == 1) {
					let one = (<a className="noborder" key={0}><li className="cannot">{"<"}</li></a>);
					footer.push(one);
				}else {
					let one = (<a href="javascript:" key={0} onClick={this.props.goBack}><li>{"<"}</li></a>);
					footer.push(one);
				}

				for(let i = start; i <= end; i ++) {
					if(i == now) {
						let one = (
							<a href="javascript:" key={i}><li className="active">{i}</li></a>
						)
						footer.push(one);
					}else {
						let one = (
							<a href="javascript:" key={i} index={i} onClick={this.props.goPage}><li>{i}</li></a>
						)
						footer.push(one);
					}
				}

				if(now == count) {
					let one = (<a className="noborder" key={end+1}><li className="cannot" >{'>'}</li></a>);
					footer.push(one);
				}else {
					let one = (<a href="javascript:" key={end+1} onClick={this.props.goNext}><li>{'>'}</li></a>);
					footer.push(one);
				}
			}
			else {
				//计算分页器从那页开始显示
				const start = (count - now > 4 ? now : (count > 4 ? count - 4 : count ));
				//当从第一页显示时 前一个 < 不可以点击至前一页  否则就可以点击翻转至前一页
				if(start == 1) {
					let one = (<a className="noborder" key={0}><li className="cannot">{"<"}</li></a>);
					footer.push(one);
				}else {
					let one = (<a href="javascript:" key={0} onClick={this.props.goBack}><li>{"<"}</li></a>);
					footer.push(one);
				}
				//计算结尾显示的页码 限定最多显示5个页码 即从i~i+4
				let end = start + 4 > count ? count : start + 4;
				//如果开始结尾正好差4 则进行下一步 考虑 > 的点击状态 即只有now == end才不可点击
				if(count - start == 4) {
					for(let i = start; i <= end; i ++) {
						if(i == now) {
							let one = (
								<a href="javascript:" key={i}><li className="active">{i}</li></a>
							)
							footer.push(one);
						}else {
							let one = (
								<a href="javascript:" key={i} index={i} onClick={this.props.goPage}><li>{i}</li></a>
							)
							footer.push(one);
						}
					}
					//当now == end时设置为不可点击 
					if(now == end) {
						let one = (<a className="noborder" key={end+1}><li className="cannot">></li></a>);
						footer.push(one);
					}else {
						let one = (<a href="javascript:" key={end+1} onClick={this.props.goNext}><li>></li></a>);
						footer.push(one);
					}
				}else {
					for(let i = start; i <= end; i ++) {
						if(i == now) {
							let one = (
								<a href="javascript:" key={i}><li className="active">{i}</li></a>
							)
							footer.push(one);
						}else {
							let one = (
								<a href="javascript:" key={i} index={i} onClick={this.props.goPage}><li>{i}</li></a>
							)
							footer.push(one);
						}
					}
					
					if(end == count) {
						let one = (<a className="noborder" key={end+1}><li className="cannot">></li></a>);
						footer.push(one);
					}else {
						let one = (<a href="javascript:" key={end+1} onClick={this.props.goNext}><li>></li></a>);
						footer.push(one);
					}
				}

			}
		}
		const List = footer.map(val=> val)
		return (
			<div className="paging">
				<ul>
					{List}
					{ count === 0 ? "" : (<input type="text" value={this.props.value} onChange= {this.props.handleChange} />)}
					{ count === 0 ? "" : (<a href="javascript:"><li className="short" onClick = {this.props.handleGo}>GO</li></a>)}
				</ul>
			</div>
		)
	}

}

export default Paging