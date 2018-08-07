import React, {Component} from 'react'
import './novel_new.less'

import NovelCard from '../novel_card/novel_card.js'


class NovelNew extends Component {
	constructor(props) {
		super(props);
	}

	component
	render() {
		return (
			<div className="novel_new">
				<h2 className="new_header">最新佳作</h2>
				<div className="new_lists">
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard />
					<NovelCard border="none"/>
					<NovelCard border="none"/>
					<NovelCard border="none"/>
				</div>
			</div>
		)
	}
}

export default  NovelNew