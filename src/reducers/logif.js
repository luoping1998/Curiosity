const logif = (state = false, action) => {
	switch (action.type) {
		case 'HAS_LOGIN':
			return true
		default : 
			return false
	}
}

export default logif