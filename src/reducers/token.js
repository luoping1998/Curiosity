let initialState = (new Date().getTime()/1000) - localStorage.getItem("time") <= 7000 ? JSON.parse(localStorage.getItem('token')) : {
	"access_token": "",
    "token_type": "",
    "refresh_token": "",
    "expires_in": 0,
    "scope": "0",
    "time" : 0
}
const token = (state = initialState, action) => {
	switch (action.type) {
		case 'SAVE_TOKEN':
			localStorage.setItem('token',JSON.stringify(action.token));
			localStorage.setItem("time", action.token.time);
			return Object.assign({}, state, {
				...action.token
			})
		case 'LOG_OUT':
		case 'DELETE_TOKEN':
			return Object.assign({}, state, {
					"access_token": "",
				    "token_type": "",
				    "refresh_token": "",
				    "expires_in": 0,
				    "scope": "0",
				    "time" : 0
			})
		case 'REQUEST_TOKEN':
		default :
			return state
	}
}

export default token