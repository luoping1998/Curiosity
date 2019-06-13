import React, {Component} from 'react'
import './index.less'
import client from '../../api';
import NovelCard from '../novel_card/novel_card.js'


class NovelNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}

	componentDidMount() {
		const params = {
			pageNo: 1,
			pageSize: 9,
			sort: 'CREATE_TIME',
			sortType: 1
		};

		client.getBook(params)
		.then(res => {
			this.setState({
				list: res.data.data.list
			})
		}).catch(err => {
			console.log(err);
		})
	}

	render() {
		const List = this.state.list.map(val => {
			return (
				<NovelCard key={val.bookId} {...val}/>
			)
		})
		return (
			<div className="novel_new">
				<h2 className="new_header">最新佳作</h2>
				<div className="new_lists">
					{List}
				</div>
			</div>
		)
	}
}

export default  NovelNew