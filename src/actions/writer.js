import axios from 'axios'
import { showFailPopup, showSucPopup } from './popup.js'

//请求我的续写列表
export const requestWriter = () => ({
	type: 'REQUEST_WRITER'
})

//保存我的续写
export const saveWriter = (writer) => ({
	type: 'SAVE_WRITER',
	writer
})

//删除我的续写
export const delWriter = () => ({
	type: 'DEL_WRITER'
})

//获取我的续写
export const getWriter = token => dispatch => {
	dispatch(requestWriter());
	return axios.get("http://47.95.207.40/branch/user/branch", {
		headers:  {
			Authorization: "Bearer " + token.access_token
		}
	}).then( res => {
		if(!res.data.status) {
			dispatch(saveWriter(res.data.data));
		}else {
			dispatch(showFailPopup(res.data.message))
		}
	}).catch( err => {
		if(err.response.status == 404) {
			dispatch(saveWriter([]));
		}else {
			dispatch(showFailPopup(err.response.data.message))
		}
	})
}