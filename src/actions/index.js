import * as INFOR from './infor'
import * as TOKEN from './token'
import * as POPUP from './popup'
import * as FOCUS from './focus'
import * as STAR from './star'
import * as WRITER from './writer'
import * as DRAFT from './draft'
import * as RECYCLE from './recycle'
import * as OTHER from './other'

const ACTIONS = {
	INFOR,		//个人信息
	TOKEN,		//token
	POPUP,		//弹窗
	FOCUS,		//我关注的书列表
	STAR,		//我收藏的章节列表
	WRITER,		//我参与的已发布续写
	DRAFT,		//草稿箱
	RECYCLE,	//回收站
	OTHER
}
export default ACTIONS
