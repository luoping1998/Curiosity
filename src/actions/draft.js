import axios from 'axios'
import { showFailPopup, showSucPopup } from './popup.js'

//请求我的草稿箱列表
export const requestDraft = () => ({
	type: 'REQUEST_DRAFT'
})

//保存我的草稿箱
export const saveDraft = (draft) => ({
	type: 'SAVE_DRAFT',
	draft
})

//删除我的草稿箱
export const delDraft = () => ({
	type: 'DEL_DRAFT'
})

//获取我的草稿箱
export const getDraft = token => dispatch => {
	dispatch(requestDraft());
	return axios.get("http://47.95.207.40/branch/user/branch", {
		headers:  {
			Authorization: "Bearer " + token.access_token
		},
		params: {
			status: "STATUS_DRAFT"
		}
	}).then( res => {
		if(!res.data.status) {
			dispatch(saveDraft(res.data.data));
		}else {
			dispatch(showFailPopup(res.data.message))
		}
	}).catch( err => {
		if(err.response.status == 404) {
			dispatch(saveDraft([]));
		}else {
			dispatch(showFailPopup(err.response.data.message))
		}
	})
}