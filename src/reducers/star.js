let initialState = {}
const star = (state = initialState, action) => {
	switch(action.type) {
		case 'SAVE_STAR': 
			return Object.assign({}, state, {
				...action.stars
			})			
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