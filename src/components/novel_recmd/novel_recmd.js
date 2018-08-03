import React, {Component} from 'react'
import './novel_recmd.less'

import NovelCard from '../novel_card/novel_card.js'


class NovelRecmd extends Component {
	constructor(props) {
		super(props);
	}

	component
	render() {
		return (
			<div className="novel_recmd">
				<h2 className="recmd_header">热门推荐</h2>
				<div className="recmd_lists">
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard />
				</div>
			</div>
		)
	}
}

export default  NovelRecmd