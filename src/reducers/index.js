import { combineReducers } from 'redux'
import infor from './infor.js'
import token from './token.js'
import logif from './logif.js'
import popup from './popup.js'
import guid from './guid.js'
import focus from './focus.js'
import star from './star.js'

export default combineReducers({
	infor,	//个人信息
	token,	//token 验证是否登录
	logif,	//是否登录flag
	popup,	//alert弹窗 
	guid,	//用户唯一guid
	focus, 	//用户的关注书
	star 	//用户收藏章节
})