const token = (state = {}, action) => {
	switch (action.type) {
		case 'SAVE_TOKEN':
			return Object.assign({}, state, {
				...action.token
			})
		case 'DELETE_TOKEN':
		case 'REQUEST_TOKEN':
		default :
			return state
	}
}

export default token