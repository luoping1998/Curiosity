let initialState = (new Date().getTime()/1000) - localStorage.getItem("time") <= 7000 ? JSON.parse(localStorage.getItem("writer")) : [];

const writer = ( state = initialState, action) => {
	switch(action.type) {
		case 'SAVE_WRITER':
			localStorage.setItem("writer", JSON.stringify(action.writer));
			return [...action.writer]
		case 'DEL_WRITER':
			return []
		case 'REQUEST_WRITER':
		default:
			return state
	}
}

export default writer