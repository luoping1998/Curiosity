import React from 'react';
import NovelFocus from '../../components/novel_focus';
import NovelNew from '../../components/novel_new';
import NovelBar from '../../components/novel_bar';
import NewList from '../../components/new_list';
import './index.less';
import '../../App.less';

function Home() {
	return (
		<div className="main_body">
			<NovelFocus />
			<NewList />
			<NovelBar />
			<NovelNew />				
		</div>
	)
}
export default Home;