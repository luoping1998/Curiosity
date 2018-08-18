let initialState = (new Date().getTime()/1000) - localStorage.getItem("time") <= 7000 ? JSON.parse(localStorage.getItem("star")) : [];
const star = (state = initialState, action) => {
	switch(action.type) {
		case 'SAVE_STAR': 
			localStorage.setItem("star", JSON.stringify(action.stars));
			return Object.assign([], [], [
				...action.stars
			])			
		case 'DELETE_STAR':
			return Object.assign({}, state, {
				...initialState
			})
		case 'REQUEST_STAR': 
		default:
			return state
	}
}

export default star