import { deleteToken } from '../actions/index.js'
import { deleteInfor } from '../actions/infor.js'
import { deleteFocus } from '../actions/focus.js'
import { deleteStar } from '../actions/star.js'

let initialState = (new Date().getTime()/1000) - localStorage.getItem("time") <= 7000 ? true : false
const logif = (state = initialState, action) => {
	switch (action.type) {
		case 'HAS_LOGIN':
			return true
		case 'LOG_OUT':
			localStorage.clear();
			return false
		default : 
			return state
	}
}

export default logif