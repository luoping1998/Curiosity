import axios from 'axios'
import { showFailPopup } from './popup.js'

//请求收藏章节
export const requestStar = () => ({
	type: 'REQUEST_STAR'
})

//保存收藏
export const saveStar = stars => ({
	type: 'SAVE_STAR',
	stars
})

//删除收藏
export const deleteStar = () => ({
	type: 'DELETE_STAR'
})

//获取收藏
export const getStar = token => dispatch => {
	dispatch(requestStar());
	return axios.get("http://47.95.207.40/branch/usr/collection",{
		headers: {
			Authorization: "Bearer " + token.access_token
		}
	}).then(res => {
		dispatch(saveStar(res.data.data))
	}).catch(err => {
		let mes = '';
		if(err.response) {
			mes = err.response.data.message;
		}else {
			mes = '网络异常！';
		}
		dispatch(showFailPopup(mes));
	})
} 