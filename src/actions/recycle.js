import axios from 'axios'
import { showFailPopup, showSucPopup } from './popup.js'

//请求我的草稿箱列表
export const requestRecycle = () => ({
	type: 'REQUEST_RECYCLE'
})

//保存我的草稿箱
export const saveRecycle = (recycle) => ({
	type: 'SAVE_RECYCLE',
	recycle
})

//删除我的草稿箱
export const delRecycle = () => ({
	type: 'DEL_RECYCLE'
})

//获取我的草稿箱
export const getRecycle = token => dispatch => {
	dispatch(requestRecycle());
	return axios.get("http://47.95.207.40/branch/user/branch", {
		headers:  {
			Authorization: "Bearer " + token.access_token
		},
		params: {
			status: "STATUS_RECYCLE"
		}
	}).then( res => {
		if(!res.data.status) {
			dispatch(saveRecycle(res.data.data));
		}else {
			dispatch(showFailPopup(res.data.message))
		}
	}).catch( err => {
		if(err.response.status == 404) {
			dispatch(saveRecycle([]));
		}else {
			dispatch(showFailPopup(err.response.data.message))
		}
	})
}