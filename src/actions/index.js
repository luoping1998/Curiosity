import axios from 'axios'

//保存用户个人信息
export const saveInfor = infor  => ({
	type: 'SAVE_INFOR',
	infor
})

//获取个人信息
// export getInfor = 


//为登录状态
export const hasLogin = () => ({
	type: 'HAS_LOGIN'
})

//为离线状态
export const logOut = () => ({
	type: 'LOG_OUT'
})

//获取（更新）token
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

//获取token
// export getToken = token => dispatch => {
// 	dispatch(requestToken(token))
// 	return axios.get("",{

// 	})
// 	.then(res => {
// 		dispatch(saveToken(res.data))
// 	}).catch(err => {
// 		console.log(err);
// 	})
// }