import LoginBox from '../components/login_box/login_box.js'
import { connect } from 'react-redux'
import ACTIONS from '../actions/index'
const mapStateToProps = state => ({
	uid: state.guid,
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	saveToken: token => dispatch(ACTIONS.TOKEN.saveToken(token)),
	hasLogin: () => dispatch(ACTIONS.OTHER.hasLogin()),
	showSucPopup: mess => dispatch(ACTIONS.POPUP.showSucPopup(mess)),
	showFailPopup: mess => dispatch(ACTIONS.POPUP.showFailPopup(mess)),
	getInfor: token => dispatch(ACTIONS.INFOR.getInfor(token)),	
	getFocus: token => dispatch(ACTIONS.FOCUS.getFocus(token)),
	getStar: token => dispatch(ACTIONS.STAR.getStar(token)),
	getWriter: token => dispatch(ACTIONS.WRITER.getWriter(token))

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginBox)