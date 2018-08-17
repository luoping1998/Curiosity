import axios from 'axios'
import { showFailPopup } from './popup.js'

//请求收藏章节
export const requestStar = token => {
	type: 'REQUEST_STAR',
	token
}

//保存收藏
export const saveStar = stars => {
	type: 'SAVE_STAR',
	stars
}

//删除收藏
export const deleteStar = () => {
	type: 'DELETE_STAR'
}

//获取章节
export const getStar = token => dispatch => {
	dispatch(requestStar());
	// axios.get
} 
