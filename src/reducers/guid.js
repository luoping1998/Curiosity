let _uid = localStorage.getItem("uid");
const getUid = ( _uid) => {
    if (_uid) {
        return _uid
    }
    if (!_uid) {
        const t = (new Date).getUTCMilliseconds()
        _uid = Math.round(2147483647 * Math.random()) * t % 1e10
        localStorage.setItem("uid",_uid)
    }
    return _uid
}

const guid = (state = 0, action) => {
	switch (action.type) {
		case 'GENERAT_GUID':
			return getUid(_uid)
		default:
			return state
	}
}

export default guid;