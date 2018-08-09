const infor = (state = {}, action) => {
	switch (action.type) {
		case 'SAVE_INFOR':
			return Object.assign({}, state, {
				...action.infor
			})
		default :
			return state
	}
}

export default infor