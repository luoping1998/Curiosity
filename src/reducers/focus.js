let initialState = (new Date().getTime()/1000) - localStorage.getItem("time") <= 7000 ? JSON.parse(localStorage.getItem("focus")) : [];

const focus = ( state = initialState, action) => {
	switch(action.type) {
		case 'SAVE_FOCUS':
			localStorage.setItem("focus", JSON.stringify(action.focus));
			return Object.assign([], [], [
				...action.focus
			])
		case 'DELETE_FOCUS':
			return Object.assign({}, state, {

			})
		case 'REQUEST_FOCUS':
		default:
			return state
	}
}

export default focus