let initialState = (new Date().getTime()/1000) - localStorage.getItem("time") <= 7000 ? JSON.parse(localStorage.getItem("draft")) : [];

const draft = ( state = initialState, action) => {
	switch(action.type) {
		case 'SAVE_DRAFT':
			localStorage.setItem("draft", JSON.stringify(action.draft));
			return [...action.draft]
		case 'DEL_DRAFT':
			return []
		case 'REQUEST_DRAFT':
		default:
			return state
	}
}

export default draft