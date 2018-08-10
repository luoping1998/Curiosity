const initialState = {
	simpleUserMessage: {
		"userId": 0,
		"username": "",
		"account": ""
	},
	userMessage: {
		"id": 0,
		"userId": 0,
		"signText": "",
		"experience": 0,
		"userGrade": 0
	}
}

const infor = (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_INFOR':
			return Object.assign({}, state, {
				...action.infor.data
			})
		case 'UPDATE_SIGN':
			return Object.assign({}, state, {
				simpleUserMessage: {
					...state.simpleUserMessage,
				},
				userMessage: {
					...state.userMessage,
					signText: action.sign
				}
			})
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