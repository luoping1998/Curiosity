import LoginBox from '../components/login_box/login_box.js'
import { connect } from 'react-redux'
import { saveToken, hasLogin, showSucPopup, showFailPopup, saveInfor } from '../actions/index.js'

const mapStateToProps = state => ({
	uid: state.guid,
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	saveToken: token => dispatch(saveToken(token)),
	hasLogin: () => dispatch(hasLogin()),
	showSucPopup: mess => dispatch(showSucPopup(mess)),
	showFailPopup: mess => dispatch(showFailPopup(mess)),
	saveInfor: infor => dispatch(saveInfor(infor))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginBox)