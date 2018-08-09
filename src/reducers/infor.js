const infor = (state = {}, action) => {
	switch (action.type) {
		case 'SAVE_INFOR':
			return action.infor
		default :
			return state
	}
}

export default infor