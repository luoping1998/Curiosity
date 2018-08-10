import axios from 'axios'
import { showFailPopup, showSucPopup } from './popup.js'

//请求用户个人信息
export const requestInfor = () => ({
	type: 'REQUEST_INFOR'
})

//修改用户签名
export const updateSign = sign => ({
	type: 'UPDATE_SIGN',
	sign
})

//保存用户个人信息
export const saveInfor = infor  => ({
	type: 'SAVE_INFOR',
	infor
})

//删除用户个人信息
export const deleteInfor = () => ({
	type: 'DELETE_INFOR'
})

//获取用户个人信息
export const getInfor = token => dispatch => {
	dispatch(requestInfor());
	return axios.get("http://47.95.207.40/branch/me",{
		headers: {
			Authorization: "Bearer " + token.access_token
		}
	}).then( res => {
		if(!res.data.status) {
			dispatch(saveInfor(res.data));
		}else {
			dispatch(showFailPopup(res.data.message));
		}
	}).catch( err => {
		dispatch(showFailPopup(err.response.data.message));
	})
}