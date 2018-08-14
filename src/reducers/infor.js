const initialState = (new Date().getTime()/1000) - localStorage.getItem("time") <= 7000 ? JSON.parse(localStorage.getItem("infor")) : {
		"userId": 0,
		"username": "",
		"account": "",
		"id": 0,
		"signText": "",
		"experience": 0,
		"userGrade": 0,
		"icon":"default_avatr.jpg"
}

const infor = (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_INFOR':
			let infor = {
				...action.infor.data.simpleUserMessage,
				...action.infor.data.userMessage,
			}
			localStorage.setItem("infor", JSON.stringify(infor));
			return Object.assign({}, state, {
				...infor
			})
		case 'UPDATE_SIGN':
			return Object.assign({}, state, {
					...state.simpleUserMessage,
					...state.userMessage,
					signText: action.sign
				}
			)
		case 'LOG_OUT':
		case 'DELETE_INFOR':
			return Object.assign({}, state, {
					"userId": 0,
					"username": "",
					"account": "",
					"id": 0,
					"signText": "",
					"experience": 0,
					"userGrade": 0,
					"icon":"default_avatr.jpg"
			})
		case 'REQUEST_INFOR':
		default :
			return state
	}
}

export default infor