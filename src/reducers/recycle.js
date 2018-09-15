let initialState = (new Date().getTime()/1000) - localStorage.getItem("time") <= 7000 ? JSON.parse(localStorage.getItem("recycle")) : [];

const recycle = ( state = initialState, action) => {
	switch(action.type) {
		case 'SAVE_RECYCLE':
			localStorage.setItem("recycle", JSON.stringify(action.recycle));
			return [...action.recycle]
		case 'DEL_RECYCLE':
			return []
		case 'REQUEST_RECYCLE':
		default:
			return state
	}
}

export default recycle