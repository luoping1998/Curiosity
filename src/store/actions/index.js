//以下为处理用户信息的Actions
//保存用户信息
export const saveInfor = infor => {
	return {
		type: 'SAVE_INFOR',
		data: infor
	}
}

//保存token
export const saveToken = token => {
	return {
		type: 'SAVE_TOKEN',
		data: token
	}
}

