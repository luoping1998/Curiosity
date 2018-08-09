const initialState = {
	show: false,
	header: '',
	mess: ''
}

const popup = (state = initialState, action) => {
	switch (action.type) {
		case 'SHOW_SUCPOP':
			return Object.assign({}, state, {
					...state,
					show: true,
					header: 'SUCCESS',
					mess: action.mess
			})
		case 'SHOW_FAILPOP':
			return Object.assign({}, state, {
					...state,
					show: true,
					header: 'FAIL',
					mess: action.mess
		})
		case 'HIDDEN_POPUP':
			return Object.assign({}, state, {
					...state,
					show: false,
					...action.cont
			})
		default: 
			return state

	}
}

export default popup