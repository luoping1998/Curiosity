import { combineReducers } from 'redux'
import infor from './infor.js'
import token from './token.js'
import logif from './logif.js'


export default combineReducers({
	infor,
	token,
	logif
})