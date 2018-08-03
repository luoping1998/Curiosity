import React, {Component} from 'react'
import {
	Link,
	Route,
	NavLink
} from 'react-router-dom'

import './paging.less'

class Paging extends Component {
	constructor(props){
		super(props);
		this.state = {
			now: this.props.now,
			count: this.props.count,
			value: this.props.now,
			footer: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleGo = this.handleGo.bind(this);
		this.reserve = this.reserve.bind(this);
	}

	handleGo(){

	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		})
	}

	reserve() {
		const now = this.state.now;
		const count = this.state.count;
		let footer = [];
		if(count === 0) {
			footer.push((<p>还没有关注任何人哦</p>));
		}else {
			if(count < 5) {
				let start = 1, end = count;

				if(now == 1) {
					let one = (<li className="cannot">{"<"}</li>);
					footer.push(one);
				}else {
					let one = (<a href="javascript:"><li>{"<"}</li></a>);
					footer.push(one);
				}

				for(let i = start; i <= end; i ++) {
					if(i == now) {
						let one = (
							<a href="javascript:"><li className="active">{i}</li></a>
						)
						footer.push(one);
					}else {
						let one = (
							<a href="javascript:"><li>{i}</li></a>
						)
						footer.push(one);
					}
				}

				if(now == count) {
					let one = (<li className="cannot">></li>);
					footer.push(one);
				}else {
					let one = (<a href="javascript:"><li>></li></a>);
					footer.push(one);
				}
			}
			else {
				const start = (count - now > 4 ? now : (count > 4 ? count - 4 : count ));

				if(start == 1) {
					let one = (<li className="cannot">{"<"}</li>);
					footer.push(one);
				}else {
					let one = (<a href="javascript:"><li>{"<"}</li></a>);
					footer.push(one);
				}

				let end = start + 4 > count ? count : start + 4;

				for(let i = start; i <= end; i ++) {
					if(i == now) {
						let one = (
							<a href="javascript:"><li className="active">{i}</li></a>
						)
						footer.push(one);
					}else {
						let one = (
							<a href="javascript:"><li>{i}</li></a>
						)
						footer.push(one);
					}
				}
				if(end == count) {
					let one = (<li className="cannot">></li>);
					footer.push(one);
				}else {
					let one = (<a href="javascript:"><li>></li></a>);
					footer.push(one);
				}
			}
		}
		this.setState({
			footer: footer
		})
	}

	componentDidMount() {
		this.reserve();
	}

	render() {
		const List = this.state.footer.map(val=> val)
		return (
			<div className="paging">
				<ul>
					{List}
					<input type="text" value={this.state.value} onChange= {this.handleChange} />
					<a href="javascript:"><li className="short" onClick = {this.handleGo}>GO</li></a>
				</ul>
			</div>
		)
	}

}

export default Paging