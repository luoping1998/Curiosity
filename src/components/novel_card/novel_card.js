import React, {Component} from 'react'
import './novel_card.less'

class NovelCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="novel_card">
				<img className="card_img" src={require("../../imgs/90.jpg")} />
				<div className="card_infor">
					<div className="infor_tit">首长异能小军媳</div>
					<div className="infor_cont">“报告首长，巴拉巴拉报告首长，巴拉巴拉报告首长，巴拉巴拉”</div>
					<div className="infor_aut">
						<div className="aut_name">
							<div className="aut_icon"></div>
							<span>一个人</span>
						</div>
						<div className="aut_class">古风言情</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NovelCard