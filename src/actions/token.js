import axios from 'axios'
import qs from 'qs'
import { showFailPopup, showSucPopup } from './popup.js'

//请求（更新）token
export const requestToken = token => ({
	type: 'REQUEST_TOKEN',
	token
})

//保存token
export const saveToken = token => ({
	type: 'SAVE_TOKEN',
	token
})

//清空token 
export const deleteToken = () => ({
	type: 'DELETE_TOKEN'
})

// 更新token
export const updateToken = token => dispatch => {
	dispatch(requestToken(token))
	const data = {
		"grant_type": "refresh_token",
		"refresh_token": token.refresh_token
	}
	return axios.post("http://47.95.207.40/branch/oauth/token",
		qs.stringify(data),
		{
			headers: {
				"Content-Type" : "application/x-www-form-urlencoded;",
				"Authorization" : 'Basic YnJhbmNoOnhpeW91M2c=',
			}
		})
	.then(res => {
		dispatch(saveToken(res.data));
	}).catch(err => {
		dispatch(showFailPopup(err.response.data.error_description));
	})
}