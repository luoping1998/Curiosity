import { deleteToken } from '../actions/index.js'
import { deleteInfor } from '../actions/infor.js'

const logif = (state = false, action) => {
	switch (action.type) {
		case 'HAS_LOGIN':
			return true
		case 'LOG_OUT':
			return false
		default : 
			return state
	}
}

export default logif