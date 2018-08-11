const initialState = {
		"userId": 0,
		"username": "",
		"account": "",
		"id": 0,
		"signText": "",
		"experience": 0,
		"userGrade": 0,
		"icon":""
}

const infor = (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_INFOR':
			return Object.assign({}, state, {
				...action.infor.data.simpleUserMessage,
				...action.infor.data.userMessage,
			})
		case 'UPDATE_SIGN':
			return Object.assign({}, state, {
					...state.simpleUserMessage,
					...state.userMessage,
					signText: action.sign
				}
			)
		case 'DELETE_INFOR':
			return Object.assign({}, state, {
				...initialState
			})
		case 'REQUEST_INFOR':
		default :
			return state
	}
}

export default infor