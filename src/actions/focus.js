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
		if(err.response.status == 404) {
			dispatch(saveFocus([]));
		}else {
			dispatch(showFailPopup(err.response.data.message));
		}
	})
}

//添加关注
export const addFocus = (bookId, token, callback) => dispatch => {
	dispatch(requestFocus());
	axios.put("http://47.95.207.40/branch/user/focusOn/book/" + bookId,
		{},
		{
			headers: {
				"Authorization": "Bearer " + token.access_token
				}
		}
		).then( res => {
			dispatch(showSucPopup(res.data.message));
			callback();
		}).catch( err => {
			console.log(err);
			 let mes = '';
			 if(err.response) {
			 	mes = err.response.data.message || err.data.error;
			 }else {
			 	mes= '网络异常！';
			 }
			dispatch(showFailPopup(mes));
	})
}

//取消关注
export const cancelFocus = (bookId, token, callback) => dispatch => {
	dispatch(requestFocus());
	axios.delete("http://47.95.207.40/branch/user/focusOn/book/" + bookId,
		{
			headers: {
				"Authorization": "Bearer " + token.access_token
			}
		}
	).then( res => {
		dispatch(showSucPopup(res.data.message));
		callback();
	}).catch( err => {
		console.log(err);
		let mes = '';
		if(err.response) {
			mes = err.response.data.message;
		}else {
			mes = '网络异常！';
		}
		dispatch(showFailPopup(mes));
	})
}
