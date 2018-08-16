import axios from 'axios'
import { showFailPopup, showSucPopup } from './popup.js'

//请求我的关注列表
export const requestFocus = () => ({
	type: 'REQUEST_FOCUS'
})

//保存我的关注列表
export const saveFocus = focus => ({
	type: 'SAVE_FOCUS',
	focus
})

//删除我的关注列表
export const deleteFocus = () => ({
	type: 'DELETE_FOCUS'
})

//获取关注列表
export const getFocus = token => dispatch => {
	dispatch(requestFocus());
	return axios.get("http://47.95.207.40/branch/user/focusOn/book",{
		headers: {
			Authorization: "Bearer " + token.access_token
		}
	}).then( res => {
		if(!res.data.status) {
			dispatch(saveFocus(res.data.data));
		}else {
			dispatch(showFailPopup(res.data.message));
		}
	}).catch( err => {
		dispatch(showFailPopup(err.response.data.message));
	})
}